'use client'

import { useState, useEffect } from 'react';

export default function MagicSparkles({ trigger = false, children }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newSparkles = [];
      for (let i = 0; i < 12; i++) {
        newSparkles.push({
          id: Math.random(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 0.5,
          size: Math.random() * 8 + 4,
          emoji: ['✨', '⭐', '🌟', '💫', '⚡'][Math.floor(Math.random() * 5)]
        });
      }
      setSparkles(newSparkles);
      
      // 2초 후에 sparkles 제거
      setTimeout(() => {
        setSparkles([]);
      }, 2000);
    }
  }, [trigger]);

  return (
    <div className="relative">
      {children}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-magic-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.animationDelay}s`,
            fontSize: `${sparkle.size}px`,
          }}
        >
          {sparkle.emoji}
        </div>
      ))}
    </div>
  );
} 