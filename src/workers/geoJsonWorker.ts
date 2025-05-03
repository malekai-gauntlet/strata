// Web Worker for processing GeoJSON data
/* eslint-disable @typescript-eslint/no-explicit-any */

// Add map version to align with main file
const MAP_VERSION = "1.0.0";
// Add a seed for deterministic random generation
const RANDOM_SEED = 12345;

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

// Add a seeded random number generator for deterministic results
let randomSeed = RANDOM_SEED;
function seededRandom() {
  // Simple LCG random number generator with known seed
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32);
  
  // Update the seed
  randomSeed = (a * randomSeed + c) % m;
  
  // Return a value between 0 and 1
  return randomSeed / m;
}

// Reset the random seed to ensure consistent results
function resetRandomSeed() {
  randomSeed = RANDOM_SEED;
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

// Use the seeded random function instead of Math.random()
function getRandomPointInPolygon(polygon: GeoJSONGeometry, existingPoints: PointResult[] = []): [number, number] {
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
  
  // Calculate the center point
  const centerLng = bounds.west + (bounds.east - bounds.west) / 2;
  const centerLat = bounds.south + (bounds.north - bounds.south) / 2;
  
  // Check if a point is too close to existing points (min distance ~10px)
  const MIN_DOT_DISTANCE = 10; // Approximate pixels
  const isTooClose = (lat: number, lng: number) => {
    return existingPoints.some(existing => {
      // Convert lat/lng difference to approximate pixel distance
      // This is a simplified calculation and works for small distances
      const latDiff = Math.abs(existing.lat - lat) * 111000; // 1 degree lat = ~111km
      const lngDiff = Math.abs(existing.lng - lng) * 111000 * Math.cos(lat * Math.PI / 180);
      
      // Convert to pixels (approximate at zoom level 6)
      const pixelDistance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) / 10;
      
      return pixelDistance < MIN_DOT_DISTANCE;
    });
  };
  
  // Try to find points that are biased toward the center
  // and don't overlap with existing points
  for (let i = 0; i < 50; i++) {
    // Use a bias factor to keep points closer to center (smaller = more centered)
    const biasTowardCenter = 0.5; // 50% of the full bounds
    
    // Calculate biased boundaries that are closer to center
    const biasedWest = centerLng - (centerLng - bounds.west) * biasTowardCenter;
    const biasedEast = centerLng + (bounds.east - centerLng) * biasTowardCenter;
    const biasedSouth = centerLat - (centerLat - bounds.south) * biasTowardCenter;
    const biasedNorth = centerLat + (bounds.north - centerLat) * biasTowardCenter;
    
    // Generate a point within the biased boundaries using seeded random
    const lng = biasedWest + seededRandom() * (biasedEast - biasedWest);
    const lat = biasedSouth + seededRandom() * (biasedNorth - biasedSouth);
    
    // Check if the point is within polygon and not too close to existing points
    if (isPointInPolygon([lng, lat], polygon) && !isTooClose(lat, lng)) {
      return [lat, lng];
    }
  }
  
  // If we can't find a valid point after 50 tries, use the exact center
  // and hope it's not too close to other points
  return [centerLat, centerLng];
}

// Main processing function
function processGeoJsonData(data: GeoJSONCollection): ProcessResult {
  self.postMessage({ type: 'status', message: 'Organizing points by district...' });
  
  // Reset the random seed to ensure deterministic results
  resetRandomSeed();
  
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
  
  // Now add 4 more random points per district, avoiding overlap with existing points
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
      const existingDistrictPoints = pointsByDistrict[districtId] || [];
      
      for (let i = 0; i < 4; i++) {
        try {
          // Pass existing points to avoid overlap
          const [lat, lng] = getRandomPointInPolygon(feature.geometry, existingDistrictPoints);
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
            // Update existingDistrictPoints to include this new point
            existingDistrictPoints.push(point);
          }
          
          // Add to additional points array
          additionalPoints.push(point);
        } catch (e) {
          console.error(`Error generating additional point ${i} for district ${districtName}:`, e);
        }
      }
    }
  });
  
  // Add the mapVersion to the response
  const result = { 
    centerPoints, 
    additionalPoints, 
    allOrderedPoints: [...centerPoints, ...additionalPoints],
    mapVersion: MAP_VERSION
  };
  
  // Store a copy of data in sessionStorage for validation if needed
  try {
    const samplePoints = result.allOrderedPoints.slice(0, 20);
    self.postMessage({ type: 'cache', data: { samplePoints, mapVersion: MAP_VERSION } });
  } catch (e) {
    console.error('Error caching sample points in worker:', e);
  }
  
  self.postMessage({ 
    type: 'status', 
    message: `Completed! Processed ${centerPoints.length} center points and ${additionalPoints.length} additional points`
  });
  
  return result;
}

export {}; 