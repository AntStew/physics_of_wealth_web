"use client";

import { useState, useEffect } from "react";

export function SpaceBackground() {
  // Generate stars with more variety
  const generateStars = (count: number, sizeRange: [number, number], opacityRange: [number, number]) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = 2 + Math.random() * 4;
      const opacity = Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0];
      
      // Add some color variation for stars (white, blue, yellow)
      const colors = ['#ffffff', '#b8d4ff', '#fff4b8', '#ffd4b8'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        key: i,
        size,
        left,
        top,
        delay,
        duration,
        opacity,
        color,
      };
    });
  };

  const generateClusters = () => {
    return Array.from({ length: 8 }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 200 + Math.random() * 300;
      return {
        key: i,
        left,
        top,
        size,
      };
    });
  };

  const [brightStars, setBrightStars] = useState<ReturnType<typeof generateStars>>([]);
  const [mediumStars, setMediumStars] = useState<ReturnType<typeof generateStars>>([]);
  const [smallStars, setSmallStars] = useState<ReturnType<typeof generateStars>>([]);
  const [distantStars, setDistantStars] = useState<ReturnType<typeof generateStars>>([]);
  const [clusters, setClusters] = useState<ReturnType<typeof generateClusters>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Generate random values only on client side after mount
    setIsMounted(true);
    setBrightStars(generateStars(30, [1.5, 3], [0.7, 1]));
    setMediumStars(generateStars(80, [0.8, 1.5], [0.4, 0.7]));
    setSmallStars(generateStars(250, [0.3, 0.8], [0.2, 0.5]));
    setDistantStars(generateStars(150, [0.2, 0.5], [0.1, 0.3]));
    setClusters(generateClusters());
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space base - almost pure black with subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
      
      {/* Subtle cosmic dust layers */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-[800px] h-[600px] bg-indigo-950 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[700px] h-[500px] bg-purple-950 rounded-full blur-[100px]" />
        <div className="absolute top-2/3 left-1/2 w-[600px] h-[400px] bg-blue-950 rounded-full blur-[80px]" />
      </div>

      {/* Distant star clusters / galaxies */}
      {isMounted && (
        <div className="absolute inset-0 opacity-15">
          {clusters.map((cluster) => (
            <div
              key={`cluster-${cluster.key}`}
              className="absolute rounded-full blur-2xl"
              style={{
                left: `${cluster.left}%`,
                top: `${cluster.top}%`,
                width: `${cluster.size}px`,
                height: `${cluster.size}px`,
                background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Star layers - from distant to bright */}
      {isMounted && (
        <div className="absolute inset-0">
          {/* Distant faint stars */}
          {distantStars.map((star) => (
            <div
              key={`distant-${star.key}`}
              className="absolute rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.left}%`,
                top: `${star.top}%`,
                backgroundColor: star.color,
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                boxShadow: `0 0 ${star.size}px ${star.color}`,
              }}
            />
          ))}

          {/* Small stars */}
          {smallStars.map((star) => (
            <div
              key={`small-${star.key}`}
              className="absolute rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.left}%`,
                top: `${star.top}%`,
                backgroundColor: star.color,
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                boxShadow: `0 0 ${star.size * 1.5}px ${star.color}`,
              }}
            />
          ))}

          {/* Medium stars */}
          {mediumStars.map((star) => (
            <div
              key={`medium-${star.key}`}
              className="absolute rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.left}%`,
                top: `${star.top}%`,
                backgroundColor: star.color,
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                boxShadow: `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 4}px ${star.color}40`,
              }}
            />
          ))}

          {/* Bright stars with glow */}
          {brightStars.map((star) => (
            <div
              key={`bright-${star.key}`}
              className="absolute rounded-full"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: `${star.left}%`,
                top: `${star.top}%`,
                backgroundColor: star.color,
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                boxShadow: `
                  0 0 ${star.size * 2}px ${star.color},
                  0 0 ${star.size * 4}px ${star.color}80,
                  0 0 ${star.size * 6}px ${star.color}40
                `,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle nebula wisps */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Subtle animated cosmic rays */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 3 }).map((_, i) => {
          const left = 20 + i * 30;
          const rotation = -45 + i * 15;
          return (
            <div
              key={`ray-${i}`}
              className="absolute"
              style={{
                left: `${left}%`,
                top: '0%',
                width: '2px',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)',
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'top center',
                animation: `rayMove ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
