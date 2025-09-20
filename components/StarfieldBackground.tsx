import React from 'react';

const StarfieldBackground: React.FC = () => {
  return (
    <div className="starfield-container" aria-hidden="true">
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  );
};

export default StarfieldBackground;