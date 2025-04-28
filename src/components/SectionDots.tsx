import React from 'react';
import { Circle, CircleDot } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SectionDotsProps {
  sections: string[];
  currentSection: string;
  onDotClick: (section: string) => void;
}

const SectionDots = ({ sections, currentSection, onDotClick }: SectionDotsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`fixed ${
      isMobile 
        ? 'right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3'
        : 'right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4'
    } z-50`}>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onDotClick(section)}
          className={`${
            isMobile 
              ? 'text-white/30 hover:text-white/50' 
              : 'text-white/50 hover:text-white'
          } transition-colors`}
          aria-label={`Navigate to ${section} section`}
        >
          {section === currentSection ? (
            <CircleDot className={`${isMobile ? 'w-2 h-2' : 'w-4 h-4'}`} />
          ) : (
            <Circle className={`${isMobile ? 'w-2 h-2' : 'w-4 h-4'}`} />
          )}
        </button>
      ))}
    </div>
  );
};

export default SectionDots;
