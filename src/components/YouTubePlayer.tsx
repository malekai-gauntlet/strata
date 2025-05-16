import React from 'react';
import { motion } from 'framer-motion';

interface YouTubePlayerProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
}

const YouTubePlayer = ({ videoId, className = '', autoplay = false }: YouTubePlayerProps) => {
  return (
    <motion.div
      className={`aspect-video rounded-lg shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay: 0.5 }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1&mute=1' : ''}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
};

export default YouTubePlayer; 