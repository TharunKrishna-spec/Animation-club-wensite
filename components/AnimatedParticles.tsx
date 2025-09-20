import React from 'react';

const AnimatedParticles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const particles = Array.from({ length: count }).map((_, i) => {
    const style = {
      '--x-pos': `${Math.random() * 100}vw`,
      '--size': `${1 + Math.random() * 2}px`,
      '--duration': `${15 + Math.random() * 15}s`,
      '--delay': `-${Math.random() * 30}s`,
    } as React.CSSProperties;
    return <div key={i} className="particle" style={style}></div>;
  });

  return <div className="particle-container" aria-hidden="true">{particles}</div>;
};

export default AnimatedParticles;