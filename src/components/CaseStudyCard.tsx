
import React from 'react';
import { motion } from 'framer-motion';

interface CaseStudyCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

const CaseStudyCard = ({ title, description, image, index }: CaseStudyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
