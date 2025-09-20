import React from 'react';

const AnimatedParticles: React.FC<{ count?: number }> = ({ count = 50 }) => {
  const particles = Array.from({ length: count }).map((_, i) => {
    const style = {
      '--x': `${Math.random() * 100}vw`,
      '--y': `${Math.random() * 100}vh`,
      '--size': `${1 + Math.random() * 2}px`,
      '--duration': `${8 + Math.random() * 10}s`,
      '--delay': `-${Math.random() * 20}s`,
    } as React.CSSProperties;
    return <div key={i} className="particle" style={style}></div>;
  });

  return <div className="particle-container" aria-hidden="true">{particles}</div>;
};

export default AnimatedParticles;