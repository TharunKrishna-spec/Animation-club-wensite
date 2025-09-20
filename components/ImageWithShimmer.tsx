import React, { useState } from 'react';

interface ImageWithShimmerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

const ImageWithShimmer: React.FC<ImageWithShimmerProps> = ({ src, alt, className, wrapperClassName, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName || ''}`}>
      {isLoading && (
        <div className="shimmer-placeholder absolute inset-0"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className || ''} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)} // Also handle image load errors
        {...props}
      />
    </div>
  );
};

export default ImageWithShimmer;
