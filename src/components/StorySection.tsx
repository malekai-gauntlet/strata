import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import SectionGraphic from './SectionGraphic';

interface StorySectionProps {
  id: string;
  children: React.ReactNode;
  withGraphic?: boolean;
  customGraphic?: React.ReactNode;
  className?: string;
}

const StorySection = ({ id, children, withGraphic = false, customGraphic, className }: StorySectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "h-screen snap-start flex items-center justify-center px-4 py-16 md:py-0",
        withGraphic ? 'bg-secondary/50' : '',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="flex items-center">
          {children}
        </div>
        {withGraphic && (
          <div className="hidden lg:flex items-center justify-center">
            {customGraphic || <SectionGraphic variant={id as any} />}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default StorySection;
