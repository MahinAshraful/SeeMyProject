import React from 'react';
import pacmanImage from '../assets/pacman.gif';

const WorkflowDot = ({ card, index, onClick, isCompleted, isActive }) => {
  const typeColors = {
    learn: { color: "bg-cyan-400", text: "text-cyan-400" },
    build: { color: "bg-pink-400", text: "text-pink-400" },
    deploy: { color: "bg-red-400", text: "text-red-400" }
  };

  const style = typeColors[card.type] || typeColors.build;

  return (
    <div className="relative flex items-center gap-4">
      {/* Vertical connection line */}
      {index > 0 && (
        <div className="absolute w-1 h-12 left-6 -top-12 bg-white/30" />
      )}
      
      <button
        onClick={() => onClick(card)}
        className="relative z-10 group"
      >
        {/* Dot */}
        <div className="relative">
          <div className={`w-12 h-12 rounded-full ${isCompleted ? 'bg-transparent' : 'bg-white animate-pulse'}`} />
          <div className={`absolute inset-0 w-12 h-12 transition-transform rounded-full group-hover:scale-125 ${style.color}`} />
        </div>
        
        {/* Hover Label */}
        <div className="absolute transition-opacity opacity-0 left-14 top-2 group-hover:opacity-100">
          <span className="text-lg text-white pixel-text whitespace-nowrap">
            Task {index + 1}
          </span>
        </div>
      </button>
    </div>
  );
};

const PacMan = ({ currentIndex, totalDots }) => {
  const progress = (currentIndex / (totalDots - 1)) * 100;
  
  return (
    <div 
      className="absolute z-20 transition-all duration-500"
      style={{ 
        top: `calc(${progress}% - 4em)`,  // Center vertically with dots
        left: '0rem'  // Adjust horizontal position
      }}
    >
      <img 
        src={pacmanImage} 
        alt="Pac-Man" 
        className="w-48 transform rotate-90 h-36"
      />
    </div>
  );
};

export { WorkflowDot, PacMan };