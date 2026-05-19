import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowDown } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { PortfolioData } from '../../types';
import TypewriterText from '../ui/TypewriterText';
import AnimatedCounter from '../ui/AnimatedCounter';
import { fadeInUp, staggerContainer } from '../../lib/animations';

interface HeroProps {
  data: PortfolioData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background grid overlay on top of 3D */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column — Content (lg:col-span-7 leaves right side for 3D globe) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan text-sm font-medium animate-pulse">
                <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                ⚡ Available for Opportunities
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-6 flex flex-col gap-1">
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-text-primary">
                {data.personal.firstName}
              </h1>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight gradient-text-cyan">
                {data.personal.middleName}
              </h1>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-text-secondary">
                {data.personal.lastName}
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-6 text-xl md:text-2xl h-8">
              <TypewriterText texts={data.personal.roles} />
            </motion.div>

            <motion.p variants={fadeInUp} className="mb-12 text-text-secondary text-lg max-w-xl leading-relaxed">
              {data.personal.tagline}
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full">
              {data.stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <AnimatedCounter 
                    value={stat.value as number} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                  <span className="text-sm font-body text-text-secondary">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-accent-cyan text-bg-primary font-bold rounded-md hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                View My Work
              </a>
              <a 
                href={data.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="group relative px-8 py-3 bg-transparent text-accent-cyan font-bold rounded-md border border-accent-cyan overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download Resume <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-0 bg-accent-cyan/10 group-hover:w-full transition-[width] duration-300 ease-out" />
              </a>
              <div className="flex items-center gap-3 ml-4">
                <a href={data.socials[0].url} target="_blank" rel="noopener noreferrer" className="p-3 text-text-secondary hover:text-accent-cyan hover:bg-white/5 rounded-full transition-colors">
                  <SiGithub size={24} />
                </a>
                <a href={data.socials[1].url} target="_blank" rel="noopener noreferrer" className="p-3 text-text-secondary hover:text-accent-cyan hover:bg-white/5 rounded-full transition-colors">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — empty space for 3D neural globe to show through */}
          <div className="lg:col-span-5 hidden lg:block" />

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-accent-cyan/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs font-code uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="animate-bounce-slow" />
      </motion.div>
    </section>
  );
};

export default Hero;
