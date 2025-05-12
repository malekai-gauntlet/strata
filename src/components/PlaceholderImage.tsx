import React from 'react';

interface PlaceholderImageProps {
  text: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  overlay?: boolean;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  text, 
  className = "", 
  aspectRatio = "landscape",
  overlay = false
}) => {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/9]"
  };

  return (
    <div className={`relative ${className} ${aspectRatioClasses[aspectRatio]} bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl overflow-hidden`}>
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <p className="text-white text-center font-medium">
          {text}
        </p>
      </div>
    </div>
  );
};

export default PlaceholderImage; 