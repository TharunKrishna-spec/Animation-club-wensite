import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-amber-400" role="status" aria-label="Loading..."></div>
    </div>
  );
};

export default Spinner;