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
  const [sliderValue, setSliderValue] = useState(0); // Start at beginning (August 2025)
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
    zoom: 5.5,          // Slightly zoomed in to show Texas more prominently
    bearing: 0,
    pitch: 0,
    padding: null,
    width: window.innerWidth,    // Add required dimensions
    height: window.innerHeight   // Add required dimensions
  });
  
  // Create a ref to store the initial view state so we can reset to it if needed
  const initialViewStateRef = useRef(viewState);
  
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
      
      // Initialize all districts as dark gray
      if (geoJsonData.features) {
        geoJsonData.features.forEach((feature: GeoJSON.Feature) => {
          if (feature.properties) {
            const districtId = feature.properties.DISTRICT_I || '';
            newColors[districtId] = '#444444'; // Dark gray by default
          }
        });
      }
      
      // Phase 1 (2025-2026): Add one school in the center of each district gradually
      // Phase 2 (2026-2027): Add 4 more schools per district gradually
      
      if (sliderYear <= 2025) {
        // August 2025: Only 1 school using our specific initialSchoolLocation
        // Create the first point at our specific location
        const firstPoint: RandomPoint = {
          lat: initialSchoolLocation.latitude,
          lng: initialSchoolLocation.longitude,
          districtId: initialSchoolLocation.districtId,
          districtName: initialSchoolLocation.districtName,
          isCenter: true
        };
        
        visiblePoints = [firstPoint];
        newDistrictsWithSchools.push(initialSchoolLocation.districtId);
        console.log(`Setting initial school at ${initialSchoolLocation.latitude}, ${initialSchoolLocation.longitude}`);
      } else if (sliderYear <= 2026) {
        // Between 2025 and 2026: Place one center school in each district gradually
        const centerPoints = allPoints.filter(p => p.isCenter);
        
        // Calculate how many center points to show (from 1 to totalDistricts)
        const percentage = (sliderYear - 2025);
        const numCentersToShow = Math.min(
          Math.max(1, Math.floor(1 + (totalDistricts - 1) * percentage)),
          totalDistricts
        );
        
        console.log(`Showing ${numCentersToShow} of ${centerPoints.length} center points`);
        
        // Create a combined array with our specific first point, then others
        let pointsToShow: RandomPoint[] = [];
        
        // Start with our specific initial point
        const initialPoint: RandomPoint = {
          lat: initialSchoolLocation.latitude,
          lng: initialSchoolLocation.longitude,
          districtId: initialSchoolLocation.districtId,
          districtName: initialSchoolLocation.districtName,
          isCenter: true
        };
        pointsToShow.push(initialPoint);
        
        // Then add other points that aren't in the initial district
        const otherPoints = centerPoints.filter(p => p.districtId !== initialSchoolLocation.districtId);
        pointsToShow = [...pointsToShow, ...otherPoints.slice(0, numCentersToShow - 1)];
        
        visiblePoints = pointsToShow;
        
        // Track which districts have schools
        visiblePoints.forEach(point => {
          newDistrictsWithSchools.push(point.districtId);
        });
      } else {
        // Between 2026 and 2027: All centers + gradually add 4 more points per district
        
        // All center points are visible
        const centerPoints = allPoints.filter(p => p.isCenter);
        const additionalPoints = allPoints.filter(p => !p.isCenter);
        
        // All center points are included
        visiblePoints = [...centerPoints];
        
        // Calculate what percentage of additional points to show
        const percentage = (sliderYear - 2026);
        const numAdditionalToShow = Math.floor(additionalPoints.length * percentage);
        
        // Add the additional points
        visiblePoints = [...visiblePoints, ...additionalPoints.slice(0, numAdditionalToShow)];
        
        console.log(`Showing all ${centerPoints.length} centers + ${numAdditionalToShow} of ${additionalPoints.length} additional points`);
        
        // Track which districts have schools (should be all districts by now)
        const districtsWithPoints = new Set<string>();
        visiblePoints.forEach(point => {
          districtsWithPoints.add(point.districtId);
        });
        
        // Convert set to array
        newDistrictsWithSchools.push(...Array.from(districtsWithPoints));
      }
      
      // Make all districts with schools a light blue color
      newDistrictsWithSchools.forEach(districtId => {
        newColors[districtId] = '#2A4365'; // Deep blue for districts with schools
      });
      
      // Update state
      console.log(`Setting ${visiblePoints.length} visible points across ${newDistrictsWithSchools.length} districts`);
      setRandomPoints(visiblePoints);
      setDistrictsWithSchools(newDistrictsWithSchools);
      setDistrictColors(newColors);
    }
  }, [sliderYear, geoJsonData, allPoints, totalDistricts, initialSchoolLocation]);

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
        ['boolean', ['get', 'hasSchool'], false],
        '#2A4365',  // Deep blue for districts with schools
        '#444444'   // Darker gray for districts without schools
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
    if (mapMovementLocked) {
      setViewState(initialViewStateRef.current);
    }
  }, [sliderValue, mapMovementLocked]);

  // Also add an effect to ensure view state is reset when component mounts
  useLayoutEffect(() => {
    setViewState(initialViewStateRef.current);
  }, []);

  // Enhanced wheel event prevention
  useEffect(() => {
    // Completely prevent wheel events for zoom
    const preventZoom = (e: WheelEvent) => {
      // Always prevent wheel events when ctrl key is pressed (zoom gesture)
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Prevent all map movement events
    const preventMapMovement = (e: Event) => {
      if (mapMovementLocked) {
        e.stopPropagation();
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    // Add the event listeners to the document
    document.addEventListener('wheel', preventZoom, { passive: false });
    
    // Add event listeners for any map container if it exists
    const mapContainer = document.querySelector('.mapboxgl-map');
    if (mapContainer) {
      mapContainer.addEventListener('mousedown', preventMapMovement, { capture: true });
      mapContainer.addEventListener('touchstart', preventMapMovement, { capture: true });
      mapContainer.addEventListener('wheel', preventMapMovement, { capture: true });
    }

    // Cleanup
    return () => {
      document.removeEventListener('wheel', preventZoom);
      if (mapContainer) {
        mapContainer.removeEventListener('mousedown', preventMapMovement);
        mapContainer.removeEventListener('touchstart', preventMapMovement);
        mapContainer.removeEventListener('wheel', preventMapMovement);
      }
    };
  }, [mapMovementLocked]);

  // Update dimensions when window resizes
  useEffect(() => {
    const handleResize = () => {
      setViewState(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhance the onMapLoad function to ensure zoom is disabled
  const onMapLoad = useCallback(({ target }: { target: mapboxgl.Map }) => {
    if (!mapRef.current) return;
    
    const map = target;
    
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
    
    // Completely disable all map interaction except clicking
    map.dragRotate.disable();
    map.touchZoomRotate.disable(); // Disable both rotation and touch zoom
    map.scrollZoom.disable();      // Disable scroll zooming
    map.boxZoom.disable();         // Disable box zooming
    map.doubleClickZoom.disable(); // Disable double click zoom
    map.keyboard.disable();        // Disable keyboard navigation
    
    // Removed map.flyTo to prevent zoom animation
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
    setPopupInfo({ point, x, y });
  }, []);

  // Replace the unused truncateName function with a direct implementation
  // for the district name display
  function getDistrictDisplayName(properties: DistrictProperties): string {
    return properties.Name20 || properties.DISTRICT_N || 'Unknown District';
  }

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

      {/* Map Container - Full width and height */}
      <div className="absolute inset-0 w-full h-full">
        {processedGeoJson && (
          <Map
            ref={mapRef}
            mapboxAccessToken={mapboxApiKey}
            initialViewState={{
              longitude: viewState.longitude,
              latitude: viewState.latitude,
              zoom: viewState.zoom,
              bearing: viewState.bearing,
              pitch: viewState.pitch
            }}
            onMove={(evt) => {
              // Prevent all movement by simply not updating state
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
            maxZoom={9}
            minZoom={5}
            dragRotate={false}
            dragPan={false}
            scrollZoom={false}
            boxZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            touchZoomRotate={false}
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
                  <h3 className="font-bold text-sm">{popupInfo.point.districtName}</h3>
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

      {/* District Info Card - Bottom left, modern glassy look, only when selectedDistrict */}
      {selectedDistrict && (
        <div className="absolute bottom-6 left-6 z-40 pointer-events-auto">
          <div className="backdrop-blur-md bg-white/70 dark:bg-black/60 rounded-xl shadow-2xl px-6 py-4 min-w-[200px] max-w-xs border border-white/30 dark:border-black/30">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={selectedDistrict.name}>
              {selectedDistrict.name}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default TexasSchoolDistrictsMap; 