// src/components/PacMan/PacMan.jsx
import React from 'react';
import pacmanImage from 'FrontEnd/src/assets/pacman.gif'; // Update this path to where you store your image

const PacMan = ({ currentIndex, totalDots }) => {
  const progress = (currentIndex / (totalDots - 1)) * 100;
  
  return (
    <div 
      className="absolute z-20 transition-all duration-500 left-1"
      style={{ top: `${progress}%` }}
    >
      <img 
        src={pacmanImage} 
        alt="Pac-Man" 
        className="w-8 h-8 transform rotate-90"
      />
    </div>
  );
};

export default PacMan;