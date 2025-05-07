import React from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
}

const VideoPlayer = ({ 
  src, 
  className = '',
  autoPlay = false,
  controls = true,
  muted = false,
  loop = false
}: VideoPlayerProps) => {
  return (
    <motion.video
      className={`rounded-lg shadow-lg ${className}`}
      controls={controls}
      playsInline
      preload="metadata"
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
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