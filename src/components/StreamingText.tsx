
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';

interface StreamingTextProps {
  children: React.ReactNode;
  className?: string;
  tag?: 'h1' | 'h2' | 'p';
  delay?: number;
  index?: number;
}

const StreamingText = ({ 
  children, 
  className = '', 
  tag = 'p', 
  delay = 0, 
  index = 0 
}: StreamingTextProps) => {
  const Component = tag;
  const isMobile = useIsMobile();
  
  const baseDelay = delay + (index * 0.25); // Reduced from 0.5 to 0.25
  
  if (typeof children === 'string') {
    const characters = children.split('');
    const totalDuration = characters.length * 0.005; // Reduced from 0.01 to 0.005

    return (
      <Component className={cn(
        className,
        isMobile && tag === 'h1' ? 'text-2xl md:text-4xl lg:text-5xl xl:text-6xl' : '',
        isMobile && tag === 'h2' ? 'text-xl md:text-3xl lg:text-4xl xl:text-5xl' : '',
        isMobile && tag === 'p' ? 'text-base md:text-xl' : '',
      )}>
        {characters.map((char, charIndex) => {
          if (char === "\n") {
            return <br key={charIndex} />;
          }
          return (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.1, // Reduced from 0.2 to 0.1
                delay: baseDelay + charIndex * 0.005, // Reduced from 0.01 to 0.005
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </Component>
    );
  }
  
  return (
    <Component className={className}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.1, // Reduced from 0.2 to 0.1
          delay: baseDelay,
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
};

export default StreamingText;
