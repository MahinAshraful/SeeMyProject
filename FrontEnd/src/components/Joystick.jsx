import React from 'react';

const Joystick = ({ 
  position, 
  color, 
  label, 
  onClick, 
  isLeft = false 
}) => {
  const baseColor = color === 'blue' ? {
    bg: "bg-blue-900",
    hover: "group-hover:bg-blue-700",
    main: "bg-blue-800"
  } : {
    bg: "bg-red-900",
    hover: "group-hover:bg-red-700",
    main: "bg-red-800"
  };

  return (
    <button
      className="flex flex-col items-center group"
      onClick={onClick}
    >
      <div className="relative w-32 h-32 mb-4 transition-transform bg-gray-800 pixel-corners arcade-base">
        <div 
          className={`absolute w-24 h-24 transition-all transform -translate-x-1/2 -translate-y-1/2 ${baseColor.bg} pixel-corners top-1/2 left-1/2 joystick`}
          style={{ 
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
          }}
        >
          <div className={`absolute inset-0 w-full h-full transition-colors ${baseColor.main} pixel-corners ${baseColor.hover}`} />
        </div>
      </div>
      <span className="text-xl font-bold text-white pixel-text">{label}</span>
    </button>
  );
};

export default Joystick;