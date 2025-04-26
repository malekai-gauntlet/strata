import React from 'react';
import { motion } from 'framer-motion';

interface MapEmbedProps {
  className?: string;
}

const MapEmbed = ({ className = '' }: MapEmbedProps) => {
  return (
    <motion.div
      className={`w-full h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay: 0.5 }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13379.580167767833!2d-96.87637673022458!3d33.02575527683893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c24f7c2b7222f%3A0x604072bd3e0eed90!2s2205%20E%20Hebron%20Pkwy%2C%20Carrollton%2C%20TX%2075010!5e0!3m2!1sen!2sus!4v1711336722044!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  );
};

export default MapEmbed; 