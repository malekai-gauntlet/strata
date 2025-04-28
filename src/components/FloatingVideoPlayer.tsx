import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingVideoPlayerProps {
  src: string;
  isVisible: boolean;
  onClose: () => void;
}

const FloatingVideoPlayer = ({ src, isVisible, onClose }: FloatingVideoPlayerProps) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only close if clicking the background (not the video or controls)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-0 right-0 z-50 h-screen w-1/2 hidden lg:flex items-center justify-center bg-secondary/[0.98]"
          transition={{ type: "spring", damping: 20 }}
          onClick={handleBackgroundClick}
        >
          <div className="relative w-full max-w-2xl mx-auto px-8" onClick={e => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-secondary/50 hover:bg-secondary/70"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="min-h-[450px] flex items-center">
              <video
                className="w-full aspect-video rounded-lg shadow-xl"
                controls
                playsInline
                preload="metadata"
                autoPlay
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingVideoPlayer; 