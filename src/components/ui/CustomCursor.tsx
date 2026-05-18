import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Disable on mobile
    if (window.innerWidth < 768) {
      setIsDesktop(false);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, input, textarea, [role="button"]');
      const card = target.closest('.glass-card');
      
      if (card && clickable) {
        setIsHovering(true);
        setHoverText('OPEN');
      } else if (clickable) {
        setIsHovering(true);
        setHoverText('');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 16),
          y: mousePosition.y - (isHovering ? 20 : 16),
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
          border: `1px solid ${isHovering ? 'rgba(0, 212, 255, 0.5)' : 'rgba(0, 212, 255, 0.2)'}`,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      >
        {hoverText && (
          <span className="text-[8px] font-code font-bold text-accent-cyan opacity-80 tracking-widest">
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
