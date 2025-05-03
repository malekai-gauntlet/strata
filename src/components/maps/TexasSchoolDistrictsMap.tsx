'use client';

import { useEffect, useState, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import Map, { 
  Source, 
  Layer, 
  Marker, 
  Popup, 
  MapLayerMouseEvent, 
  MapRef,
  FillLayer,
  LineLayer
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import type { Position } from 'geojson';
import React from 'react';

interface DistrictProperties {
  DISTRICT_N: string;
  DISTRICT_I: string;
  hasSchool?: boolean;
  Name20?: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface SelectedDistrict {
  name: string;
  id: string;
  properties: DistrictProperties;
}

interface RandomPoint {
  lat: number;
  lng: number;
  districtId: string;
  districtName: string;
  districtDisplayName?: string;
  isCenter?: boolean; // indicates if this is the center point of a district
}

// Create a custom interface that works with our map implementation
interface CustomViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  padding: Record<string, number> | null;
  width?: number;
  height?: number;
}

// Use a consistent dot size for all school markers
const SCHOOL_DOT_SIZE = 10; // Size in pixels
const MIN_DOT_DISTANCE = 15; // Minimum distance between dots in pixels
// Flag to completely disable map movement
const LOCK_MAP_POSITION = true;

// Modify the SchoolMarkers component to use consistent sizes
const SchoolMarkers = React.memo(({ points, onPointClick }: { 
  points: RandomPoint[],
  onPointClick: (point: RandomPoint, x: number, y: number) => void
}) => {
  return (
    <>
      {points.map((point, index) => (
        <Marker
          key={`${point.districtId}-${index}`}
          longitude={point.lng}
          latitude={point.lat}
          onClick={e => {
            e.originalEvent.stopPropagation();
            onPointClick(
              point, 
              e.originalEvent.clientX, 
              e.originalEvent.clientY
            );
          }}
        >
          <div 
            style={{
              width: `${SCHOOL_DOT_SIZE}px`,
              height: `${SCHOOL_DOT_SIZE}px`,
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '2px solid #333333',
              boxShadow: '0 0 4px rgba(255,255,255,0.5)'
            }}
          />
        </Marker>
      ))}
    </>
  );
});

SchoolMarkers.displayName = 'SchoolMarkers';

const TexasSchoolDistrictsMap = () => {
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectedDistrict | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState<string>('Initializing map...');
  const [error, setError] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(4); // Start slightly to the right (August 2025)
  const [randomPoints, setRandomPoints] = useState<RandomPoint[]>([]);
  const [districtColors, setDistrictColors] = useState<Record<string, string>>({});
  const [sliderYear, setSliderYear] = useState(2025); // Start at 2025
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [popupInfo, setPopupInfo] = useState<{point: RandomPoint, x: number, y: number} | null>(null);
  const [allPoints, setAllPoints] = useState<RandomPoint[]>([]);
  // Track districts with schools as an array to ensure React updates correctly
  const [districtsWithSchools, setDistrictsWithSchools] = useState<string[]>([]);
  const mapRef = useRef<MapRef | null>(null);
  const [totalDistricts, setTotalDistricts] = useState(0);
  
  // Mapbox API key
  const mapboxApiKey = import.meta.env.VITE_MAPBOX_KEY;
  
  // Texas bounds (to restrict the map view to Texas) - wrapped in useMemo to prevent recreation
  const texasBounds = useMemo<[[number, number], [number, number]]>(() => [
    [-110, 25], // Southwest coordinates
    [-90, 37]   // Northeast coordinates
  ], []);
  
  // Hardcode Carrollton school district ID
  const carrolltonDistrictId = '057903'; // Carrollton school district ID
  
  // Create a viewState that we'll control explicitly with the correct type definition
  const [viewState, setViewState] = useState<CustomViewState>({
    longitude: -99.0,   // Adjusted center for Texas
    latitude: 31.2,     // Adjusted center for Texas
    zoom: window.innerWidth < 768 ? 2.0 : 5.0, // Initial zoom based on device size
    bearing: 0,
    pitch: 0,
    padding: null,
    width: window.innerWidth,    // Add required dimensions
    height: window.innerHeight   // Add required dimensions
  });
  
  // Create a ref to store the initial view state so we can reset to it if needed
  const initialViewStateRef = useRef<CustomViewState>({
    longitude: -99.0,   // Ensure fixed center for Texas
    latitude: 31.2,     // Ensure fixed center for Texas
    zoom: window.innerWidth < 768 ? 2.0 : 5.0, // Initial zoom based on device size
    bearing: 0,
    pitch: 0,
    padding: null,
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Add a ref to store the initial center position explicitly
  const initialCenterRef = useRef<{lng: number, lat: number}>({
    lng: -99.0, // Fixed initial longitude
    lat: 31.2   // Fixed initial latitude
  });
  
  // Store the true/false state of whether the map is allowed to move
  const mapMovementLocked = true; // Changed to constant true since we're not using the setter
  
  // Set a specific location for the first school (to replace Carrollton-based logic)
  const initialSchoolLocation = useMemo(() => ({
    // Dallas area coordinates
    latitude: 32.7767,
    longitude: -96.7970,
    districtId: "057903",  // Carrollton district ID
    districtName: "Carrollton-Farmers Branch ISD"
  }), []);
  
  useEffect(() => {
    // Update year based on slider value
    const calculateYear = () => {
      if (sliderValue === 0) {
        return 2025;
      } else if (sliderValue === 100) {
        return 2027;
      } else {
        // Values between 0-50 map to 2025-2026, values between 50-100 map to 2026-2027
        if (sliderValue <= 50) {
          // Normalize to a value between 0 and 1
          const normalizedValue = sliderValue / 50;
          // Calculate the decimal part of the year (months)
          return 2025 + normalizedValue;
        } else {
          // Normalize to a value between 0 and 1
          const normalizedValue = (sliderValue - 50) / 50;
          // Calculate the decimal part of the year (months)
          return 2026 + normalizedValue;
        }
      }
    };

    const newYear = calculateYear();
    setSliderYear(newYear);
    
    console.log(`Slider value changed to ${sliderValue}, setting year to ${newYear}`);
  }, [sliderValue]);

  const getBoundsFromCoordinates = useCallback((coordinates: Position[]) => {
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
  }, []);

  // Get the center point of a polygon
  const getPolygonCenter = useCallback((polygon: GeoJSON.Polygon | GeoJSON.MultiPolygon): [number, number] => {
    let bounds: { south: number, north: number, west: number, east: number };
    
    if (polygon.type === 'Polygon') {
      const coordinates = polygon.coordinates[0];
      bounds = getBoundsFromCoordinates(coordinates);
    } else { // MultiPolygon
      const allCoords: Position[] = [];
      polygon.coordinates.forEach(poly => {
        poly[0].forEach(coord => {
          allCoords.push(coord);
        });
      });
      bounds = getBoundsFromCoordinates(allCoords);
    }
    
    // Calculate the center of the bounds
    const centerLng = bounds.west + (bounds.east - bounds.west) / 2;
    const centerLat = bounds.south + (bounds.north - bounds.south) / 2;
    return [centerLat, centerLng];
  }, [getBoundsFromCoordinates]);

  const isPointInPolygon = useCallback((point: [number, number], polygon: GeoJSON.Polygon | GeoJSON.MultiPolygon): boolean => {
    // Note: This is a simplified point-in-polygon check
    // For production, consider using a library like turf.js for more accurate results
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
  }, [getBoundsFromCoordinates]);

  // Modified function to ensure points are more centered within districts
  // and don't overlap with existing points
  const getRandomPointInPolygon = useCallback((
    polygon: GeoJSON.Polygon | GeoJSON.MultiPolygon,
    existingPoints: RandomPoint[] = []
  ): [number, number] => {
    let bounds: { south: number, north: number, west: number, east: number };
    
    if (polygon.type === 'Polygon') {
      const coordinates = polygon.coordinates[0];
      bounds = getBoundsFromCoordinates(coordinates);
    } else { // MultiPolygon
      const allCoords: Position[] = [];
      polygon.coordinates.forEach(poly => {
        poly[0].forEach(coord => {
          allCoords.push(coord);
        });
      });
      bounds = getBoundsFromCoordinates(allCoords);
    }
    
    // Calculate the center point
    const centerLng = bounds.west + (bounds.east - bounds.west) / 2;
    const centerLat = bounds.south + (bounds.north - bounds.south) / 2;
    
    // Check if a point is too close to existing points
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
      
      // Generate a point within the biased boundaries
      const lng = biasedWest + Math.random() * (biasedEast - biasedWest);
      const lat = biasedSouth + Math.random() * (biasedNorth - biasedSouth);
      
      // Check if the point is within polygon and not too close to existing points
      if (isPointInPolygon([lng, lat], polygon) && !isTooClose(lat, lng)) {
        return [lat, lng];
      }
    }
    
    // If we can't find a valid point after 50 tries, use the exact center
    // and hope it's not too close to other points
    return [centerLat, centerLng];
  }, [getBoundsFromCoordinates, isPointInPolygon]);

  // Modify the organizePointsByDistrict function to use the updated getRandomPointInPolygon
  const organizePointsByDistrict = useCallback((data: GeoJSON.FeatureCollection) => {
    console.log("Organizing points by district with CPU fallback method");
    
    const pointsByDistrict: Record<string, RandomPoint[]> = {};
    const centerPoints: RandomPoint[] = [];
    const additionalPoints: RandomPoint[] = [];
    
    // First, add one center point to each district
    data.features.forEach((feature: GeoJSON.Feature) => {
      if (feature.properties && feature.geometry) {
        const districtId = feature.properties.DISTRICT_I || '';
        const districtName = feature.properties.DISTRICT_N || 'Unknown District';
        
        try {
          // Get the center point of the district
          const [lat, lng] = getPolygonCenter(feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon);
          const centerPoint = {
            lat,
            lng,
            districtId,
            districtName,
            isCenter: true // Mark this as a center point
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
    data.features.forEach((feature: GeoJSON.Feature) => {
      if (feature.properties && feature.geometry) {
        const districtId = feature.properties.DISTRICT_I || '';
        const districtName = feature.properties.DISTRICT_N || 'Unknown District';
        const existingDistrictPoints = pointsByDistrict[districtId] || [];
        
        for (let i = 0; i < 4; i++) {
          try {
            // Pass existing points to avoid overlap
            const [lat, lng] = getRandomPointInPolygon(
              feature.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon,
              existingDistrictPoints
            );
            
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
              // Update the existingDistrictPoints to include this new point
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
    
    // Combine the points in the right order: first all centers, then all additional points
    const allOrderedPoints = [...centerPoints, ...additionalPoints];
    
    console.log(`Organized ${centerPoints.length} center points and ${additionalPoints.length} additional points`);
    
    return { centerPoints, additionalPoints, allOrderedPoints, pointsByDistrict };
  }, [getPolygonCenter, getRandomPointInPolygon]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadingProgress('Checking for cached data...');
        
        // Try to get cached data from sessionStorage first
        const cachedData = sessionStorage.getItem('texasDistrictsGeoJson');
        let geoJsonData;
        
        if (cachedData) {
          console.log('Using cached GeoJSON data from session storage');
          setLoadingProgress('Loading cached data...');
          geoJsonData = JSON.parse(cachedData);
        } else {
          console.log('Fetching GeoJSON data from server');
          setLoadingProgress('Downloading map data...');
          const response = await fetch('/data/Current_Districts_2025.geojson');
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
          }
          setLoadingProgress('Processing GeoJSON data...');
          geoJsonData = await response.json();
          
          // Cache the data in sessionStorage for future use
          try {
            setLoadingProgress('Caching data for faster reload...');
            sessionStorage.setItem('texasDistrictsGeoJson', JSON.stringify(geoJsonData));
          } catch (e) {
            console.warn('Could not cache GeoJSON in sessionStorage (possibly too large):', e);
          }
        }
        
        // Set the main data
        setGeoJsonData(geoJsonData);
        setTotalDistricts(geoJsonData.features.length);
        
        // Initialize district colors
        setLoadingProgress('Initializing districts...');
        const colors: Record<string, string> = {};
        geoJsonData.features.forEach((feature: GeoJSON.Feature) => {
          if (feature.properties) {
            colors[feature.properties.DISTRICT_I || ''] = '#808080'; // Gray
          }
        });
        
        setDistrictColors(colors);
        
        // Find Carrollton district for initial centering
        setLoadingProgress('Finding Carrollton district...');
        const carrolltonFeature = geoJsonData.features.find(
          (feature: GeoJSON.Feature) => feature.properties && feature.properties.DISTRICT_I === carrolltonDistrictId
        );
        
        if (!carrolltonFeature) {
          console.warn(`Carrollton district (ID: ${carrolltonDistrictId}) not found in data.`);
          const availableIds = geoJsonData.features
            .filter((f: GeoJSON.Feature) => f.properties)
            .map((f: GeoJSON.Feature) => f.properties?.DISTRICT_I)
            .filter(Boolean)
            .slice(0, 10);
          console.log(`Available district IDs (first 10): ${availableIds.join(', ')}`);
        }
        
        // Process points using Web Worker if supported
        if (typeof Worker !== 'undefined') {
          setLoadingProgress('Initializing worker for point processing...');
          
          try {
            // Create a new worker
            const worker = new Worker(new URL('../../workers/geoJsonWorker.ts', import.meta.url));
            
            // Set up message handling
            worker.onmessage = (event) => {
              const { type, message, data } = event.data;
              
              if (type === 'status') {
                setLoadingProgress(message);
              } else if (type === 'progress') {
                setLoadingProgress(message);
              } else if (type === 'processed_data') {
                // Set the processed data
                setAllPoints(data.allOrderedPoints);
                setRandomPoints([]);
                setLoadingProgress('Finalizing...');
                
                // Terminate the worker
                worker.terminate();
                
                // Small delay to show the finalizing message
                setTimeout(() => {
                  setLoading(false);
                }, 200);
              } else if (type === 'error') {
                console.error('Worker error:', message);
                // Fall back to CPU processing
                fallbackToMainThreadProcessing(geoJsonData);
              }
            };
            
            // Handle worker errors
            worker.onerror = (error) => {
              console.error('Worker error:', error);
              worker.terminate();
              // Fall back to CPU processing
              fallbackToMainThreadProcessing(geoJsonData);
            };
            
            // Start the worker with the GeoJSON data
            worker.postMessage({ type: 'process_geojson', data: geoJsonData });
          } catch (error) {
            console.error('Failed to start worker:', error);
            // Fall back to CPU processing
            fallbackToMainThreadProcessing(geoJsonData);
          }
        } else {
          // Web Workers not supported, use main thread processing
          fallbackToMainThreadProcessing(geoJsonData);
        }
      } catch (err) {
        console.error('Error fetching GeoJSON data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error fetching data');
        setLoading(false);
      }
    };
    
    // Fallback method using main thread processing
    const fallbackToMainThreadProcessing = (data: GeoJSON.FeatureCollection) => {
      setLoadingProgress('Processing points (fallback method)...');
      setTimeout(() => {
        try {
          const { allOrderedPoints } = organizePointsByDistrict(data);
          setAllPoints(allOrderedPoints);
          setRandomPoints([]);
          setLoadingProgress('Finalizing...');
          
          // Small delay to show "Finalizing..." message
          setTimeout(() => {
            setLoading(false);
          }, 200);
        } catch (error) {
          console.error('Error in fallback processing:', error);
          setError('Failed to process map data');
          setLoading(false);
        }
      }, 0);
    };
    
    fetchData();
  }, [carrolltonDistrictId, organizePointsByDistrict]);

  const handleDistrictClick = useCallback((e: MapLayerMouseEvent) => {
    if (!e.features || e.features.length === 0) return;
    
    const feature = e.features[0];
    if (!feature.properties) return;
    
    // Use the districtId directly without the intermediate variable
    setSelectedDistrict({
      name: getDistrictDisplayName(feature.properties as unknown as DistrictProperties),
      id: feature.properties.DISTRICT_I || 'Unknown ID',
      properties: feature.properties as unknown as DistrictProperties
    });
  }, []);

  const handleDistrictHover = useCallback((e: MapLayerMouseEvent) => {
    if (!e.features || e.features.length === 0) {
      setHoveredDistrictId(null);
      return;
    }
    
    const feature = e.features[0];
    if (!feature.properties) return;
    
    const districtId = feature.properties.DISTRICT_I || '';
    setHoveredDistrictId(districtId);
    
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.getCanvas().style.cursor = 'pointer';
    }
  }, []);
  
  const handleDistrictLeave = useCallback(() => {
    setHoveredDistrictId(null);
    
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.getCanvas().style.cursor = '';
    }
  }, []);

  // Update visible points and district colors based on slider year
  useEffect(() => {
    console.log(`Updating map for year: ${sliderYear}`);
    
    if (geoJsonData && allPoints.length > 0 && totalDistricts > 0) {
      let visiblePoints: RandomPoint[] = [];
      const newColors: Record<string, string> = {};
      const newDistrictsWithSchools: string[] = [];
      
      // Initialize all districts as blue
      if (geoJsonData.features) {
        geoJsonData.features.forEach((feature: GeoJSON.Feature) => {
          if (feature.properties) {
            const districtId = feature.properties.DISTRICT_I || '';
            newColors[districtId] = '#2A4365'; // Always blue
          }
        });
      }

      // Define initial schools for 2025 (start of slider)
      const initialSchools = [
        // Dallas area
        {
          lat: 32.7767,
          lng: -96.7970,
          districtId: "057903",
          districtName: "Dallas ISD",
          isCenter: true
        },
        // North Dallas/Plano area
        {
          lat: 33.0198,
          lng: -96.6989,
          districtId: "043910",
          districtName: "Plano ISD",
          isCenter: true
        },
        // Austin area
        {
          lat: 30.2672,
          lng: -97.7431,
          districtId: "227901",
          districtName: "Austin ISD",
          isCenter: true
        },
        // Carrollton area
        {
          lat: 32.9751,
          lng: -96.8897,
          districtId: "057903",
          districtName: "Carrollton-Farmers Branch ISD",
          isCenter: true
        },
        // Richardson
        {
          lat: 32.9483,
          lng: -96.7299,
          districtId: "057916",
          districtName: "Richardson ISD",
          isCenter: true
        },
        // Irving
        {
          lat: 32.8140,
          lng: -96.9489,
          districtId: "057912",
          districtName: "Irving ISD",
          isCenter: true
        },
        // Garland
        {
          lat: 32.9126,
          lng: -96.6389,
          districtId: "057909",
          districtName: "Garland ISD",
          isCenter: true
        },
        // Mesquite
        {
          lat: 32.7668,
          lng: -96.5992,
          districtId: "057914",
          districtName: "Mesquite ISD",
          isCenter: true
        }
      ];

      // Define January 2026 expansion schools (middle of slider)
      const expansionSchools = [
        // Houston area
        { lat: 29.7604, lng: -95.3698, districtId: "101912", districtName: "Houston ISD" },
        { lat: 29.8405, lng: -95.4653, districtId: "101924", districtName: "Spring Branch ISD" },
        { lat: 29.6857, lng: -95.2794, districtId: "101916", districtName: "Pasadena ISD" },
        { lat: 29.9377, lng: -95.6772, districtId: "101907", districtName: "Cypress-Fairbanks ISD" },
        { lat: 30.0371, lng: -95.4288, districtId: "101915", districtName: "Spring ISD" },
        // San Antonio area
        { lat: 29.4241, lng: -98.4936, districtId: "015907", districtName: "San Antonio ISD" },
        { lat: 29.5693, lng: -98.6447, districtId: "015915", districtName: "Northside ISD" },
        { lat: 29.4832, lng: -98.3995, districtId: "015910", districtName: "Northeast ISD" },
        // Fort Worth area
        { lat: 32.7555, lng: -97.3308, districtId: "220905", districtName: "Fort Worth ISD" },
        { lat: 32.8998, lng: -97.2881, districtId: "220914", districtName: "Keller ISD" },
        { lat: 32.6949, lng: -97.1209, districtId: "220901", districtName: "Arlington ISD" },
        // El Paso
        { lat: 31.7619, lng: -106.4850, districtId: "071902", districtName: "El Paso ISD" },
        { lat: 31.8140, lng: -106.2485, districtId: "071909", districtName: "Ysleta ISD" },
        // Corpus Christi
        { lat: 27.8006, lng: -97.3964, districtId: "178904", districtName: "Corpus Christi ISD" },
        // Lubbock
        { lat: 33.5779, lng: -101.8552, districtId: "152901", districtName: "Lubbock ISD" },
        // Amarillo
        { lat: 35.2220, lng: -101.8313, districtId: "188901", districtName: "Amarillo ISD" },
        // Waco
        { lat: 31.5493, lng: -97.1467, districtId: "161914", districtName: "Waco ISD" },
        // Tyler
        { lat: 32.3513, lng: -95.3011, districtId: "212905", districtName: "Tyler ISD" },
        // Beaumont
        { lat: 30.0802, lng: -94.1266, districtId: "123910", districtName: "Beaumont ISD" },
        // Midland
        { lat: 31.9973, lng: -102.0779, districtId: "165901", districtName: "Midland ISD" },
        // Odessa
        { lat: 31.8457, lng: -102.3676, districtId: "068901", districtName: "Ector County ISD" },
        // Additional Houston suburbs
        { lat: 29.5852, lng: -95.6349, districtId: "079907", districtName: "Sugar Land ISD" },
        { lat: 29.7858, lng: -95.8244, districtId: "079901", districtName: "Katy ISD" },
        { lat: 30.1658, lng: -95.4494, districtId: "170902", districtName: "Conroe ISD" },
        // Additional Dallas suburbs
        { lat: 33.1507, lng: -96.8236, districtId: "043914", districtName: "Frisco ISD" },
        { lat: 32.9342, lng: -96.4597, districtId: "057904", districtName: "Rockwall ISD" },
        { lat: 33.0801, lng: -96.6989, districtId: "043919", districtName: "Allen ISD" },
        { lat: 33.1971, lng: -96.6389, districtId: "043910", districtName: "McKinney ISD" },
        // Additional Austin suburbs
        { lat: 30.5083, lng: -97.6789, districtId: "246909", districtName: "Round Rock ISD" },
        { lat: 30.3252, lng: -97.7581, districtId: "227904", districtName: "Leander ISD" },
        { lat: 30.1658, lng: -97.7893, districtId: "227901", districtName: "Pflugerville ISD" },
        // College Station
        { lat: 30.6280, lng: -96.3344, districtId: "021901", districtName: "College Station ISD" },
        // San Marcos
        { lat: 29.8833, lng: -97.9414, districtId: "105902", districtName: "San Marcos CISD" },
        // Georgetown
        { lat: 30.6333, lng: -97.6789, districtId: "246904", districtName: "Georgetown ISD" },
        // Temple
        { lat: 31.0982, lng: -97.3428, districtId: "014909", districtName: "Temple ISD" },
        // Killeen
        { lat: 31.1171, lng: -97.7278, districtId: "014906", districtName: "Killeen ISD" },
        // Victoria
        { lat: 28.8053, lng: -97.0036, districtId: "235902", districtName: "Victoria ISD" },
        // Longview
        { lat: 32.5007, lng: -94.7405, districtId: "092903", districtName: "Longview ISD" },
        // Texarkana
        { lat: 33.4417, lng: -94.0376, districtId: "019907", districtName: "Texarkana ISD" },
        // Sherman
        { lat: 33.6357, lng: -96.6089, districtId: "091906", districtName: "Sherman ISD" },
        // Denton
        { lat: 33.2148, lng: -97.1331, districtId: "061901", districtName: "Denton ISD" },
        // Abilene
        { lat: 32.4487, lng: -99.7331, districtId: "221901", districtName: "Abilene ISD" },
        // San Angelo
        { lat: 31.4638, lng: -100.4370, districtId: "226901", districtName: "San Angelo ISD" },
        // Bryan
        { lat: 30.6744, lng: -96.3698, districtId: "021902", districtName: "Bryan ISD" },
        // Wichita Falls
        { lat: 33.9137, lng: -98.4934, districtId: "243905", districtName: "Wichita Falls ISD" },
        // Laredo
        { lat: 27.5306, lng: -99.4803, districtId: "240901", districtName: "Laredo ISD" },
        // McAllen
        { lat: 26.2034, lng: -98.2300, districtId: "108906", districtName: "McAllen ISD" },
        // Brownsville
        { lat: 25.9017, lng: -97.4975, districtId: "031901", districtName: "Brownsville ISD" },
        // Harlingen
        { lat: 26.1906, lng: -97.6961, districtId: "031903", districtName: "Harlingen CISD" },
        // Mission
        { lat: 26.2159, lng: -98.3252, districtId: "108908", districtName: "Mission CISD" },
        // Edinburg
        { lat: 26.3017, lng: -98.1633, districtId: "108904", districtName: "Edinburg CISD" },
        // Pharr
        { lat: 26.1947, lng: -98.1836, districtId: "108909", districtName: "Pharr-San Juan-Alamo ISD" }
      ].map(school => ({ ...school, isCenter: true }));
      
      // Extract all center points from allPoints (one per district)
      const allCenterPoints = allPoints.filter(p => p.isCenter);
      
      // Extract all additional points (non-center points)
      const allAdditionalPoints = allPoints.filter(p => !p.isCenter);
      
      // Create a map of districtId -> [array of points for that district]
      const pointsByDistrict: Record<string, RandomPoint[]> = {};
      
      // Group all points by their district ID
      allPoints.forEach(point => {
        if (!pointsByDistrict[point.districtId]) {
          pointsByDistrict[point.districtId] = [];
        }
        pointsByDistrict[point.districtId].push(point);
      });
      
      // For each district, sort points so center point is first, then others
      Object.keys(pointsByDistrict).forEach(districtId => {
        pointsByDistrict[districtId].sort((a, b) => {
          if (a.isCenter && !b.isCenter) return -1;
          if (!a.isCenter && b.isCenter) return 1;
          return 0;
        });
      });
      
      // Now implement a smooth, deterministic appearance of points based on the slider
      if (sliderValue <= 50) {
        // First half of slider: Gradually introduce one school per district (center points)
        
        // Start with initial schools
        visiblePoints = [...initialSchools];
        
        // Calculate how many additional center points to show based on slider
        // Slider 0 -> 0% of districts, Slider 50 -> 100% of districts
        // But first 8 districts are always shown from initialSchools
        
        // Get remaining center points, excluding ones from the hardcoded lists
        const remainingCenterPoints = allCenterPoints.filter(
          p => !initialSchools.some(is => is.districtId === p.districtId) &&
               !expansionSchools.some(es => es.districtId === p.districtId)
        );
        
        // Calculate how many to show from the expansion schools list (50% of slider)
        // At slider=0, show 0 expansion schools
        // At slider=25, show 50% of expansion schools
        // At slider=50, show 100% of expansion schools
        const expansionPercentage = sliderValue / 50;
        const expansionPointsToShow = Math.floor(expansionSchools.length * expansionPercentage);
        
        // Calculate how many to show from the remaining center points (other 50% of slider)
        // At slider=0, show 0 remaining centers
        // At slider=25, show 0 remaining centers
        // At slider=50, show 100% of remaining centers
        const remainingPercentage = Math.max(0, (sliderValue - 25) / 25);
        const remainingPointsToShow = Math.min(
          remainingCenterPoints.length,
          Math.floor(remainingCenterPoints.length * remainingPercentage)
        );
        
        // Add the calculated number of points from each category
        visiblePoints = [
          ...visiblePoints,
          ...expansionSchools.slice(0, expansionPointsToShow),
          ...remainingCenterPoints.slice(0, remainingPointsToShow)
        ];
        
        // Track which districts have schools
        visiblePoints.forEach(point => {
          if (!newDistrictsWithSchools.includes(point.districtId)) {
            newDistrictsWithSchools.push(point.districtId);
          }
        });
      } else {
        // Second half of slider: All districts have their center point, gradually add additional points
        
        // First, include all center points (one per district)
        visiblePoints = [...allCenterPoints];
        
        // Calculate percentage for additional points (3-4 per district)
        // At slider=50, show 0 additional points
        // At slider=100, show all additional points
        const additionalPercentage = (sliderValue - 50) / 50;
        
        // Group the additional points by their district
        const additionalPointsByDistrict: Record<string, RandomPoint[]> = {};
        allAdditionalPoints.forEach(point => {
          if (!additionalPointsByDistrict[point.districtId]) {
            additionalPointsByDistrict[point.districtId] = [];
          }
          additionalPointsByDistrict[point.districtId].push(point);
        });
        
        // For each district with additional points...
        Object.keys(additionalPointsByDistrict).forEach(districtId => {
          const districtPoints = additionalPointsByDistrict[districtId];
          
          // Determine how many additional points to show for this district
          const pointsToShowForDistrict = Math.min(
            districtPoints.length,
            Math.ceil(districtPoints.length * additionalPercentage)
          );
          
          // Add the calculated number of points
          if (pointsToShowForDistrict > 0) {
            visiblePoints = [...visiblePoints, ...districtPoints.slice(0, pointsToShowForDistrict)];
          }
        });
        
        // Track which districts have schools
        visiblePoints.forEach(point => {
          if (!newDistrictsWithSchools.includes(point.districtId)) {
            newDistrictsWithSchools.push(point.districtId);
          }
        });
      }
      
      // Update state
      console.log(`Setting ${visiblePoints.length} visible points across ${newDistrictsWithSchools.length} districts`);
      setRandomPoints(visiblePoints);
      setDistrictsWithSchools(newDistrictsWithSchools);
      setDistrictColors(newColors);
    }
  }, [sliderValue, geoJsonData, allPoints, totalDistricts]);

  // Fix the processing of GeoJSON to ensure proper typing
  const processedGeoJson = useMemo<GeoJSON.FeatureCollection | null>(() => {
    if (!geoJsonData) return null;
    
    // Make a deep copy of the GeoJSON data
    const data = JSON.parse(JSON.stringify(geoJsonData)) as GeoJSON.FeatureCollection;
    
    // Add a hasSchool property to each feature - fix typing issue
    data.features.forEach((feature) => {
      if (feature.properties) {
        const districtId = (feature.properties.DISTRICT_I as string) || '';
        // Add the property in a type-safe way
        feature.properties.hasSchool = districtsWithSchools.includes(districtId);
      }
    });
    
    return data;
  }, [geoJsonData, districtsWithSchools]);

  // Ensure the layer expressions are correctly typed
  const districtLayer = useMemo<FillLayer>(() => ({
    id: 'districts',
    type: 'fill',
    source: 'districts', // Add required source property
    paint: {
      'fill-color': [
        'case',
        ['==', ['get', 'DISTRICT_I'], hoveredDistrictId || ''],
        '#3388ff',  // Hover color
        ['==', ['get', 'DISTRICT_I'], selectedDistrict?.id || ''],
        '#ff4081',  // Selected color
        '#2A4365'   // Deep blue for all districts
      ] as unknown as mapboxgl.Expression,
      'fill-opacity': 0.6
    }
  }), [hoveredDistrictId, selectedDistrict]);

  const districtOutlineLayer = useMemo<LineLayer>(() => ({
    id: 'district-outlines',
    type: 'line',
    source: 'districts', // Add required source property
    paint: {
      'line-color': '#888888',
      'line-width': 0.5,
      'line-opacity': 0.7
    }
  }), []);

  // Add new effect to reset view state whenever slider changes
  useEffect(() => {
    // Reset the view state to the initial state whenever the slider changes
    if (mapMovementLocked || LOCK_MAP_POSITION) {
      // Use the fixed initial state, don't derive from current state
      const isMobile = window.innerWidth < 768;
      const zoom = isMobile ? 2.0 : 5.0;
      
      // Only update width/height from current state
      const updatedViewState = {
        ...initialViewStateRef.current,
        width: window.innerWidth,
        height: window.innerHeight,
        zoom: zoom
      };
      
      setViewState(updatedViewState);
      
      // Force the map to this fixed position if already initialized
      if (mapRef.current) {
        try {
          const map = mapRef.current.getMap();
          // Use the original jumpTo implementation
          const originalJumpTo = Object.getPrototypeOf(map).jumpTo;
          if (typeof originalJumpTo === 'function') {
            originalJumpTo.call(map, {
              center: [initialCenterRef.current.lng, initialCenterRef.current.lat],
              zoom: zoom
            });
          }
        } catch (e) {
          console.error("Failed to reset map position on slider change:", e);
        }
      }
    }
  }, [sliderValue, mapMovementLocked]);

  // Also add an effect to ensure view state is reset when component mounts
  useLayoutEffect(() => {
    // Update the initial view state with correct zoom based on screen size
    const isMobile = window.innerWidth < 768;
    const updatedViewState = {
      ...initialViewStateRef.current,
      zoom: isMobile ? 2.0 : 5.0,
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Set both the view state and update the ref
    setViewState(updatedViewState);
    
    // Apply the initial position as soon as the map ref is available
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      // Cancel any ongoing animations
      map.stop();
      
      // Immediately jump to the fixed position
      try {
        const originalJumpTo = Object.getPrototypeOf(map).jumpTo;
        if (typeof originalJumpTo === 'function') {
          originalJumpTo.call(map, {
            center: [initialCenterRef.current.lng, initialCenterRef.current.lat],
            zoom: updatedViewState.zoom,
            animate: false // Ensure no animation
          });
        }
      } catch (e) {
        console.error("Failed to apply initial view state:", e);
      }
    }
    
    // Add a one-time cleanup to handle initial animations 
    const timer = setTimeout(() => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.stop(); // Stop any animations
      }
    }, 100); // Short timeout to catch delayed animations
    
    return () => clearTimeout(timer);
  }, []);
  
  // Cancel any Map animations on component mount and slider changes
  useEffect(() => {
    const cancelAnimations = () => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        // Stop any ongoing animations
        map.stop();
        
        // Force to our fixed position
        try {
          const originalJumpTo = Object.getPrototypeOf(map).jumpTo;
          if (typeof originalJumpTo === 'function') {
            originalJumpTo.call(map, {
              center: [initialCenterRef.current.lng, initialCenterRef.current.lat],
              zoom: window.innerWidth < 768 ? 2.0 : 5.0,
              animate: false // Ensure no animation
            });
          }
        } catch (e) {
          console.error("Failed to cancel animations:", e);
        }
      }
    };
    
    // Wait for map to stabilize before canceling animations
    const timer = setTimeout(cancelAnimations, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced wheel event prevention
  useEffect(() => {
    if (!LOCK_MAP_POSITION) return;
    
    // Completely prevent wheel events for zoom
    const preventZoom = (e: WheelEvent) => {
      // Always prevent wheel events when ctrl key is pressed (zoom gesture)
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // More aggressive prevention of map movement events
    const preventMapMovement = (e: Event) => {
      e.stopPropagation();
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    // Add the event listeners to the document with capture to intercept early
    document.addEventListener('wheel', preventZoom, { passive: false, capture: true });
    
    // Add event listeners for any map container if it exists
    const mapContainer = document.querySelector('.mapboxgl-map');
    if (mapContainer) {
      const events = [
        'mousedown', 'mouseup', 'mousemove',
        'touchstart', 'touchmove', 'touchend',
        'wheel', 'dblclick',
        'dragstart', 'drag', 'dragend',
        'gesturestart', 'gesturechange', 'gestureend'
      ];
      
      // Add all event listeners with capture
      events.forEach(eventType => {
        mapContainer.addEventListener(eventType, preventMapMovement, { capture: true });
      });

      // Cleanup
      return () => {
        document.removeEventListener('wheel', preventZoom, { capture: true });
        
        // Remove all event listeners
        events.forEach(eventType => {
          mapContainer.removeEventListener(eventType, preventMapMovement, { capture: true });
        });
      };
    }
    
    // Cleanup if mapContainer not found
    return () => {
      document.removeEventListener('wheel', preventZoom, { capture: true });
    };
  }, []);

  // Add an effect to periodically check and force the map position
  useEffect(() => {
    if (!LOCK_MAP_POSITION || !mapRef.current) return;
    
    // Force map position every second to prevent any drift
    const interval = setInterval(() => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        const currentCenter = map.getCenter();
        const initialCenter = initialCenterRef.current;
        const initialZoom = initialViewStateRef.current.zoom;
        
        if (
          Math.abs(currentCenter.lng - initialCenter.lng) > 0.0001 || 
          Math.abs(currentCenter.lat - initialCenter.lat) > 0.0001 ||
          Math.abs(map.getZoom() - initialZoom) > 0.0001
        ) {
          console.log("Periodic reset of map position");
          map.jumpTo({
            center: initialCenter,
            zoom: initialZoom
          });
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Adjust zoom level based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Detect if we're on a mobile device (width < 768px)
      const isMobile = window.innerWidth < 768;
      
      // Create updated view state with correct zoom level
      const updatedViewState = {
        ...initialViewStateRef.current,
        width: window.innerWidth,
        height: window.innerHeight,
        zoom: isMobile ? 2.0 : 5.0 // 2.0 for mobile, 5.0 for web as requested
      };
      
      // Update both state and ref to keep them in sync
      setViewState(updatedViewState);
      initialViewStateRef.current = updatedViewState;
      initialCenterRef.current = {
        lng: updatedViewState.longitude,
        lat: updatedViewState.latitude
      };
    };
    
    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fix for TypeScript errors with __proto__
  const onMapLoad = useCallback(({ target }: { target: mapboxgl.Map }) => {
    if (!mapRef.current) return;
    
    const map = target;
    
    // Store the original methods before we override them
    const originalJumpTo = Object.getPrototypeOf(map).jumpTo;
    const originalSetZoom = Object.getPrototypeOf(map).setZoom;
    
    // Store initial center and force it to remain fixed
    // Get the latest zoom level based on screen size
    const isMobile = window.innerWidth < 768;
    const initialZoom = isMobile ? 2.0 : 5.0;
    
    // Force the map to the correct position/zoom using the original methods
    if (typeof originalJumpTo === 'function') {
      originalJumpTo.call(map, {
        center: [initialCenterRef.current.lng, initialCenterRef.current.lat],
        zoom: initialZoom
      });
    }
    
    // Set district colors using feature state
    if (processedGeoJson && map.getSource('districts')) {
      // More efficient feature state setting with batch updates
      processedGeoJson.features.forEach((feature: GeoJSON.Feature, index: number) => {
        if (feature.properties) {
          const districtId = feature.properties.DISTRICT_I || '';
          const color = districtColors[districtId] || '#808080';
          
          map.setFeatureState(
            { source: 'districts', id: index },
            { color }
          );
        }
      });
    }
    
    // Add click event for district selection
    map.on('click', 'districts', handleDistrictClick);
    map.on('mousemove', 'districts', handleDistrictHover);
    map.on('mouseleave', 'districts', handleDistrictLeave);
    
    // Restrict the map to Texas bounds
    map.setMaxBounds(texasBounds);
    
    if (LOCK_MAP_POSITION) {
      // Completely disable all map interaction except clicking
      map.dragRotate.disable();
      map.touchZoomRotate.disable(); // Disable both rotation and touch zoom
      map.scrollZoom.disable();      // Disable scroll zooming
      map.boxZoom.disable();         // Disable box zooming
      map.doubleClickZoom.disable(); // Disable double click zoom
      map.keyboard.disable();        // Disable keyboard navigation
      map.dragPan.disable();         // Explicitly disable panning
      
      // Add multiple listeners to catch any movement attempts
      map.on('movestart', (e) => {
        // Handle movestart by stopping propagation
        if (e.originalEvent) {
          e.originalEvent.stopPropagation();
          if (e.originalEvent.cancelable) {
            e.originalEvent.preventDefault();
          }
        }
        // Force map back to original position
        if (typeof originalJumpTo === 'function') {
          originalJumpTo.call(map, {
            center: [initialCenterRef.current.lng, initialCenterRef.current.lat],
            zoom: initialZoom
          });
        }
      });
      
      map.on('dragstart', (e) => {
        // Handle dragstart by stopping propagation
        if (e.originalEvent) {
          e.originalEvent.stopPropagation();
          if (e.originalEvent.cancelable) {
            e.originalEvent.preventDefault();
          }
        }
        // Cancel the drag operation
        map.stop();
      });
      
      map.on('zoomstart', () => {
        // Force back to correct zoom level without using preventDefault
        if (typeof originalSetZoom === 'function') {
          originalSetZoom.call(map, initialZoom);
        }
        map.stop();
      });
      
      // Override all map movement methods to be no-ops
      map.jumpTo = (options) => {
        // Allow only our internal jumps that match our initial state
        if (
          options && 
          (
            options.zoom === initialZoom ||
            (options.center && 
             options.center[0] === initialCenterRef.current.lng && 
             options.center[1] === initialCenterRef.current.lat)
          )
        ) {
          if (typeof originalJumpTo === 'function') {
            return originalJumpTo.call(map, options);
          }
        }
        return map;
      };
      
      map.flyTo = () => map;
      map.easeTo = () => map;
      map.panTo = () => map;
      map.panBy = () => map;
      map.zoomTo = () => map;
      map.setCenter = () => map;
      map.setZoom = (zoom) => {
        // Only allow setting zoom to our initial zoom
        if (zoom === initialZoom && typeof originalSetZoom === 'function') {
          return originalSetZoom.call(map, zoom);
        }
        return map;
      };
    }
  }, [processedGeoJson, districtColors, handleDistrictClick, handleDistrictHover, handleDistrictLeave, texasBounds]);

  // Update feature states when district colors change
  useEffect(() => {
    if (!mapRef.current || !processedGeoJson) return;
    
    const map = mapRef.current.getMap();
    
    if (map.getSource('districts')) {
      Object.entries(districtColors).forEach(([districtId, color]) => {
        processedGeoJson.features.forEach((feature: GeoJSON.Feature, index: number) => {
          if (feature.properties && feature.properties.DISTRICT_I === districtId) {
            map.setFeatureState(
              { source: 'districts', id: index },
              { color }
            );
          }
        });
      });
    }
  }, [districtColors, processedGeoJson]);

  // Memoize the marker click handler
  const handleMarkerClick = useCallback((point: RandomPoint, x: number, y: number) => {
    // Find the associated district with this point
    if (geoJsonData) {
      const district = geoJsonData.features.find(
        feature => feature.properties && feature.properties.DISTRICT_I === point.districtId
      );
      
      // Add Name20 property to the popupInfo if available
      const name20 = district?.properties?.Name20 || point.districtName;
      
      setPopupInfo({ 
        point: {
          ...point,
          districtDisplayName: name20
        }, 
        x, 
        y 
      });
    } else {
      setPopupInfo({ point, x, y });
    }
  }, [geoJsonData]);

  // Replace the unused truncateName function with a direct implementation
  // for the district name display
  function getDistrictDisplayName(properties: DistrictProperties): string {
    return properties.Name20 || properties.DISTRICT_N || 'Unknown District';
  }

  // Add this function to get a formatted count string
  const getFormattedCountInfo = useCallback((points: RandomPoint[], districtsWithSchools: string[]) => {
    return {
      schoolCount: points.length,
      districtCount: districtsWithSchools.length,
      formattedString: `${points.length.toLocaleString()} Strata Schools`
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center p-8 bg-black rounded-lg max-w-md">
          {/* Modern sleek spinner */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-gray-800"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-white animate-spin"></div>
          </div>
          <p className="mt-6 text-xl font-light tracking-wider text-white">{loadingProgress}</p>
          <div className="w-full bg-gray-800 rounded-full h-1.5 mt-6">
            <div className="bg-white h-1.5 rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Timeline Bar - Modern WHITE with BLACK text */}
      <div className="absolute top-0 left-0 w-full z-30 flex flex-col items-center pointer-events-none">
        <div className="backdrop-blur-md bg-white/80 rounded-b-xl shadow-lg px-6 pt-4 pb-2 w-full max-w-2xl mx-auto pointer-events-auto">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            style={{ 
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'
            }}
          />
          <div className="flex justify-between text-xs text-gray-800 font-medium mt-1 px-1">
            <span>Aug 2025</span>
            <span>Aug 2026</span>
            <span>Aug 2027</span>
          </div>
        </div>
      </div>
      
      {/* School Count Display - Bottom Right with same styling */}
      <div className="absolute bottom-4 right-4 z-30 pointer-events-none">
        <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg px-4 py-2 text-gray-800 font-medium">
          {getFormattedCountInfo(randomPoints, districtsWithSchools).formattedString}
        </div>
      </div>

      {/* Map Container - Full width and height */}
      <div className="absolute inset-0 w-full h-full">
        {processedGeoJson && (
          <Map
            ref={mapRef}
            mapboxAccessToken={mapboxApiKey}
            initialViewState={{
              longitude: initialCenterRef.current.lng, // Use fixed initial center
              latitude: initialCenterRef.current.lat,  // Use fixed initial center
              zoom: window.innerWidth < 768 ? 2.0 : 5.0,
              bearing: 0,
              pitch: 0
            }}
            interactive={!LOCK_MAP_POSITION}
            onMove={(evt) => {
              if (!LOCK_MAP_POSITION) return;
              
              // Just prevent the event, don't try to reset position
              if (evt.originalEvent) {
                evt.originalEvent.stopPropagation();
                if (evt.originalEvent.cancelable) {
                  evt.originalEvent.preventDefault();
                }
              }
            }}
            onZoom={(evt) => {
              if (!LOCK_MAP_POSITION) return;
              
              // Prevent default
              if (evt.originalEvent) {
                evt.originalEvent.stopPropagation();
                if (evt.originalEvent.cancelable) {
                  evt.originalEvent.preventDefault();
                }
              }
            }}
            onDrag={(evt) => {
              if (!LOCK_MAP_POSITION) return;
              
              // Prevent drag and reset position
              if (evt.originalEvent) {
                evt.originalEvent.stopPropagation();
                if (evt.originalEvent.cancelable) {
                  evt.originalEvent.preventDefault();
                }
              }
            }}
            style={{ height: '100%', width: '100%' }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            interactiveLayerIds={['districts']}
            onLoad={onMapLoad}
            maxZoom={window.innerWidth < 768 ? 2.0 : 5.0}  // Force max zoom to match device
            minZoom={window.innerWidth < 768 ? 2.0 : 5.0}  // Force min zoom to match device
            dragRotate={false}
            dragPan={!LOCK_MAP_POSITION}
            scrollZoom={false}
            boxZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            touchZoomRotate={false}
            touchPitch={false}
            attributionControl={false}  // Remove attribution control which can sometimes trigger movement
            cooperativeGestures={true}  // Enable cooperative gestures to prevent accidental panning
          >
            <Source
              id="districts"
              type="geojson"
              data={processedGeoJson}
              generateId={true}
            >
              <Layer {...districtLayer} />
              <Layer {...districtOutlineLayer} />
            </Source>
            <SchoolMarkers 
              points={randomPoints}
              onPointClick={handleMarkerClick}
            />
            {popupInfo && (
              <Popup
                longitude={popupInfo.point.lng}
                latitude={popupInfo.point.lat}
                anchor="bottom"
                onClose={() => setPopupInfo(null)}
                closeButton={true}
                closeOnClick={true}
                className="school-popup"
              >
                <div className="p-1 text-black">
                  <h3 className="font-bold text-sm">
                    {popupInfo.point.districtDisplayName || popupInfo.point.districtName}
                  </h3>
                  <div className="text-xs mt-1">
                    <p>Strata School #{randomPoints.findIndex(p => 
                      p.lat === popupInfo.point.lat && 
                      p.lng === popupInfo.point.lng) + 1}</p>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        )}
      </div>
    </div>
  );
};

export default TexasSchoolDistrictsMap; 