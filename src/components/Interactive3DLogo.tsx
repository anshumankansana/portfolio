import React, { useRef, useEffect, useState } from 'react';

interface Interactive3DLogoProps {
  mousePosition: { x: number; y: number };
}

const Interactive3DLogo: React.FC<Interactive3DLogoProps> = ({ mousePosition }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!logoRef.current) return;

    const element = logoRef.current;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate rotation based on mouse position relative to the logo center
    const deltaX = (mousePosition.x - centerX) / 10;
    const deltaY = (mousePosition.y - centerY) / 10;

    // Limit rotation angles
    const rotateX = Math.max(-45, Math.min(45, deltaY));
    const rotateY = Math.max(-45, Math.min(45, -deltaX));

    element.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      ${isHovered ? 'scale(1.1)' : 'scale(1)'}
      translateZ(${isHovered ? '20px' : '0px'})
    `;
  }, [mousePosition, isHovered]);

  return (
    <div className="relative mb-8">
      <div
        ref={logoRef}
        className="w-32 h-32 mx-auto cursor-pointer transition-all duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3D Dodecahedron-like structure */}
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Front face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl border border-blue-400/50 flex items-center justify-center"
            style={{ 
              transform: 'translateZ(20px)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }}
          >
            <div className="text-3xl font-bold text-white">A</div>
          </div>
          
          {/* Back face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl border border-purple-400/50 flex items-center justify-center"
            style={{ 
              transform: 'translateZ(-20px) rotateY(180deg)',
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)'
            }}
          >
            <div className="text-3xl font-bold text-white">K</div>
          </div>
          
          {/* Right face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl border border-cyan-400/50 flex items-center justify-center"
            style={{ 
              transform: 'rotateY(90deg) translateZ(20px)',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
            }}
          >
            <div className="text-2xl font-bold text-white">{'</>'}</div>
          </div>
          
          {/* Left face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl border border-emerald-400/50 flex items-center justify-center"
            style={{ 
              transform: 'rotateY(-90deg) translateZ(20px)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
            }}
          >
            <div className="text-2xl font-bold text-white">{'{ }'}</div>
          </div>
          
          {/* Top face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl border border-yellow-400/50 flex items-center justify-center"
            style={{ 
              transform: 'rotateX(90deg) translateZ(20px)',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
            }}
          >
            <div className="text-2xl font-bold text-white">⚡</div>
          </div>
          
          {/* Bottom face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl border border-red-400/50 flex items-center justify-center"
            style={{ 
              transform: 'rotateX(-90deg) translateZ(20px)',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
            }}
          >
            <div className="text-2xl font-bold text-white">🚀</div>
          </div>
        </div>
        
        {/* Floating particles around the logo */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse ${
                isHovered ? 'animate-bounce' : ''
              }`}
              style={{
                left: `${50 + Math.cos((i * Math.PI) / 4) * 60}%`,
                top: `${50 + Math.sin((i * Math.PI) / 4) * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + (i % 3)}s`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 w-32 h-32 mx-auto rounded-full transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-150' : 'opacity-40 scale-100'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default Interactive3DLogo;