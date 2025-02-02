import React from 'react';

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <div
      className={`absolute ${color} ${size} rounded-full blur-2xl animate-float`}
      style={{
        top,
        left,
        animationDelay: `${delay}s`,
        opacity: 0.8,
        pointerEvents: 'none'
      }}
    />
  );
};

export default FloatingShape;
