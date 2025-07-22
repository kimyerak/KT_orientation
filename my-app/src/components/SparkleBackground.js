'use client'

import { useEffect, useState } from 'react';

export default function SparkleBackground() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkles = () => {
      const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '⚡', '🔸', '💎', '🌸'];
      const newSparkles = [];
      for (let i = 0; i < 25; i++) {
        newSparkles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 5,
          size: Math.random() * 8 + 6,
          emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)],
          duration: Math.random() * 2 + 2, // 2-4초
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.animationDelay}s`,
            animationDuration: `${sparkle.duration}s`,
            fontSize: `${sparkle.size}px`,
            zIndex: 1000,
            filter: 'drop-shadow(0 0 6px rgba(255, 255, 0, 0.8))',
          }}
        >
          {sparkle.emoji}
        </div>
      ))}
    </div>
  );
} 