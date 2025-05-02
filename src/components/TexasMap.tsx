import React from 'react';
import { motion } from 'framer-motion';

const TexasMap = () => {
  // This is a placeholder component that will be replaced with an actual interactive map
  // You would typically use a mapping library like react-simple-maps or Mapbox
  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#111111] rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Placeholder map outline */}
        <div className="relative w-96 h-96">
          {/* Animated dots representing districts */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping" />
            </motion.div>
          ))}
          
          {/* Map outline placeholder */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-lg" />
        </div>
      </div>
      
      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center text-white/50">
        Interactive Texas District Map Coming Soon
      </div>
    </div>
  );
};

export default TexasMap; 