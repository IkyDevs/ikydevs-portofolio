'use client';

import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

const BackgroundWrapper = ({
  sectionId,
  variant = 'gradient',
  intensity = 'medium',
  className = '',
  children
}) => {
  // Variant mapping berdasarkan section
  const sectionVariants = {
    hero: { variant: 'gradient', intensity: 'high' },
    about: { variant: 'grid', intensity: 'low' },
    projects: { variant: 'particles', intensity: 'medium' },
    skills: { variant: 'blob', intensity: 'medium' },
    contact: { variant: 'waves', intensity: 'high' },
  };

  const config = sectionVariants[sectionId] || { variant, intensity };

  return (
    <motion.section
      id={sectionId}
      className={`relative min-h-screen ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <AnimatedBackground
        variant={config.variant}
        intensity={config.intensity}
      >
        <div className="container mx-auto px-4 py-16 md:py-24">
          {children}
        </div>
      </AnimatedBackground>
    </motion.section>
  );
};

export default BackgroundWrapper;
