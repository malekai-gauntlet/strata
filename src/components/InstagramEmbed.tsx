import React from 'react';
import { motion } from 'framer-motion';

interface InstagramEmbedProps {
  postId: string;
  className?: string;
}

const InstagramEmbed = ({ postId, className = '' }: InstagramEmbedProps) => {
  return (
    <motion.div
      className={`instagram-embed aspect-square rounded-lg shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay: 0.5 }}
    >
      <iframe
        src={`https://www.instagram.com/p/${postId}/embed`}
        className="w-full h-full"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
      />
    </motion.div>
  );
};

export default InstagramEmbed; 