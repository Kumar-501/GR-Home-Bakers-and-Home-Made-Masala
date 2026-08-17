import React, { useState, useRef } from 'react';

export const ImageTrail = ({ images = [], children, className = '' }) => {
  const [trailItems, setTrailItems] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const countRef = useRef(0);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 992 || images.length === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

    if (dist > 45) {
      lastPos.current = { x, y };
      const imgUrl = images[countRef.current % images.length];
      countRef.current += 1;

      const newItem = {
        id: Date.now() + Math.random(),
        x,
        y,
        img: imgUrl,
        rotation: (Math.random() - 0.5) * 20,
      };

      setTrailItems((prev) => [...prev.slice(-4), newItem]);

      setTimeout(() => {
        setTrailItems((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 700);
    }
  };

  return (
    <div className={`image-trail-wrapper ${className}`} onMouseMove={handleMouseMove}>
      {children}
      {trailItems.map((item) => (
        <img
          key={item.id}
          src={item.img}
          alt=""
          className="trail-image-floating"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(1)`,
          }}
        />
      ))}
    </div>
  );
};