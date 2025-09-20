import React, { useState } from 'react';

interface AccessibilityMenuProps {
  theme: string;
  setTheme: (theme: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ theme, setTheme, fontSize, setFontSize }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const increaseFontSize = () => {
    setFontSize(Math.min(fontSize + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(Math.max(fontSize - 2, 12));
  };
  
  return (
    <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50">
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl mb-2 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <div className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-200">Accessibility</div>
          <div className="flex items-center justify-between space-x-4 mb-3">
            <span className="text-gray-600 dark:text-gray-300">Theme</span>
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-transform active:scale-90">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-gray-600 dark:text-gray-300">Font Size</span>
            <div className="flex items-center space-x-1">
                <button onClick={decreaseFontSize} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-lg transition-transform active:scale-90">-</button>
                <button onClick={increaseFontSize} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-lg transition-transform active:scale-90">+</button>
            </div>
          </div>
        </div>
      )}
       <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-lg transform active:scale-90"
        aria-label="Toggle accessibility menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </button>
    </div>
  );
};

export default AccessibilityMenu;