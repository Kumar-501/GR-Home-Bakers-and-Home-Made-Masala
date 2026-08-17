import React, { useRef, useState } from 'react';

export const MagneticButton = ({ children, onClick, className = '', style = {}, disabled = false }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      className={`magnetic-btn ${className}`}
      style={{
        ...style,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s ease-out',
      }}
    >
      {children}
    </button>
  );
};