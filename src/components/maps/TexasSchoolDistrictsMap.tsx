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
import type { GeoJSONSource } from 'mapbox-gl';

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

// Add a constant to keep track of map versions to detect unexpected coordinate shifts
const MAP_VERSION = "1.0.0";
// Add a flag to enable coordinate validation
const VALIDATE_COORDINATES = true;
// Add an error threshold for coordinate validation (in degrees)
const COORDINATE_ERROR_THRESHOLD = 0.001; // Approximately 100 meters

// Maximum number of points to show on mobile devices based on tier
const MOBILE_POINT_LIMITS = {
  LOW: 600,    // Older/lower-end devices
  MEDIUM: 1200, // Mid-range devices
  HIGH: 2000    // High-end devices
};

// GeoJSON simplification settings based on device capability
const GEOJSON_SIMPLIFICATION = {
  MOBILE: {
    LOW: 0.01,     // Aggressive simplification for low-end mobile devices
    MEDIUM: 0.005, // Medium simplification for mid-range mobile
    HIGH: 0.002    // Light simplification for high-end mobile
  },
  DESKTOP: 0.0005  // Very light simplification for desktop
};

// Progressive loading batch sizes
const PROGRESSIVE_LOADING = {
  MOBILE: {
    LOW: 50,     // Load 50 features at a time on low-end mobiles
    MEDIUM: 100, // 100 features per batch on mid-range
    HIGH: 200    // 200 features per batch on high-end
  },
  DESKTOP: 500   // Load 500 features at a time on desktop
};

// Add a constant to store the fixed coordinates in case we need to restore them
const FIXED_COORDINATES = {
  // Mobile view settings
  mobile: {
    longitude: -99.0, // Shifted from -101.0 to -103.5 (move right on the map)
    latitude: 31.2,    // Keep the same latitude
    zoom: 4.2          // Keep the same zoom level
  },
  // Desktop view settings 
  desktop: {
    longitude: -99.0,  // Fixed longitude for desktop
    latitude: 31.2,    // Fixed latitude for desktop
    zoom: 5.0          // Fixed zoom for desktop
  }
};

// Use a consistent dot size for all school markers
const SCHOOL_DOT_SIZE = 10; // Size in pixels
const MIN_DOT_DISTANCE = 15; // Minimum distance between dots in pixels
// Flag to completely disable map movement
const LOCK_MAP_POSITION = true;

// Add mobile detection functionality
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth < 768;
};

// Add connection API detection for connection type
const getNetworkCondition = (): 'slow' | 'medium' | 'fast' => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'medium';
  }
  
  // Fix TypeScript error with proper interface
  interface NavigatorWithConnection extends Navigator {
    connection?: {
      effectiveType?: string;
      downlink?: number;
      saveData?: boolean;
    };
  }
  
  const connection = (navigator as NavigatorWithConnection).connection;
  
  if (connection) {
    // Check for save-data mode first (user has explicitly requested data saving)
    if (connection.saveData) {
      return 'slow';
    }
    
    const effectiveType = connection.effectiveType;
    if (effectiveType === '2g' || effectiveType === 'slow-2g') return 'slow';
    if (effectiveType === '3g') return 'medium';
    if (effectiveType === '4g') return 'fast';
    
    const downlink = connection.downlink; // Mbps
    if (downlink && downlink < 1) return 'slow';
    if (downlink && downlink < 5) return 'medium';
    return 'fast';
  }
  
  return 'medium';
};

// Add device tier detection to determine point limit
const getDeviceTier = (): 'LOW' | 'MEDIUM' | 'HIGH' => {
  if (typeof window === 'undefined') return 'MEDIUM';
  
  // Check for low memory indicator (if available)
  if ('deviceMemory' in navigator) {
    // Fix TypeScript error by using a properly typed interface
    interface NavigatorWithMemory extends Navigator {
      deviceMemory?: number;
    }
    const memory = (navigator as NavigatorWithMemory).deviceMemory;
    if (memory && memory < 4) return 'LOW';
    if (memory && memory >= 8) return 'HIGH';
  }
  
  // Use screen resolution as a fallback indicator
  const pixelRatio = window.devicePixelRatio || 1;
  const screenWidth = window.screen.width * pixelRatio;
  const screenHeight = window.screen.height * pixelRatio;
  const totalPixels = screenWidth * screenHeight;
  
  // Low-end: less than HD resolution with pixel ratio considered
  if (totalPixels < 1280 * 720) return 'LOW';
  
  // High-end: 4K or higher with pixel ratio considered
  if (totalPixels >= 3840 * 2160) return 'HIGH';
  
  // Check user agent for known low-end devices
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('android 5.') || 
      userAgent.includes('android 6.') || 
      userAgent.includes('iphone os 10_') ||
      userAgent.includes('iphone os 11_')) {
    return 'LOW';
  }
  
  // Medium-tier is the default
  return 'MEDIUM';
};

// Add a flag for mobile optimizations
const OPTIMIZE_FOR_MOBILE = true;

// Modify the SchoolMarkers component to render all points but disable animations on mobile
const SchoolMarkers = React.memo(({ points, onPointClick }: { 
  points: RandomPoint[],
  onPointClick: (point: RandomPoint, x: number, y: number) => void
}) => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const isMobile = isMobileDevice();

  // Effect to control the random flickering of schools - disabled on mobile
  useEffect(() => {
    // Skip animations on mobile devices
    if (isMobile) {
      return;
    }
    
    // Desktop animation logic - unchanged
    let timeoutIds: NodeJS.Timeout[] = [];
    
    const startRandomFlickering = () => {
      // Clear any existing timeouts
      timeoutIds.forEach(id => clearTimeout(id));
      timeoutIds = [];
      
      // Set initial active indices
      setActiveIndices([]);
      
      // Function to create a random flicker
      const createFlicker = (index: number) => {
        // Generate random delay between 200ms and 8000ms
        const delay = 200 + Math.floor(Math.random() * 7800);
        
        // Schedule the flicker
        const timeoutId = setTimeout(() => {
          // Add this index to active indices
          setActiveIndices(prev => [...prev, index]);
          
          // Remove this index after the beacon animation duration
          const removeTimeoutId = setTimeout(() => {
            setActiveIndices(prev => prev.filter(i => i !== index));
            // Schedule next flicker for this same point
            createFlicker(index);
          }, 2000); // Match duration with the beacon animation
          
          timeoutIds.push(removeTimeoutId);
        }, delay);
        
        timeoutIds.push(timeoutId);
      };
      
      // Start flickers for a subset of points (to avoid too much activity)
      const maxActivePoints = Math.min(points.length, 50); // Limit max active points
      const flickerProbability = maxActivePoints / points.length; // Probability to make a point flicker
      
      points.forEach((_, index) => {
        if (Math.random() < flickerProbability) {
          // Stagger the initial flickers
          const initialDelay = Math.floor(Math.random() * 5000);
          const initialTimeoutId = setTimeout(() => {
            createFlicker(index);
          }, initialDelay);
          
          timeoutIds.push(initialTimeoutId);
        }
      });
    };
    
    // Start random flickering if we have points
    if (points.length > 0) {
      startRandomFlickering();
    }
    
    // Clean up on unmount or when points change
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [points, isMobile]);
  
  // Render ALL points on mobile, no filtering
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
            className={`beacon-container ${!isMobile && activeIndices.includes(index) ? 'active' : ''}`}
          >
            {/* Only include beacon pulse element on desktop */}
            {!isMobile && <div className="beacon-pulse"></div>}
            <div className="beacon-dot"
              style={{
                width: `${SCHOOL_DOT_SIZE}px`,
                height: `${SCHOOL_DOT_SIZE}px`,
                // Static higher opacity on mobile
                opacity: isMobile ? 0.8 : undefined
              }}
            />
          </div>
        </Marker>
      ))}
    </>
  );
});

// Add displayName back to component
SchoolMarkers.displayName = 'SchoolMarkers';

// Create a simple, elegant popup component 
const CustomPopupContent = ({ districtName, schoolNumber }: { districtName: string, schoolNumber: number }) => {
  return (
    <div style={{ 
      padding: '10px 14px',
      backgroundColor: 'white',
      borderRadius: '6px',
      width: '190px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h3 style={{ 
        fontWeight: '600', 
        fontSize: '14px',
        marginBottom: '3px',
        color: '#222',
      }}>
        {districtName}
      </h3>
      <p style={{ 
        margin: 0,
        fontSize: '12px', 
        color: '#777',
      }}>
        Strata School #{schoolNumber}
      </p>
    </div>
  );
};

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
  // Add state for animation
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number | null>(null);
  // Add a ref to ensure we don't have race conditions with isPlaying state
  const isPlayingRef = useRef<boolean>(false);
  // 1. Add state to track when map is fully initialized
  const [mapInitialized, setMapInitialized] = useState(false);
  
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
    longitude: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.longitude : FIXED_COORDINATES.desktop.longitude,
    latitude: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.latitude : FIXED_COORDINATES.desktop.latitude,
    zoom: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.zoom : FIXED_COORDINATES.desktop.zoom,
    bearing: 0,
    pitch: 0,
    padding: null,
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Create a ref to store the initial view state so we can reset to it if needed
  const initialViewStateRef = useRef<CustomViewState>({
    longitude: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.longitude : FIXED_COORDINATES.desktop.longitude,
    latitude: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.latitude : FIXED_COORDINATES.desktop.latitude,
    zoom: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.zoom : FIXED_COORDINATES.desktop.zoom,
    bearing: 0,
    pitch: 0,
    padding: null,
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Add a ref to store the initial center position explicitly
  const initialCenterRef = useRef<{lng: number, lat: number}>({
    lng: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.longitude : FIXED_COORDINATES.desktop.longitude,
    lat: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.latitude : FIXED_COORDINATES.desktop.latitude
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
    console.log("Organizing points by district");
    
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

  // Add validation function to detect coordinate shifts
  const validateCoordinates = useCallback((points: RandomPoint[]): boolean => {
    if (!VALIDATE_COORDINATES || points.length === 0) return true;
    
    // Check if coordinates in the first few points seem valid
    // This is a basic check - real districts would need more sophisticated validation
    const validLongitudeRange = [-110, -90]; // Valid Texas longitude range
    const validLatitudeRange = [25, 37];    // Valid Texas latitude range
    
    for (let i = 0; i < Math.min(points.length, 10); i++) {
      const point = points[i];
      if (point.lng < validLongitudeRange[0] || point.lng > validLongitudeRange[1] ||
          point.lat < validLatitudeRange[0] || point.lat > validLatitudeRange[1]) {
        console.error(`Invalid coordinate detected at index ${i}:`, point);
        return false;
      }
    }
    
    // If we've cached valid points previously, compare with current points
    const cachedPoints = sessionStorage.getItem('validatedSchoolPoints');
    if (cachedPoints && points.length > 0) {
      try {
        const parsedPoints = JSON.parse(cachedPoints);
        
        // Compare a few points to see if they've shifted significantly
        for (let i = 0; i < Math.min(points.length, parsedPoints.length, 5); i++) {
          const newPoint = points[i];
          const oldPoint = parsedPoints[i];
          
          // Calculate distance between points
          const latDiff = Math.abs(newPoint.lat - oldPoint.lat);
          const lngDiff = Math.abs(newPoint.lng - oldPoint.lng);
          
          if (latDiff > COORDINATE_ERROR_THRESHOLD || lngDiff > COORDINATE_ERROR_THRESHOLD) {
            console.error(`Point shift detected at index ${i}:`, {
              old: oldPoint,
              new: newPoint,
              latDiff,
              lngDiff
            });
            return false;
          }
        }
      } catch (e) {
        console.warn('Error validating cached points:', e);
      }
    }
    
    // If all checks pass, cache these points as valid
    try {
      // Only store first 20 points to keep size manageable
      sessionStorage.setItem('validatedSchoolPoints', JSON.stringify(points.slice(0, 20)));
      // Store the map version to track changes
      sessionStorage.setItem('mapVersion', MAP_VERSION);
    } catch (e) {
      console.warn('Error caching validated points:', e);
    }
    
    return true;
  }, []);

  // Add function to check for map version changes
  const checkMapVersion = useCallback(() => {
    const storedMapVersion = sessionStorage.getItem('mapVersion');
    if (storedMapVersion && storedMapVersion !== MAP_VERSION) {
      console.warn(`Map version changed from ${storedMapVersion} to ${MAP_VERSION}, clearing cached data`);
      sessionStorage.removeItem('validatedSchoolPoints');
      sessionStorage.removeItem('texasDistrictsGeoJson');
      sessionStorage.setItem('mapVersion', MAP_VERSION);
      return false;
    }
    return true;
  }, []);

  // Simple GeoJSON simplifier for preprocessing
  const simplifyGeoJSON = (data: GeoJSON.FeatureCollection): GeoJSON.FeatureCollection => {
    if (!data || !data.features) return data;
    
    const isMobile = isMobileDevice();
    const deviceTier = getDeviceTier();
    
    // Skip simplification for desktop or if already simplified
    if (!isMobile || data.features.length < 300) return data;
    
    // Choose simplification level based on device tier
    const simplificationFactor = GEOJSON_SIMPLIFICATION.MOBILE[deviceTier];
    
    console.log(`Simplifying GeoJSON with factor ${simplificationFactor} for ${deviceTier} device`);
    
    // Create a copy to avoid mutating the original
    const result = {
      type: 'FeatureCollection',
      features: data.features.map(feature => {
        // Only process geometry if it exists
        if (!feature.geometry) return feature;
        
        const simplifiedFeature = {...feature};
        
        // Simplify polygon coordinates
        if (feature.geometry.type === 'Polygon') {
          // Skip small polygons with few points
          if (feature.geometry.coordinates[0].length <= 10) return feature;
          
          // Simplify by keeping every Nth point based on simplification factor
          const skipFactor = Math.max(1, Math.round(feature.geometry.coordinates[0].length * simplificationFactor));
          
          // Ensure we keep first and last point to close the polygon
          simplifiedFeature.geometry = {
            ...feature.geometry,
            coordinates: feature.geometry.coordinates.map(ring => {
              // Always keep first and last point (identical in a valid polygon)
              const first = ring[0];
              const last = ring[ring.length - 1];
              
              // Filter points in the middle
              const simplifiedPoints = [first];
              for (let i = 1; i < ring.length - 1; i += skipFactor) {
                simplifiedPoints.push(ring[i]);
              }
              simplifiedPoints.push(last);
              
              return simplifiedPoints;
            })
          };
        } 
        else if (feature.geometry.type === 'MultiPolygon') {
          simplifiedFeature.geometry = {
            ...feature.geometry,
            coordinates: feature.geometry.coordinates.map(polygon => 
              polygon.map(ring => {
                // Skip simplification for small rings
                if (ring.length <= 10) return ring;
                
                // Simplify by keeping every Nth point
                const skipFactor = Math.max(1, Math.round(ring.length * simplificationFactor));
                
                // Always keep first and last point
                const first = ring[0];
                const last = ring[ring.length - 1];
                
                // Filter points in the middle
                const simplifiedPoints = [first];
                for (let i = 1; i < ring.length - 1; i += skipFactor) {
                  simplifiedPoints.push(ring[i]);
                }
                simplifiedPoints.push(last);
                
                return simplifiedPoints;
              })
            )
          };
        }
        
        return simplifiedFeature;
      })
    } as GeoJSON.FeatureCollection;
    
    // Log reduction in point count
    const originalPointCount = countPoints(data);
    const simplifiedPointCount = countPoints(result);
    console.log(`Reduced points from ${originalPointCount} to ${simplifiedPointCount} (${Math.round((simplifiedPointCount/originalPointCount)*100)}%)`);
    
    return result;
  };
  
  // Helper to count total points in GeoJSON
  const countPoints = (data: GeoJSON.FeatureCollection): number => {
    let count = 0;
    
    data.features.forEach(feature => {
      if (!feature.geometry) return;
      
      if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates.forEach(ring => {
          count += ring.length;
        });
      } 
      else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach(polygon => {
          polygon.forEach(ring => {
            count += ring.length;
          });
        });
      }
    });
    
    return count;
  };

  // Modify the fetchData function to apply point validation and preprocess GeoJSON for mobile
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadingProgress('Checking for cached data...');
        
        // Check map version and clear cache if needed
        const isVersionValid = checkMapVersion();
        
        // Get device-specific cache key based on tier and network condition
        const isMobile = isMobileDevice();
        const deviceTier = getDeviceTier();
        const networkCondition = getNetworkCondition();
        
        // Determine which file/detail level we're using for this device
        let detailLevel = 'full';
        if (isMobile) {
          if (deviceTier === 'LOW' || networkCondition === 'slow') {
            detailLevel = 'minimal';
          } else if (deviceTier === 'MEDIUM') {
            detailLevel = 'low';
          } else {
            detailLevel = 'medium';
          }
        } else if (networkCondition === 'slow') {
          detailLevel = 'high';
        }
        
        const sessionCacheKey = `texasDistrictsGeoJson_${detailLevel}_${MAP_VERSION}`;
        const localCacheKey = `texasDistricts_persistent_${detailLevel}_${MAP_VERSION}`;
        
        // Try to get cached data from multiple sources
        let geoJsonData;
        let needsFullData = true; // Flag to indicate if we need to fetch the full data
        
        // Try sessionStorage first (fastest, has the fully processed data)
        const sessionCachedData = isVersionValid ? sessionStorage.getItem(sessionCacheKey) : null;
        
        if (sessionCachedData) {
          console.log(`Using cached GeoJSON data from session storage (${sessionCacheKey})`);
          setLoadingProgress('Loading cached data...');
          geoJsonData = JSON.parse(sessionCachedData);
          needsFullData = false; // We have the full data already
        } 
        // If not in session storage, try localStorage for a quick initial render
        // This will be a simplified version we can show while fetching full data
        else if (isMobile && isVersionValid) {
          const localCachedData = localStorage.getItem(localCacheKey);
          
          if (localCachedData) {
            console.log(`Using simplified GeoJSON from local storage for quick initial render (${localCacheKey})`);
            setLoadingProgress('Loading simplified data while fetching full data...');
            
            // Parse and use the simplified data
            const simplifiedData = JSON.parse(localCachedData);
            geoJsonData = simplifiedData;
            
            // In parallel, start fetching the full data
            needsFullData = true;
            
            // Show this data immediately to the user for a fast initial render
            setGeoJsonData(simplifiedData);
          } else {
            // No cached data available, need to fetch everything
            needsFullData = true;
          }
        }
        
        // If we need to fetch the full data (either no cache or just using simplified data)
        if (needsFullData) {
          console.log('Fetching GeoJSON data from server');
          setLoadingProgress('Downloading map data...');
          
          // Determine which GeoJSON file to use based on device capability
          let geoJsonUrl = '/data/Current_Districts_2025.geojson'; // Default for desktop
          
          if (isMobile) {
            const networkCondition = getNetworkCondition();
            const deviceTier = getDeviceTier();
            
            console.log(`Mobile device detected: ${deviceTier} tier with ${networkCondition} network`);
            
            // For low memory or slow connection, use the most optimized version
            if (deviceTier === 'LOW' || networkCondition === 'slow') {
              geoJsonUrl = '/data/mobile/districts_minimal.geojson';
              console.log('Using minimal GeoJSON (most optimized) for low-end device or slow network');
            } 
            // For medium devices with better connection
            else if (deviceTier === 'MEDIUM') {
              geoJsonUrl = '/data/mobile/districts_low.geojson';
              console.log('Using low detail GeoJSON for medium-tier device');
            }
            // For high-end devices
            else {
              geoJsonUrl = '/data/mobile/districts_medium.geojson';
              console.log('Using medium detail GeoJSON for high-tier device');
            }
          } else {
            // For desktop devices with slow connections
            if (getNetworkCondition() === 'slow') {
              geoJsonUrl = '/data/mobile/districts_high.geojson';
              console.log('Using high detail GeoJSON for desktop with slow network');
            }
            console.log(`Using standard GeoJSON file: ${geoJsonUrl}`);
          }
          
          // Fetch the appropriate file
          let response = await fetch(geoJsonUrl);
          if (!response.ok) {
            console.error(`Failed to fetch optimized data file (${geoJsonUrl}), trying fallback file`);
            
            // Try fallback to minimal version if the specific tier file fails
            const fallbackResponse = await fetch('/data/mobile/districts_minimal.geojson');
            if (!fallbackResponse.ok) {
              throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            
            response = fallbackResponse; // Use the fallback response
          }
          setLoadingProgress('Processing GeoJSON data...');
          const rawData = await response.json();
          
          // Preprocess the GeoJSON data for mobile if needed
          setLoadingProgress(isMobile ? 'Optimizing for mobile...' : 'Processing data...');
          geoJsonData = simplifyGeoJSON(rawData);
          
          // Implement enhanced caching with both localStorage and sessionStorage
          try {
            setLoadingProgress('Caching data for faster reload...');
            
            // Try to store in sessionStorage first (for the current session)
            try {
              sessionStorage.setItem(sessionCacheKey, JSON.stringify(geoJsonData));
              console.log(`Cached GeoJSON in sessionStorage with key: ${sessionCacheKey}`);
            } catch (sessionError) {
              console.warn(`Could not cache GeoJSON in sessionStorage (${sessionCacheKey}):`, sessionError);
            }
            
            // For mobile, also try to store a simplified version in localStorage (persistent across sessions)
            // This gives faster initial loads even after browser restarts
            if (isMobile) {
              // Create even more simplified version for persistent storage
              // Use the same detail level we determined earlier
              const persistentCacheKey = localCacheKey;
              
              // Store only essential district data (IDs, names, and coordinates) for quicker initial rendering
              const minimalData = {
                type: 'FeatureCollection',
                features: geoJsonData.features.map(feature => ({
                  type: 'Feature',
                  properties: {
                    DISTRICT_I: feature.properties?.DISTRICT_I || '',
                    DISTRICT_N: feature.properties?.DISTRICT_N || '',
                    Name20: feature.properties?.Name20 || '',
                  },
                  geometry: feature.geometry
                }))
              };
              
              try {
                localStorage.setItem(persistentCacheKey, JSON.stringify(minimalData));
                console.log(`Cached simplified GeoJSON in localStorage with key: ${persistentCacheKey}`);
              } catch (localError) {
                console.warn(`Could not cache simplified GeoJSON in localStorage (${persistentCacheKey}):`, localError);
              }
            }
          } catch (e) {
            console.warn(`Could not perform caching operations (${sessionCacheKey}):`, e);
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
        
        // Implement progressive loading for mobile
        const useProgressiveLoading = isMobile && getNetworkCondition() === 'slow';
        
        // Process points using Web Worker if supported
        if (typeof Worker !== 'undefined') {
          setLoadingProgress('Initializing worker for point processing...');
          
          try {
            // Create a new worker
            const worker = new Worker(new URL('../../workers/geoJsonWorker.ts', import.meta.url));
            
            // Pass device info to worker for optimizations
            worker.postMessage({ 
              type: 'init', 
              isMobile, 
              deviceTier: getDeviceTier(),
              networkCondition: getNetworkCondition()
            });
            
            // Set up message handling
            worker.onmessage = (event) => {
              const { type, message, data } = event.data;
              
              if (type === 'status') {
                setLoadingProgress(message);
              } else if (type === 'progress') {
                setLoadingProgress(message);
                
                // Handle progressive loading for slow networks
                if (useProgressiveLoading && data && data.progressiveData) {
                  // Set partial data while still loading
                  setGeoJsonData(data.progressiveData);
                }
              } else if (type === 'cache') {
                // Store the cached data for validation
                try {
                  if (data.samplePoints && data.mapVersion) {
                    sessionStorage.setItem('validatedSchoolPoints', JSON.stringify(data.samplePoints));
                    sessionStorage.setItem('mapVersion', data.mapVersion);
                  }
                } catch (e) {
                  console.warn('Error storing cached points from worker:', e);
                }
              } else if (type === 'processed_data') {
                // Validate the coordinates before accepting them
                if (validateCoordinates(data.allOrderedPoints)) {
                  // Set the processed data
                  setAllPoints(data.allOrderedPoints);
                  setRandomPoints([]);
                  setLoadingProgress('Finalizing...');
                } else {
                  // If validation fails, show error and fall back to fixed coordinates
                  console.error('Coordinate validation failed, using fallback data');
                  setLoadingProgress('Using fallback data due to coordinate validation failure...');
                  fallbackToMainThreadProcessing(geoJsonData);
                }
                
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
      setLoadingProgress('Processing points...');
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
  }, [carrolltonDistrictId, organizePointsByDistrict, validateCoordinates, checkMapVersion]);

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
        // Carrollton area - our very first school
        {
          lat: 32.9751,
          lng: -96.8897,
          districtId: "057903",
          districtName: "Carrollton-Farmers Branch ISD",
          isCenter: true
        }
      ];

      // Define January 2026 expansion schools (spike at slider value ~20-25)
      const expansionSchools = [
        // Dallas area
        { lat: 32.7767, lng: -96.7970, districtId: "057903", districtName: "Dallas ISD", isCenter: true },
        // North Dallas/Plano area
        { lat: 33.0198, lng: -96.6989, districtId: "043910", districtName: "Plano ISD", isCenter: true },
        // Austin area
        { lat: 30.2672, lng: -97.7431, districtId: "227901", districtName: "Austin ISD", isCenter: true },
        // Richardson
        { lat: 32.9483, lng: -96.7299, districtId: "057916", districtName: "Richardson ISD", isCenter: true },
        // Irving
        { lat: 32.8140, lng: -96.9489, districtId: "057912", districtName: "Irving ISD", isCenter: true },
        // Garland
        { lat: 32.9126, lng: -96.6389, districtId: "057909", districtName: "Garland ISD", isCenter: true },
        // Mesquite
        { lat: 32.7668, lng: -96.5992, districtId: "057914", districtName: "Mesquite ISD", isCenter: true },
        // Houston area
        { lat: 29.7604, lng: -95.3698, districtId: "101912", districtName: "Houston ISD", isCenter: true },
        { lat: 29.8405, lng: -95.4653, districtId: "101924", districtName: "Spring Branch ISD", isCenter: true },
        { lat: 29.6857, lng: -95.2794, districtId: "101916", districtName: "Pasadena ISD", isCenter: true },
        { lat: 29.9377, lng: -95.6772, districtId: "101907", districtName: "Cypress-Fairbanks ISD", isCenter: true },
        { lat: 30.0371, lng: -95.4288, districtId: "101915", districtName: "Spring ISD", isCenter: true },
        // San Antonio area
        { lat: 29.4241, lng: -98.4936, districtId: "015907", districtName: "San Antonio ISD", isCenter: true },
        { lat: 29.5693, lng: -98.6447, districtId: "015915", districtName: "Northside ISD", isCenter: true },
        { lat: 29.4832, lng: -98.3995, districtId: "015910", districtName: "Northeast ISD", isCenter: true },
        // Fort Worth area
        { lat: 32.7555, lng: -97.3308, districtId: "220905", districtName: "Fort Worth ISD", isCenter: true },
        { lat: 32.8998, lng: -97.2881, districtId: "220914", districtName: "Keller ISD", isCenter: true },
        { lat: 32.6949, lng: -97.1209, districtId: "220901", districtName: "Arlington ISD", isCenter: true },
        // El Paso
        { lat: 31.7619, lng: -106.4850, districtId: "071902", districtName: "El Paso ISD", isCenter: true },
        { lat: 31.8140, lng: -106.2485, districtId: "071909", districtName: "Ysleta ISD", isCenter: true }
      ];
      
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
      
      // Calculate the total points that should be visible based on slider value
      const calculateVisiblePointCount = (sliderValue: number, isMobile: boolean): number => {
        // August 2025 to January 2026 (slider = 0-20): Always 1 school
        if (sliderValue <= 20) {
          return 1;
        }
        
        // January 2026 spike (slider = 20-25): Spike from 1 to ~50 schools
        if (sliderValue > 20 && sliderValue <= 25) {
          // Rapid increase from 1 to 50 schools
          return Math.floor(1 + ((sliderValue - 20) / 5) * 49);
        }
        
        // From January 2026 to August 2026 (slider = 25-50): 50 to 1200 schools
        if (sliderValue > 25 && sliderValue <= 50) {
          // Gradual increase from 50 to 1200
          return Math.floor(50 + ((sliderValue - 25) / 25) * (1200 - 50));
        }
        
        // From August 2026 to August 2027 (slider = 50-100)
        if (sliderValue > 50) {
          if (isMobile) {
            // On mobile, use device-specific point limit
            const deviceTier = getDeviceTier();
            return MOBILE_POINT_LIMITS[deviceTier];
          } else {
            // On desktop, gradual increase from 1200 to 5000 schools
            return Math.floor(1200 + ((sliderValue - 50) / 50) * (5000 - 1200));
          }
        }
        
        return 1; // Default fallback
      };
      
      // Detect if we're on a mobile device
      const isMobile = isMobileDevice();
      
      // Calculate the target number of points to show
      const targetPointCount = calculateVisiblePointCount(sliderValue, isMobile);
      
      // Now implement a smooth, deterministic appearance of points
      if (sliderValue === 0) {
        // At August 2025, only show the initial single school
        visiblePoints = initialSchools;
      } else if (sliderValue <= 25) {
        // January 2026 spike - show the expansion schools (about 50 schools)
        // Gradually add schools from expansionSchools as slider approaches 25
        const pointsToShow = Math.min(expansionSchools.length, 
          Math.floor((sliderValue / 25) * expansionSchools.length));
        
        visiblePoints = [
          ...initialSchools,
          ...expansionSchools.slice(0, pointsToShow)
        ];
      } else {
        // After January 2026, start filling in with center points from all districts, then additional points
        
        // All expansion schools are visible
        visiblePoints = [...initialSchools, ...expansionSchools];
        
        // Get remaining center points
        const remainingCenterPoints = allCenterPoints.filter(
          p => !initialSchools.some(is => is.districtId === p.districtId && is.lng === p.lng && is.lat === p.lat) &&
               !expansionSchools.some(es => es.districtId === p.districtId && es.lng === p.lng && es.lat === p.lat)
        );
        
        // Calculate how many additional center points to add
        let pointsNeeded = targetPointCount - visiblePoints.length;
        if (pointsNeeded > 0) {
          // Add as many center points as needed, up to the max available
          const centerPointsToAdd = Math.min(pointsNeeded, remainingCenterPoints.length);
          visiblePoints = [...visiblePoints, ...remainingCenterPoints.slice(0, centerPointsToAdd)];
          
          // Recalculate points still needed
          pointsNeeded = targetPointCount - visiblePoints.length;
          
          // If we still need more points, start adding additional (non-center) points
          if (pointsNeeded > 0) {
            visiblePoints = [...visiblePoints, ...allAdditionalPoints.slice(0, pointsNeeded)];
          }
        }
      }
      
      // Ensure we don't exceed the target count (should not happen, but just in case)
      if (visiblePoints.length > targetPointCount) {
        visiblePoints = visiblePoints.slice(0, targetPointCount);
      }
      
      // Track which districts have schools
      visiblePoints.forEach(point => {
        if (!newDistrictsWithSchools.includes(point.districtId)) {
          newDistrictsWithSchools.push(point.districtId);
        }
      });
      
      // Log a message about limiting points on mobile
      if (isMobile && sliderValue > 50) {
        const deviceTier = getDeviceTier();
        console.log(`Mobile device detected (${deviceTier} tier): Limiting to ${MOBILE_POINT_LIMITS[deviceTier]} points for better performance`);
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
      const zoom = isMobile ? 4.2 : 5.0;
      
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
      zoom: isMobile ? 4.2 : 5.0,
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
              zoom: window.innerWidth < 768 ? 4.5 : 5.0,
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

  // Enhanced event prevention for map interactions
  useEffect(() => {
    // Completely prevent wheel events for zoom
    const preventZoom = (e: WheelEvent) => {
      // Always prevent wheel events when ctrl key is pressed (zoom gesture)
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Prevent map movement events, but allow page scrolling to continue
    const preventMapMovement = (e: Event) => {
      if (mapMovementLocked) {
        // Only stop propagation, don't prevent default scrolling behavior
        e.stopPropagation();
      }
    };
    
    // Fix for mobile rubberbanding: prevent touchmove on map container only
    const preventTouchMove = (e: TouchEvent) => {
      // Only prevent default if it's a map interaction (not page scroll)
      if (mapMovementLocked && e.target && (e.target as Element).closest('.mapboxgl-map')) {
        e.preventDefault();
      }
    };
    
    // Fix for body scroll when interacting with map
    const preventBodyScroll = (e: TouchEvent) => {
      // If touch starts on map, prevent body scroll temporarily
      if (e.target && (e.target as Element).closest('.mapboxgl-map')) {
        // Add a class to body to disable scrolling during map interaction
        document.body.classList.add('map-interaction');
      }
    };
    
    // Reset body scroll when touch ends
    const resetBodyScroll = () => {
      document.body.classList.remove('map-interaction');
    };

    // Add the event listeners to the document
    document.addEventListener('wheel', preventZoom, { passive: false });
    
    // Add event listeners for map container
    const mapContainer = document.querySelector('.mapboxgl-map');
    if (mapContainer) {
      // Use capture: true to intercept events before they reach the map
      mapContainer.addEventListener('mousedown', preventMapMovement, { capture: true });
      mapContainer.addEventListener('touchstart', preventBodyScroll, { capture: true });
      mapContainer.addEventListener('touchmove', preventTouchMove, { capture: true, passive: false });
      mapContainer.addEventListener('touchend', resetBodyScroll);
      mapContainer.addEventListener('touchcancel', resetBodyScroll);
      mapContainer.addEventListener('wheel', preventMapMovement, { capture: true });
    }
    
    // Add global style for body during map interaction
    const style = document.createElement('style');
    style.textContent = `
      body.map-interaction {
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
      }
    `;
    document.head.appendChild(style);
    
    // Store a reference to the style element for proper cleanup

    // Cleanup
    return () => {
      document.removeEventListener('wheel', preventZoom);
      if (mapContainer) {
        mapContainer.removeEventListener('mousedown', preventMapMovement);
        mapContainer.removeEventListener('touchstart', preventBodyScroll);
        mapContainer.removeEventListener('touchmove', preventTouchMove);
        mapContainer.removeEventListener('touchend', resetBodyScroll);
        mapContainer.removeEventListener('touchcancel', resetBodyScroll);
        mapContainer.removeEventListener('wheel', preventMapMovement);
      }
      // Remove the style element on unmount
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, [mapMovementLocked]);

  // Modify the handleResize function to use fixed coordinates
  const handleResize = () => {
    // Detect if we're on a mobile device (width < 768px)
    const isMobile = window.innerWidth < 768;
    
    // Create updated view state with correct zoom level using fixed coordinates
    const updatedViewState = {
      ...initialViewStateRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: isMobile ? FIXED_COORDINATES.mobile.longitude : FIXED_COORDINATES.desktop.longitude,
      latitude: isMobile ? FIXED_COORDINATES.mobile.latitude : FIXED_COORDINATES.desktop.latitude,
      zoom: isMobile ? FIXED_COORDINATES.mobile.zoom : FIXED_COORDINATES.desktop.zoom
    };
    
    // Update both state and ref to keep them in sync
    setViewState(updatedViewState);
    initialViewStateRef.current = updatedViewState;
    initialCenterRef.current = {
      lng: updatedViewState.longitude,
      lat: updatedViewState.latitude
    };
    
    // Force map to update if available
    if (mapRef.current) {
      try {
        const map = mapRef.current.getMap();
        map.resize();
        // Force position after resize
        map.jumpTo({
          center: [initialCenterRef.current.lng, initialCenterRef.current.lat],
          zoom: updatedViewState.zoom
        });
      } catch (e) {
        console.error("Error applying resize:", e);
      }
    }
  };

  // Adjust zoom level based on screen size and apply handleResize
  useEffect(() => {
    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modify the onMapLoad callback to ensure consistent positioning
  const onMapLoad = useCallback(({ target }: { target: mapboxgl.Map }) => {
    if (!mapRef.current) return;
    
    const map = target;
    
    // Store the original methods before we override them
    const originalJumpTo = Object.getPrototypeOf(map).jumpTo;
    const originalSetZoom = Object.getPrototypeOf(map).setZoom;
    
    // Store initial center and force it to remain fixed
    // Get the latest zoom level based on screen size
    const isMobile = window.innerWidth < 768;
    const initialZoom = isMobile ? FIXED_COORDINATES.mobile.zoom : FIXED_COORDINATES.desktop.zoom;
    const initialCenter = [
      isMobile ? FIXED_COORDINATES.mobile.longitude : FIXED_COORDINATES.desktop.longitude,
      isMobile ? FIXED_COORDINATES.mobile.latitude : FIXED_COORDINATES.desktop.latitude
    ];
    
    // Immediately force the map to the correct position/zoom using the original methods
    if (typeof originalJumpTo === 'function') {
      originalJumpTo.call(map, {
        center: initialCenter,
        zoom: initialZoom,
        animate: false // Disable animation for immediate positioning
      });
    }
    
    // Set a short timeout to force position again after any auto-fitting might have occurred
    // and only then mark the map as initialized to render markers
    setTimeout(() => {
      if (typeof originalJumpTo === 'function') {
        originalJumpTo.call(map, {
          center: initialCenter,
          zoom: initialZoom,
          animate: false
        });
      }
      // Freeze the map's internal transform state to prevent automatic position updates
      if (map._frame) {
        map._frame.cancel();
        map._frame = null;
      }
      
      // Now mark the map as initialized, which will render the markers
      setMapInitialized(true);
    }, 100);
    
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
            center: initialCenter,
            zoom: initialZoom,
            animate: false
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
      
      // Add a move event listener to immediately reset position if it changes
      map.on('move', () => {
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();
        
        // Check if position has drifted
        if (Math.abs(currentCenter.lng - initialCenter[0]) > 0.001 || 
            Math.abs(currentCenter.lat - initialCenter[1]) > 0.001 ||
            Math.abs(currentZoom - initialZoom) > 0.01) {
          
          // Reset position
          if (typeof originalJumpTo === 'function') {
            originalJumpTo.call(map, {
              center: initialCenter,
              zoom: initialZoom,
              animate: false
            });
          }
        }
      });
      
      // Override all map movement methods to be no-ops
      map.jumpTo = (options) => {
        // Allow only our internal jumps that match our initial state
        if (
          options && 
          (
            options.zoom === initialZoom ||
            (options.center && 
             options.center[0] === initialCenter[0] && 
             options.center[1] === initialCenter[1])
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

  // Simplify the marker click handler
  const handleMarkerClick = useCallback((point: RandomPoint, x: number, y: number) => {
    // Find the associated district with this point
    if (geoJsonData) {
      const district = geoJsonData.features.find(
        feature => feature.properties && feature.properties.DISTRICT_I === point.districtId
      );
      
      // Get district name from properties or use existing
      const districtName = district?.properties?.Name20 || point.districtName;
      
      setPopupInfo({
        point: {
          ...point,
          districtDisplayName: districtName
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

  // Add this function to get a formatted count string and date
  const getFormattedInfo = useCallback((points: RandomPoint[], districtsWithSchools: string[], sliderYear: number, sliderValue: number) => {
    // Format the date based on slider value
    const formatDate = (sliderValue: number) => {
      // Map slider values directly to dates
      // Slider 0 = August 2025
      // Slider 50 = August 2026  
      // Slider 100 = August 2027
      
      // Start with August 2025
      const baseYear = 2025;
      const baseMonth = 7; // 0-based month index (7 = August)
      
      // Calculate months to add (0-24 for the range)
      const monthsToAdd = Math.floor((sliderValue / 100) * 24);
      
      // Calculate new year and month
      const totalMonths = baseMonth + monthsToAdd;
      const yearOffset = Math.floor(totalMonths / 12);
      const newMonth = totalMonths % 12;
      const newYear = baseYear + yearOffset;
      
      // Create date object and format
      const date = new Date(newYear, newMonth, 1);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };
    
    // Detect if we're on a mobile device and points are being limited
    const isMobile = isMobileDevice();
    const isLimited = isMobile && sliderValue > 50;
    
    // Get device tier for dynamic point limits
    const deviceTier = getDeviceTier();
    
    // Calculate the full count that would be shown (for the limited message)
    const getFullCount = () => {
      if (sliderValue > 50) {
        return Math.floor(1200 + ((sliderValue - 50) / 50) * (5000 - 1200));
      }
      return points.length;
    };
    
    return {
      schoolCount: points.length,
      districtCount: districtsWithSchools.length,
      formattedDate: formatDate(sliderValue),
      formattedString: isLimited
        ? `${points.length.toLocaleString()} of ${getFullCount().toLocaleString()} Strata Schools`
        : points.length === 1 
          ? "1 Strata School" 
          : `${points.length.toLocaleString()} Strata Schools`,
      deviceTier: deviceTier  // Add device tier for potential display
    };
  }, []);

  // Add an effect to manipulate the DOM directly for popups if necessary
  useEffect(() => {
    if (popupInfo) {
      // Small timeout to ensure the popup has rendered
      const timeoutId = setTimeout(() => {
        // Get all popup divs
        const popupElements = document.querySelectorAll('.mapboxgl-popup-content');
        
        // Loop through each popup
        popupElements.forEach(popupElement => {
          // Find any unwanted content that might be district IDs
          const possibleDistrictIdElements = popupElement.querySelectorAll('div:not([style])');
          
          // Remove any elements that are likely showing district IDs
          possibleDistrictIdElements.forEach(element => {
            if (element.textContent && /^\d+$/.test(element.textContent.trim())) {
              // Use proper type assertion for HTMLElement
              (element as HTMLElement).style.display = 'none';
            }
          });
        });
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [popupInfo]);

  // Add animation logic for slider
  const startAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      console.log("Animation already running, not starting a new one");
      return;
    }
    
    console.log("Starting animation");
    isPlayingRef.current = true;
    setIsPlaying(true);
    
    const animate = () => {
      if (!isPlayingRef.current) {
        console.log("Animation stopped, not continuing");
        return;
      }
      
      setSliderValue(prevValue => {
        const newValue = prevValue + 1;
        if (newValue >= 100) {
          console.log("Animation reached end, stopping");
          stopAnimation();
          return 100;
        }
        return newValue;
      });
      
      // Use a direct timeout instead of nesting in requestAnimationFrame
      animationRef.current = window.setTimeout(animate, 250);
    };

    // Start the first iteration directly with setTimeout
    animationRef.current = window.setTimeout(animate, 250);
  }, []);

  const stopAnimation = useCallback(() => {
    console.log("Stopping animation, current animationRef:", animationRef.current);
    // Update the ref first to prevent any new animation frames from starting
    isPlayingRef.current = false;
    setIsPlaying(false);
    
    if (animationRef.current !== null) {
      // Clear the timeout instead of cancelAnimationFrame
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    console.log("Toggle play/pause called, current state:", isPlaying, "ref state:", isPlayingRef.current);
    
    // Use the ref value for more reliable state checking
    if (isPlayingRef.current) {
      console.log("Stopping animation based on ref");
      stopAnimation();
    } else {
      console.log("Starting animation based on ref");
      // If we're at the end, start over
      if (sliderValue >= 100) {
        setSliderValue(0);
      }
      startAnimation();
    }
  }, [sliderValue, startAnimation, stopAnimation]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        clearTimeout(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  // Add mobile detection to component
  const isMobile = isMobileDevice();
  
  // Add loading and error handlers
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center p-8 max-w-md">
          {/* Simple clean spinner */}
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-white animate-spin opacity-80"></div>
          </div>
          <p className="text-lg font-light tracking-wider text-white opacity-80">{loadingProgress}</p>
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
  
  // Replace the entire return statement
  return (
    <div className="relative w-full h-full">
      {/* Add global styles for popups */}
      <style>{`
        /* Global popup styles */
        .mapboxgl-popup {
          z-index: 100;
        }
        
        .mapboxgl-popup-content {
          padding: 0 !important;
          overflow: visible !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        
        .mapboxgl-popup-tip {
          border-top-color: white !important;
          border-width: 8px !important;
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
        }
        
        /* Subtle animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Make close button subtle */
        .mapboxgl-popup-close-button {
          font-size: 16px !important;
          color: #bbb !important;
          top: 2px !important;
          right: 4px !important;
          background: transparent !important;
          border: none !important;
          padding: 4px !important;
          line-height: 1 !important;
          opacity: 0.6 !important;
        }
        
        .mapboxgl-popup-close-button:hover {
          color: #666 !important;
          background: transparent !important;
          opacity: 1 !important;
        }
        
        /* Add subtle animation to popup */
        .mapboxgl-popup-content > div {
          animation: fadeIn 0.15s ease-out;
        }
        
        /* Hide Mapbox attribution */
        .mapboxgl-ctrl-attrib, 
        .mapboxgl-ctrl-bottom-right, 
        .mapboxgl-ctrl-logo {
          display: none !important;
        }
        
        /* Custom slider styling */
        input[type="range"] {
          -webkit-appearance: none;
          height: 8px;
          border-radius: 5px;
          background: #e2e8f0;
          outline: none;
        }
        
        /* Webkit (Chrome, Safari, Edge) thumb styling */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        /* Mozilla (Firefox) thumb styling */
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        /* Track color to left of thumb in Chrome/Safari/Edge */
        input[type="range"] {
          background: linear-gradient(to right, #000 0%, #000 calc(var(--progress-percent) * 100%), #e2e8f0 calc(var(--progress-percent) * 100%), #e2e8f0 100%);
        }
        
        /* Track color to left of thumb in Firefox */
        input[type="range"]::-moz-range-progress {
          background-color: #000;
          border-radius: 5px;
        }

        /* Play/Pause button styles */
        .play-pause-btn {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .play-pause-btn:hover {
          transform: scale(1.05);
        }
        
        .play-pause-btn svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }
        
        /* Beacon effect styles */
        .beacon-container {
          position: relative;
          width: ${SCHOOL_DOT_SIZE}px;
          height: ${SCHOOL_DOT_SIZE}px;
          opacity: 0.75; /* Increase from 0.6 to 0.75 for even brighter default state */
          transition: opacity 0.3s ease;
        }
        
        .beacon-dot {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          background-color: white;
          border: 1.5px solid rgba(51, 51, 51, 0.7);
          z-index: 2;
          transition: all 0.3s ease; /* Smooth transition for glowing effect */
        }
        
        .beacon-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2); /* Brighter background */
          z-index: 1;
          transform: scale(1);
          opacity: 0;
        }
        
        /* When container is active, activate the dot and pulse */
        .beacon-container.active .beacon-dot {
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(255, 255, 255, 0.6); /* Even brighter glow */
        }
        
        .beacon-container.active .beacon-pulse {
          animation: pulse 2s forwards;
        }
        
        /* Pulse animation for the glowing effect */
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.9; /* Increase from 0.8 to 0.9 */
          }
          50% {
            transform: scale(2);
            opacity: 0.4; /* Increase from 0.3 to 0.4 */
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .beacon-container {
            opacity: 0.8 !important; /* Force higher opacity on mobile */
            animation: none !important; /* Disable animations */
          }
          
          .beacon-pulse {
            display: none !important; /* Hide pulse effects on mobile */
          }
        }
      `}</style>
      
      {/* Timeline Bar - always show, even on mobile */}
      <div className="absolute top-0 left-0 w-full z-30 flex flex-col items-center pointer-events-none">
        <div className="backdrop-blur-md bg-white/80 rounded-b-xl shadow-lg px-6 pt-4 pb-2 w-full max-w-2xl mx-auto pointer-events-auto">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{ 
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)',
              '--progress-percent': sliderValue / 100
            } as React.CSSProperties}
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
          <div className="text-xs text-center mb-1">{getFormattedInfo(randomPoints, districtsWithSchools, sliderYear, sliderValue).formattedDate}</div>
          <div>{getFormattedInfo(randomPoints, districtsWithSchools, sliderYear, sliderValue).formattedString}</div>
        </div>
        {/* Remove the note from here */}
      </div>

      {/* Play/Pause Button - Bottom Left with same styling - hide on mobile */}
      {!isMobile && (
        <div className="absolute bottom-4 left-4 z-30">
          <div 
            className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg px-4 py-2 text-gray-800 font-medium play-pause-btn cursor-pointer"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Performance message - Bottom Left - only on mobile when limiting points */}
      {isMobile && (
        <div className="absolute bottom-4 left-4 z-30">
          <div className="text-white text-xs opacity-80 leading-relaxed font-bold">
            {sliderValue > 50 ? (
              <>Limited view<br />for performance</>
            ) : (
              <>Optimized map<br />for mobile</>
            )}
          </div>
        </div>
      )}

      {/* Map Container - Full width and height */}
      <div className="absolute inset-0 w-full h-full">
        {processedGeoJson && (
          <Map
            ref={mapRef}
            mapboxAccessToken={mapboxApiKey}
            initialViewState={{
              longitude: initialCenterRef.current.lng,
              latitude: initialCenterRef.current.lat,
              zoom: window.innerWidth < 768 ? FIXED_COORDINATES.mobile.zoom : FIXED_COORDINATES.desktop.zoom,
              bearing: 0,
              pitch: 0
            }}
            preserveDrawingBuffer={true}
            renderWorldCopies={false}
            cooperativeGestures={true}
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
            maxZoom={window.innerWidth < 768 ? FIXED_COORDINATES.mobile.zoom : FIXED_COORDINATES.desktop.zoom}
            minZoom={window.innerWidth < 768 ? FIXED_COORDINATES.mobile.zoom : FIXED_COORDINATES.desktop.zoom}
            dragRotate={false}
            dragPan={false}
            scrollZoom={false}
            boxZoom={false}
            doubleClickZoom={false}
            keyboard={false}
            touchZoomRotate={false}
            touchPitch={false}
            attributionControl={false}
          >
            <Source
              id="districts"
              type="geojson"
              data={processedGeoJson}
              generateId={true}
              // Add mobile optimizations for GeoJSON data
              buffer={isMobile ? 16 : 128}
              tolerance={isMobile ? 1 : 0.375}
            >
              <Layer {...districtLayer} />
              <Layer {...districtOutlineLayer} />
            </Source>
            {/* Only render markers after map is fully initialized */}
            {mapInitialized && (
              <SchoolMarkers 
                points={randomPoints}
                onPointClick={handleMarkerClick}
              />
            )}
            {popupInfo && (
              <Popup
                longitude={popupInfo.point.lng}
                latitude={popupInfo.point.lat}
                anchor="bottom"
                onClose={() => setPopupInfo(null)}
                closeButton={false}
                closeOnClick={true}
                offset={10}
              >
                <CustomPopupContent 
                  districtName={popupInfo.point.districtDisplayName || popupInfo.point.districtName}
                  schoolNumber={randomPoints.findIndex(p => 
                    p.lat === popupInfo.point.lat && 
                    p.lng === popupInfo.point.lng) + 1}
                />
              </Popup>
            )}
          </Map>
        )}
      </div>
    </div>
  );
};

export default TexasSchoolDistrictsMap; 