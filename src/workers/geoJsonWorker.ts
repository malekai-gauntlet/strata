// Web Worker for processing GeoJSON data
/* eslint-disable @typescript-eslint/no-explicit-any */

interface PointResult {
  lat: number;
  lng: number;
  districtId: string;
  districtName: string;
  isCenter: boolean;
}

interface ProcessResult {
  centerPoints: PointResult[];
  additionalPoints: PointResult[];
  allOrderedPoints: PointResult[];
}

// Define simplified GeoJSON types for the worker
interface Position {
  0: number;
  1: number;
}

interface BoundsResult {
  south: number;
  north: number;
  west: number;
  east: number;
}

interface GeoJSONProperties {
  DISTRICT_I?: string;
  DISTRICT_N?: string;
  [key: string]: any;
}

interface GeoJSONGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: any;
}

interface GeoJSONFeature {
  type: 'Feature';
  properties?: GeoJSONProperties;
  geometry?: GeoJSONGeometry;
}

interface GeoJSONCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

// Process messages from the main thread
self.onmessage = (event) => {
  const { data, type } = event.data;
  
  if (type === 'process_geojson') {
    try {
      // Post a status message back to the main thread
      self.postMessage({ type: 'status', message: 'Starting GeoJSON processing...' });
      
      // Process the data
      const result = processGeoJsonData(data as GeoJSONCollection);
      
      // Send the processed data back to the main thread
      self.postMessage({ 
        type: 'processed_data', 
        data: result 
      });
    } catch (error) {
      self.postMessage({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error in worker' 
      });
    }
  }
};

// Helper functions
function getBoundsFromCoordinates(coordinates: Position[]): BoundsResult {
  let south = Infinity;
  let north = -Infinity;
  let west = Infinity;
  let east = -Infinity;
  
  coordinates.forEach(coord => {
    if (Array.isArray(coord) && coord.length >= 2) {
      const [lng, lat] = coord;
      south = Math.min(south, lat);
      north = Math.max(north, lat);
      west = Math.min(west, lng);
      east = Math.max(east, lng);
    }
  });
  
  return { south, north, west, east };
}

function getPolygonCenter(polygon: GeoJSONGeometry): [number, number] {
  let bounds: BoundsResult;
  
  if (polygon.type === 'Polygon') {
    const coordinates = polygon.coordinates[0];
    bounds = getBoundsFromCoordinates(coordinates);
  } else { // MultiPolygon
    const allCoords: Position[] = [];
    polygon.coordinates.forEach((poly: Position[][]) => {
      poly[0].forEach((coord: Position) => {
        allCoords.push(coord);
      });
    });
    bounds = getBoundsFromCoordinates(allCoords);
  }
  
  // Calculate the center of the bounds
  const centerLng = bounds.west + (bounds.east - bounds.west) / 2;
  const centerLat = bounds.south + (bounds.north - bounds.south) / 2;
  return [centerLat, centerLng];
}

function isPointInPolygon(point: [number, number], polygon: GeoJSONGeometry): boolean {
  // Simplified point-in-polygon check
  const [lng, lat] = point;
  
  if (polygon.type === 'Polygon') {
    const bounds = getBoundsFromCoordinates(polygon.coordinates[0]);
    return lat >= bounds.south && lat <= bounds.north && lng >= bounds.west && lng <= bounds.east;
  } else { // MultiPolygon
    for (const poly of polygon.coordinates) {
      const bounds = getBoundsFromCoordinates(poly[0]);
      if (lat >= bounds.south && lat <= bounds.north && lng >= bounds.west && lng <= bounds.east) {
        return true;
      }
    }
    return false;
  }
}

function getRandomPointInPolygon(polygon: GeoJSONGeometry): [number, number] {
  let bounds: BoundsResult;
  
  if (polygon.type === 'Polygon') {
    const coordinates = polygon.coordinates[0];
    bounds = getBoundsFromCoordinates(coordinates);
  } else { // MultiPolygon
    const allCoords: Position[] = [];
    polygon.coordinates.forEach((poly: Position[][]) => {
      poly[0].forEach((coord: Position) => {
        allCoords.push(coord);
      });
    });
    bounds = getBoundsFromCoordinates(allCoords);
  }
  
  for (let i = 0; i < 50; i++) {
    const lng = bounds.west + Math.random() * (bounds.east - bounds.west);
    const lat = bounds.south + Math.random() * (bounds.north - bounds.south);
    
    if (isPointInPolygon([lng, lat], polygon)) {
      return [lat, lng];
    }
  }
  
  // If we can't find a valid point after 50 tries, use the center
  const centerLng = bounds.west + (bounds.east - bounds.west) / 2;
  const centerLat = bounds.south + (bounds.north - bounds.south) / 2;
  return [centerLat, centerLng];
}

// Main processing function
function processGeoJsonData(data: GeoJSONCollection): ProcessResult {
  self.postMessage({ type: 'status', message: 'Organizing points by district...' });
  
  const pointsByDistrict: Record<string, PointResult[]> = {};
  const centerPoints: PointResult[] = [];
  const additionalPoints: PointResult[] = [];
  
  // First, add one center point to each district
  self.postMessage({ type: 'status', message: 'Processing center points...' });
  
  data.features.forEach((feature: GeoJSONFeature, index: number) => {
    // Periodically report progress
    if (index % 100 === 0) {
      self.postMessage({ 
        type: 'progress', 
        message: `Processing district ${index} of ${data.features.length}`,
        percent: (index / data.features.length) * 50
      });
    }
    
    if (feature.properties && feature.geometry) {
      const districtId = feature.properties.DISTRICT_I || '';
      const districtName = feature.properties.DISTRICT_N || 'Unknown District';
      
      try {
        // Get the center point of the district
        const [lat, lng] = getPolygonCenter(feature.geometry);
        const centerPoint = {
          lat,
          lng,
          districtId,
          districtName,
          isCenter: true
        };
        
        // Add center point to the array
        centerPoints.push(centerPoint);
        
        // Initialize the array for this district
        pointsByDistrict[districtId] = [centerPoint];
      } catch (e) {
        console.error(`Error generating center point for district ${districtName}:`, e);
      }
    }
  });
  
  // Now add 4 more random points per district
  self.postMessage({ type: 'status', message: 'Processing additional points...' });
  
  data.features.forEach((feature: GeoJSONFeature, index: number) => {
    // Periodically report progress
    if (index % 100 === 0) {
      self.postMessage({ 
        type: 'progress', 
        message: `Processing additional points ${index} of ${data.features.length}`,
        percent: 50 + (index / data.features.length) * 50
      });
    }
    
    if (feature.properties && feature.geometry) {
      const districtId = feature.properties.DISTRICT_I || '';
      const districtName = feature.properties.DISTRICT_N || 'Unknown District';
      
      for (let i = 0; i < 4; i++) {
        try {
          const [lat, lng] = getRandomPointInPolygon(feature.geometry);
          const point = {
            lat,
            lng,
            districtId,
            districtName,
            isCenter: false
          };
          
          // Add to district's array
          if (pointsByDistrict[districtId]) {
            pointsByDistrict[districtId].push(point);
          }
          
          // Add to additional points array
          additionalPoints.push(point);
        } catch (e) {
          console.error(`Error generating additional point ${i} for district ${districtName}:`, e);
        }
      }
    }
  });
  
  // Combine the points in the right order: first all centers, then all additional points
  const allOrderedPoints = [...centerPoints, ...additionalPoints];
  
  self.postMessage({ 
    type: 'status', 
    message: `Completed! Processed ${centerPoints.length} center points and ${additionalPoints.length} additional points`
  });
  
  return { centerPoints, additionalPoints, allOrderedPoints };
}

export {}; 