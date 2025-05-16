import React from 'react';
import { motion } from 'framer-motion';

interface VimeoPlayerProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  showTitle?: boolean;
}

const VimeoPlayer = ({ videoId, className = '', autoplay = false, showTitle = true }: VimeoPlayerProps) => {
  const params = new URLSearchParams();
  if (autoplay) params.append('autoplay', '1');
  if (!showTitle) {
    params.append('title', '0');
    params.append('badge', '0');
    params.append('byline', '0');
    params.append('portrait', '0');
  }
  params.append('autopause', '0');
  
  const queryString = params.toString();
  const videoUrl = `https://player.vimeo.com/video/${videoId}${queryString ? `?${queryString}` : ''}`;

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
        src={videoUrl}
        title="Vimeo video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
};

export default VimeoPlayer; 