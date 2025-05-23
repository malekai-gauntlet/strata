import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-1/2 w-px h-full bg-white/20" />
      
      {/* Timeline items */}
      <div className="space-y-32">
        {items.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Year marker */}
            <div className="absolute left-1/2 -translate-x-1/2 -mt-2">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
            
            {/* Content */}
            <div className="grid grid-cols-[1fr,1fr] items-center">
              {/* Year */}
              <div className="text-right pr-8">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-2"
                >
                  {item.year}
                </motion.h3>
              </div>
              
              {/* Content */}
              <div className="pl-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-2xl font-bold mb-4 text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-lg">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 