'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = ({
  variant = 'gradient', // 'gradient' | 'particles' | 'grid' | 'blob' | 'waves'
  intensity = 'medium', // 'low' | 'medium' | 'high'
  className = '',
  children
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Config berdasarkan variant
  const variants = {
    gradient: {
      colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
      speed: intensity === 'high' ? 20 : intensity === 'medium' ? 15 : 10
    },
    particles: {
      count: intensity === 'high' ? 50 : intensity === 'medium' ? 30 : 15,
      size: intensity === 'high' ? 4 : intensity === 'medium' ? 3 : 2
    },
    blob: {
      count: intensity === 'high' ? 5 : intensity === 'medium' ? 3 : 2,
      size: 200
    }
  };

  // Render berdasarkan variant yang dipilih
  const renderBackground = () => {
    switch(variant) {
      case 'gradient':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Gradient */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                  'linear-gradient(135deg, #f093fb, #f5576c, #667eea)',
                  'linear-gradient(225deg, #667eea, #764ba2, #f093fb)',
                  'linear-gradient(315deg, #f093fb, #f5576c, #667eea)',
                ]
              }}
              transition={{
                duration: variants.gradient.speed,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Animated Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-soft-light opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-soft-light opacity-10"
              animate={{
                x: [0, -80, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </div>
        );

      case 'particles':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Particle Container */}
            <div className="absolute inset-0">
              {Array.from({ length: variants.particles.count }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full bg-white mix-blend-overlay`}
                  style={{
                    width: variants.particles.size,
                    height: variants.particles.size,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3 + 0.1,
                  }}
                  animate={{
                    x: [0, Math.sin(i) * 100, 0],
                    y: [0, Math.cos(i) * 50, 0],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Subtle Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900" />
          </div>
        );

      case 'grid':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Grid Lines */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '50px 50px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30" />

            {/* Moving Highlights */}
            <motion.div
              className="absolute w-48 h-48 rounded-full bg-blue-500/10 blur-3xl"
              animate={{
                x: [0, 400, 0],
                y: [0, 200, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        );

      case 'blob':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Blobs */}
            {Array.from({ length: variants.blob.count }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-30`}
                style={{
                  width: variants.blob.size,
                  height: variants.blob.size,
                  background: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6',
                }}
                animate={{
                  x: [
                    `${Math.sin(i) * 100}%`,
                    `${Math.cos(i) * 150}%`,
                    `${Math.sin(i + 1) * 100}%`
                  ],
                  y: [
                    `${Math.cos(i) * 100}%`,
                    `${Math.sin(i) * 150}%`,
                    `${Math.cos(i + 1) * 100}%`
                  ],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20 + i * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 2
                }}
              />
            ))}
          </div>
        );

      case 'waves':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Wave Layers */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
              style={{
                clipPath: 'polygon(0% 100%, 100% 80%, 100% 100%, 0% 100%)',
              }}
              animate={{
                clipPath: [
                  'polygon(0% 100%, 100% 80%, 100% 100%, 0% 100%)',
                  'polygon(0% 100%, 100% 60%, 100% 100%, 0% 100%)',
                  'polygon(0% 100%, 100% 80%, 100% 100%, 0% 100%)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-r from-purple-500/15 to-pink-500/15"
              style={{
                clipPath: 'polygon(0% 100%, 100% 70%, 100% 100%, 0% 100%)',
              }}
              animate={{
                clipPath: [
                  'polygon(0% 100%, 100% 70%, 100% 100%, 0% 100%)',
                  'polygon(0% 100%, 100% 50%, 100% 100%, 0% 100%)',
                  'polygon(0% 100%, 100% 70%, 100% 100%, 0% 100%)',
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-blue-900" />
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        );
    }
  };

  // Mouse-following Light (optional)
  const renderMouseLight = () => {
    if (intensity !== 'high') return null;

    return (
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15
        }}
      />
    );
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Animation */}
      {renderBackground()}

      {/* Mouse-following Light (High Intensity Only) */}
      {renderMouseLight()}

      {/* Noise/Texture Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
