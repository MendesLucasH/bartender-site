import React from 'react';

const ParticlesBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none mix-blend-screen">
      {Array.from({ length: 28 }).map((_, i) => {
        // posições fixas e animações variadas (sem Math.random no render)
        const x = (i * 37) % 100;          // % horizontal
        const y = (i * 53) % 100;          // % vertical
        const size = 10 + (i % 6) * 4;     // 10–30px
        const dur = 6 + (i % 5) * 1.2;     // 6–10s
        const delay = (i % 7) * 0.6;       // 0–3.6s
        return (
          <span
            key={i}
            className="absolute dot"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `floatY ${dur}s ease-in-out ${delay}s infinite, pulse ${dur *
                0.8}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticlesBackground;
