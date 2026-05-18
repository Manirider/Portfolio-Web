import React from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'amber' | 'green';
  delay?: number;
}

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'cyan',
  delay = 0
}) => {
  const getGlowColor = () => {
    switch (glowColor) {
      case 'amber': return 'rgba(255, 179, 71, 0.15)';
      case 'green': return 'rgba(0, 255, 136, 0.15)';
      case 'cyan':
      default: return 'rgba(0, 212, 255, 0.15)';
    }
  };

  const getBorderHoverColor = () => {
    switch (glowColor) {
      case 'amber': return 'rgba(255, 179, 71, 0.3)';
      case 'green': return 'rgba(0, 255, 136, 0.3)';
      case 'cyan':
      default: return 'rgba(0, 212, 255, 0.3)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`glass-card relative overflow-hidden group ${className}`}
      style={{
        '--hover-glow': getGlowColor(),
        '--hover-border': getBorderHoverColor(),
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 40px var(--hover-glow)`,
        }}
      />
      <div 
        className="absolute inset-0 border border-transparent group-hover:border-[var(--hover-border)] rounded-xl transition-colors duration-500 pointer-events-none"
      />
      {children}
    </motion.div>
  );
};

export default GlowCard;
