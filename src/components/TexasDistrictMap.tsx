import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { motion } from 'framer-motion';
import { districts } from '@/data/districts';

// You'll need to download this from: https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/TX-48-texas-counties.json
const TEXAS_DISTRICTS_MAP = '/maps/texas-districts.json';

interface District {
  id: string;
  name: string;
  coordinates: [number, number];
  established?: boolean;
}

interface TexasDistrictMapProps {
  className?: string;
}

const TexasDistrictMap: React.FC<TexasDistrictMapProps> = ({ className = '' }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return (
    <div className={`relative ${className}`}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 3000,
          center: [-99.9018, 31.9686] // Center of Texas
        }}
      >
        <ZoomableGroup>
          <Geographies geography={TEXAS_DISTRICTS_MAP}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={selectedDistrict === geo.properties.NAME ? "#334155" : "#1e293b"}
                  stroke="#475569"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: "#334155", outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                  onMouseEnter={() => {
                    setTooltipContent(geo.properties.NAME);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  onClick={() => {
                    setSelectedDistrict(geo.properties.NAME);
                  }}
                />
              ))
            }
          </Geographies>

          {districts.map((district) => (
            <Marker key={district.id} coordinates={district.coordinates}>
              <motion.circle
                r={4}
                fill={district.established ? "#ef4444" : "#64748b"}
                stroke="#fff"
                strokeWidth={1}
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                onMouseEnter={(e) => {
                  setTooltipContent(`
                    ${district.name}
                    Region: ${district.region}
                    Students: ${district.studentCount.toLocaleString()}
                    ${district.established ? '✓ Established' : 'Coming Soon'}
                  `);
                  setTooltipPosition({
                    x: e.clientX,
                    y: e.clientY
                  });
                }}
                onMouseLeave={() => {
                  setTooltipContent('');
                }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {tooltipContent && (
        <div
          className="absolute z-10 px-3 py-2 text-sm text-white bg-black/90 rounded pointer-events-none transform -translate-x-1/2 -translate-y-full whitespace-pre-line"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default TexasDistrictMap; 