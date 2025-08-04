import React, { useEffect, useState } from 'react';

const WaterGlass = ({ level, maxLevel = 100, size = 200 }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, 500);
    return () => clearTimeout(timer);
  }, [level]);

  useEffect(() => {
    // Generate floating particles for visual effect
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 50 + 25, // 25-75% of width
      y: Math.random() * 20 + 40, // 40-60% of height
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const percentage = Math.min((animatedLevel / maxLevel) * 100, 100);
  const waterHeight = (percentage / 100) * (size * 0.8); // 80% of glass height for water area
  
  // Enhanced color based on water level with gradients
  const getWaterColor = (percent) => {
    if (percent < 25) return { primary: '#ef4444', secondary: '#dc2626' }; // Red
    if (percent < 50) return { primary: '#f59e0b', secondary: '#d97706' }; // Orange
    if (percent < 75) return { primary: '#3b82f6', secondary: '#1d4ed8' }; // Blue
    return { primary: '#10b981', secondary: '#047857' }; // Green
  };

  const waterColors = getWaterColor(percentage);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glass Container */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 drop-shadow-2xl"
        >
          <defs>
            {/* Enhanced gradients */}
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={waterColors.primary} stopOpacity="0.9" />
              <stop offset="50%" stopColor={waterColors.secondary} stopOpacity="0.95" />
              <stop offset="100%" stopColor={waterColors.secondary} stopOpacity="1" />
            </linearGradient>
            
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.3" />
            </linearGradient>

            <radialGradient id="bubbleGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </radialGradient>
            
            <clipPath id="glassClip">
              <path
                d={`M ${size * 0.205} ${size * 0.17} 
                    L ${size * 0.795} ${size * 0.17}
                    L ${size * 0.745} ${size * 0.83}
                    L ${size * 0.255} ${size * 0.83} Z`}
              />
            </clipPath>
          </defs>
          
          {/* Glass background */}
          <path
            d={`M ${size * 0.2} ${size * 0.15} 
                L ${size * 0.8} ${size * 0.15}
                L ${size * 0.75} ${size * 0.85}
                L ${size * 0.25} ${size * 0.85} Z`}
            fill="url(#glassGradient)"
            stroke="none"
          />
          
          {/* Water with enhanced animations */}
          <g clipPath="url(#glassClip)">
            <rect
              x={size * 0.205}
              y={size * 0.85 - waterHeight}
              width={size * 0.59}
              height={waterHeight}
              fill="url(#waterGradient)"
              className="transition-all duration-3000 ease-out"
            />
            
            {/* Floating particles/bubbles */}
            {waterHeight > 20 && particles.map((particle) => (
              <circle
                key={particle.id}
                cx={`${particle.x}%`}
                cy={size * 0.85 - waterHeight * (particle.y / 100)}
                r="2"
                fill="url(#bubbleGradient)"
                className="animate-float"
                style={{
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </g>
          
          {/* Enhanced water surface waves */}
          {waterHeight > 0 && (
            <>
              <path
                d={`M ${size * 0.205} ${size * 0.85 - waterHeight}
                    Q ${size * 0.35} ${size * 0.85 - waterHeight - 3}
                    ${size * 0.5} ${size * 0.85 - waterHeight}
                    Q ${size * 0.65} ${size * 0.85 - waterHeight + 3}
                    ${size * 0.795} ${size * 0.85 - waterHeight}`}
                stroke={waterColors.primary}
                strokeWidth="2"
                fill="none"
                className="animate-pulse-slow"
                opacity="0.7"
              />
              <path
                d={`M ${size * 0.205} ${size * 0.85 - waterHeight + 5}
                    Q ${size * 0.4} ${size * 0.85 - waterHeight + 2}
                    ${size * 0.6} ${size * 0.85 - waterHeight + 5}
                    Q ${size * 0.795} ${size * 0.85 - waterHeight + 8}
                    ${size * 0.795} ${size * 0.85 - waterHeight + 5}`}
                stroke={waterColors.secondary}
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                opacity="0.5"
              />
            </>
          )}
          
          {/* Glass outline with enhanced styling */}
          <path
            d={`M ${size * 0.2} ${size * 0.15} 
                L ${size * 0.8} ${size * 0.15}
                L ${size * 0.75} ${size * 0.85}
                L ${size * 0.25} ${size * 0.85} Z`}
            fill="none"
            stroke="#64748b"
            strokeWidth="3"
            className="drop-shadow-lg"
          />
          
          {/* Enhanced glass shine effects */}
          <ellipse
            cx={size * 0.35}
            cy={size * 0.3}
            rx={size * 0.08}
            ry={size * 0.15}
            fill="rgba(255, 255, 255, 0.4)"
            transform={`rotate(-20 ${size * 0.35} ${size * 0.3})`}
          />
          <ellipse
            cx={size * 0.65}
            cy={size * 0.5}
            rx={size * 0.03}
            ry={size * 0.08}
            fill="rgba(255, 255, 255, 0.3)"
            transform={`rotate(15 ${size * 0.65} ${size * 0.5})`}
          />
        </svg>
        
        {/* Enhanced percentage indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <span className="animate-pulse">💧</span>
            <span>{percentage.toFixed(1)}%</span>
          </div>
        </div>

        {/* Level indicator ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            style={{ 
              top: `${85 - (percentage * 0.8)}%`,
              position: 'absolute'
            }}
          />
        </div>
      </div>
      
      {/* Enhanced level description */}
      <div className="mt-6 text-center">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <p className="text-2xl font-bold mb-1" style={{ color: waterColors.primary }}>
            {level.toFixed(2)} feet
          </p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg">
              {percentage < 25 ? '🚨' : 
               percentage < 50 ? '⚠️' : 
               percentage < 75 ? '🔵' : '✅'}
            </span>
            <p className="text-sm font-medium text-gray-600">
              {percentage < 25 ? 'Critical Level' : 
               percentage < 50 ? 'Low Level' : 
               percentage < 75 ? 'Moderate Level' : 'Good Level'}
            </p>
          </div>
          
          {/* Mini progress bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-2000 ease-out"
              style={{ 
                width: `${percentage}%`,
                background: `linear-gradient(90deg, ${waterColors.primary}, ${waterColors.secondary})`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterGlass;
