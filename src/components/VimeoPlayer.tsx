import React from 'react';
import { motion } from 'framer-motion';

interface VimeoPlayerProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
}

const VimeoPlayer = ({ videoId, className = '', autoplay = false }: VimeoPlayerProps) => {
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
        src={`https://player.vimeo.com/video/${videoId}${autoplay ? '?autoplay=1' : ''}`}
        title="Vimeo video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
};

export default VimeoPlayer; 