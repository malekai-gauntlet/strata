import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface FloatingVideoPlayerProps {
  src: string;
  isVisible: boolean;
  onClose: () => void;
}

const FloatingVideoPlayer = ({ src, isVisible, onClose }: FloatingVideoPlayerProps) => {
  const isMobile = useIsMobile();
  
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
          initial={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, x: 300 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
          exit={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, x: 300 }}
          className={`fixed z-50 bg-secondary/[0.98] ${
            isMobile 
              ? 'inset-0 flex items-center justify-center p-4' 
              : 'top-0 right-0 h-screen w-1/2 hidden lg:flex items-center justify-center'
          }`}
          transition={{ type: "spring", damping: 20 }}
          onClick={handleBackgroundClick}
        >
          <div className={`relative w-full ${isMobile ? 'max-w-xl' : 'max-w-2xl'} mx-auto px-4 lg:px-8`} onClick={e => e.stopPropagation()}>
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10 bg-secondary/50 hover:bg-secondary/70 flex items-center justify-center"
                onClick={onClose}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            )}
            <div className={`${isMobile ? 'min-h-[200px]' : 'min-h-[450px]'} flex items-center`} onClick={e => e.stopPropagation()}>
              <video
                className="w-full aspect-video rounded-lg shadow-xl"
                controls
                playsInline
                preload="metadata"
                autoPlay
                onClick={e => e.stopPropagation()}
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