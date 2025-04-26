
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
    <div className={`fixed ${isMobile ? 'bottom-8 left-0 right-0 -translate-y-0 flex justify-center' : 'right-8 top-1/2 -translate-y-1/2 flex flex-col'} gap-4 z-50`}>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => onDotClick(section)}
          className="text-white/50 hover:text-white transition-colors"
          aria-label={`Navigate to ${section} section`}
        >
          {section === currentSection ? (
            <CircleDot className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          ) : (
            <Circle className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          )}
        </button>
      ))}
    </div>
  );
};

export default SectionDots;
