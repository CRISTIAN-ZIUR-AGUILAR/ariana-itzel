import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundParticles() {
  // Generar partículas fijas para evitar re-renders
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      size: Math.random() * 16 + 8,
      left: Math.random() * 100,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.15,
      isHeart: i % 2 === 0,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Luces difusas de fondo (Glow orbs) */}
      <div className="absolute top-[-10%] left-[15%] w-72 h-72 md:w-96 md:h-96 rounded-full bg-rose-500/15 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[10%] w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-purple-600/15 blur-[120px]" />
      <div className="absolute top-[40%] right-[25%] w-64 h-64 rounded-full bg-amber-400/10 blur-[90px]" />

      {/* Partículas flotantes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: '-40px',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -window.innerHeight - 80],
            x: [0, Math.sin(p.id) * 35, 0],
            rotate: [0, p.isHeart ? 25 : 180, p.isHeart ? -20 : 360],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.isHeart ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-rose-400/50 drop-shadow-[0_0_8px_rgba(255,117,140,0.4)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <div
              style={{
                width: `${p.size / 3}px`,
                height: `${p.size / 3}px`,
              }}
              className="rounded-full bg-amber-200 shadow-[0_0_10px_#fde68a]"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
