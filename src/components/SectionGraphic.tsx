import React from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';

type SectionGraphicVariant = 
  | 'circles' 
  | 'education' 
  | 'opportunity' 
  | 'legacy' 
  | 'income' 
  | 'academics' 
  | 'athletes' 
  | 'partner';

interface SectionGraphicProps {
  variant?: SectionGraphicVariant;
}

const SectionGraphic = ({ variant = 'circles' }: SectionGraphicProps) => {
  const renderPlaceholder = () => {
    return (
      <div className="relative w-full h-full bg-secondary/10 rounded-3xl flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full h-full max-w-[300px] max-h-[300px] flex items-center justify-center opacity-30">
            <Image className="w-full h-full text-muted-foreground" />
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/30 opacity-50"></div>
      </div>
    );
  };

  const renderIntroAnimation = () => {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full"
        >
          <div className="w-full h-full bg-secondary/50 rounded-3xl flex items-center justify-center">
            <svg viewBox="0 0 200 160" className="w-full h-full p-8">
              {/* Dome */}
              <motion.path
                d="M85 45 C85 20, 115 20, 115 45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              {/* Dome base */}
              <motion.rect
                x="80"
                y="40"
                width="40"
                height="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />

              {/* Building main structure */}
              <motion.path
                d="M70 48 L70 120 L130 120 L130 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted-foreground"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />

              {/* Columns */}
              {[80, 90, 100, 110, 120].map((x, i) => (
                <motion.line
                  key={x}
                  x1={x}
                  y1="60"
                  x2={x}
                  y2="110"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 2 + (i * 0.2) }}
                />
              ))}

              {/* Steps */}
              {[0, 1, 2].map((i) => (
                <motion.line
                  key={i}
                  x1={70 + (i * 5)}
                  y1={120 + (i * 5)}
                  x2={130 - (i * 5)}
                  y2={120 + (i * 5)}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 3 + (i * 0.2) }}
                />
              ))}

              {/* Person */}
              <motion.circle
                cx="85"
                cy="115"
                r="3"
                fill="currentColor"
                className="text-muted-foreground"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 30, opacity: 1 }}
                transition={{ duration: 1.5, delay: 4 }}
              />

              {/* Bill/Document */}
              <motion.rect
                x="90"
                y="110"
                width="4"
                height="6"
                fill="currentColor"
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, delay: 5.5, times: [0, 0.2, 0.8, 1] }}
              />
            </svg>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {variant === 'circles' ? renderIntroAnimation() : renderPlaceholder()}
    </div>
  );
};

export default SectionGraphic;
