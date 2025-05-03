import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name properly in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting GeoJSON optimization process...');

// Input file
const inputFile = path.join(__dirname, '../public/data/Current_Districts_2025.geojson');

// Output files for different device tiers
const outputFiles = {
  min: path.join(__dirname, '../public/data/mobile/districts_minimal.geojson'),
  low: path.join(__dirname, '../public/data/mobile/districts_low.geojson'),
  medium: path.join(__dirname, '../public/data/mobile/districts_medium.geojson'),
  high: path.join(__dirname, '../public/data/mobile/districts_high.geojson')
};

// Simplification factors for different tiers
const simplificationFactors = {
  min: 0.05,   // Ultra aggressive simplification for minimal version
  low: 0.03,   // Very aggressive simplification for low-end devices
  medium: 0.01, // Aggressive simplification for mid-range devices
  high: 0.005   // Moderate simplification for high-end devices
};

// Load the GeoJSON file
console.log(`Reading GeoJSON file: ${inputFile}`);
let geoJsonData;
try {
  const fileData = fs.readFileSync(inputFile, 'utf8');
  console.log(`Parsing GeoJSON file (${(fileData.length / 1024 / 1024).toFixed(2)} MB)...`);
  geoJsonData = JSON.parse(fileData);
  console.log(`Successfully parsed GeoJSON with ${geoJsonData.features.length} features`);
} catch (err) {
  console.error('Error reading or parsing GeoJSON file:', err);
  process.exit(1);
}

// Function to simplify polygon coordinates
function simplifyPolygon(coordinates, skipFactor) {
  return coordinates.map(ring => {
    // Always keep first and last point (identical in a valid polygon)
    if (ring.length <= 10) return ring;
    
    const first = ring[0];
    const last = ring[ring.length - 1];
    
    // Keep every Nth point based on the skip factor
    const simplified = [first];
    for (let i = 1; i < ring.length - 1; i += skipFactor) {
      simplified.push(ring[i]);
    }
    simplified.push(last);
    
    return simplified;
  });
}

// Simplify MultiPolygon coordinates
function simplifyMultiPolygon(coordinates, skipFactor) {
  return coordinates.map(polygon => simplifyPolygon(polygon, skipFactor));
}

// Function to count total points in a feature collection
function countPoints(data) {
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
}

// Process each output tier
Object.keys(outputFiles).forEach(tier => {
  console.log(`\nProcessing ${tier} tier version...`);
  const skipFactor = Math.max(1, Math.ceil(1 / simplificationFactors[tier]));
  console.log(`Using skip factor: ${skipFactor} (keeping 1 in every ${skipFactor} points)`);
  
  // Create a deep copy of the original data
  const optimizedData = {
    type: 'FeatureCollection',
    features: geoJsonData.features.map(feature => {
      // For minimal tier, only keep essential properties
      const properties = tier === 'min' ? {
        DISTRICT_I: feature.properties?.DISTRICT_I || '',
        DISTRICT_N: feature.properties?.DISTRICT_N || '',
        Name20: feature.properties?.Name20 || ''
      } : { ...feature.properties };
      
      // Create simplified copy of the feature
      const simplifiedFeature = {
        type: 'Feature',
        properties,
        geometry: null
      };
      
      // Skip features without geometry
      if (!feature.geometry) return simplifiedFeature;
      
      // Simplify based on geometry type
      if (feature.geometry.type === 'Polygon') {
        simplifiedFeature.geometry = {
          type: 'Polygon',
          coordinates: simplifyPolygon(feature.geometry.coordinates, skipFactor)
        };
      } 
      else if (feature.geometry.type === 'MultiPolygon') {
        simplifiedFeature.geometry = {
          type: 'MultiPolygon',
          coordinates: simplifyMultiPolygon(feature.geometry.coordinates, skipFactor)
        };
      }
      else {
        // Copy other geometry types unchanged
        simplifiedFeature.geometry = { ...feature.geometry };
      }
      
      return simplifiedFeature;
    })
  };
  
  // Count points before and after optimization
  const originalPointCount = countPoints(geoJsonData);
  const optimizedPointCount = countPoints(optimizedData);
  const reductionPercent = ((1 - (optimizedPointCount / originalPointCount)) * 100).toFixed(2);
  console.log(`Point count: ${originalPointCount.toLocaleString()} -> ${optimizedPointCount.toLocaleString()} (${reductionPercent}% reduction)`);
  
  // Write optimized file
  console.log(`Writing optimized file: ${outputFiles[tier]}`);
  try {
    const outputJson = JSON.stringify(optimizedData);
    fs.writeFileSync(outputFiles[tier], outputJson);
    const fileSizeMB = (outputJson.length / 1024 / 1024).toFixed(2);
    console.log(`Successfully wrote ${fileSizeMB} MB to ${outputFiles[tier]}`);
  } catch (err) {
    console.error(`Error writing optimized file for ${tier} tier:`, err);
  }
});

console.log('\nGeoJSON optimization completed!'); 