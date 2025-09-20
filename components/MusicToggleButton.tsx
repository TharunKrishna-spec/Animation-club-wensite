import React from 'react';

interface MusicToggleButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicToggleButton: React.FC<MusicToggleButtonProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg transform active:scale-90
        ${isPlaying ? 'bg-amber-400 shadow-amber-400/50 animate-pulse' : 'bg-gray-700'}`}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        </svg>
      )}
    </button>
  );
};

export default MusicToggleButton;