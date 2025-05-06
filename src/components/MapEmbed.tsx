import React from 'react';
import { motion } from 'framer-motion';

interface MapEmbedProps {
  className?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

const MapEmbed = ({ className = '', location }: MapEmbedProps) => {
  // Create a static maps URL that doesn't require an API key
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.0855567554584!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c24f7c2b7222f%3A0x604072bd3e0eed90!2s${encodeURIComponent(location.address)}!5e0!3m2!1sen!2sus!4v1711336722044!5m2!1sen!2sus`;

  return (
    <motion.div
      className={`w-full h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay: 0.5 }}
    >
      <iframe
        src={mapUrl}
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