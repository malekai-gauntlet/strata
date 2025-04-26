import React from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer = ({ src, className = '' }: VideoPlayerProps) => {
  return (
    <motion.video
      className={`rounded-lg shadow-lg ${className}`}
      controls
      playsInline
      preload="metadata"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay: 0.5 }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </motion.video>
  );
};

export default VideoPlayer; 