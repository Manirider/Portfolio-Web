import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
  number: string;
  subtitle: string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ number, subtitle, title }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <span className="font-code text-sm text-accent-cyan tracking-wider">
          // {number}. {subtitle}
        </span>
        <div className="relative inline-block w-fit">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
            <span className="text-accent-cyan/30 mr-4">[</span>
            {title}
            <span className="text-accent-cyan/30 ml-4">]</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute -bottom-4 left-0 h-[2px] bg-gradient-to-r from-accent-cyan to-transparent opacity-50"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionTitle;
