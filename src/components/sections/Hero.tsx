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
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30 animate-pulse-glow pointer-events-none" />
      <div className="glow-orb glow-orb-cyan w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="glow-orb glow-orb-amber w-[500px] h-[500px] bottom-[-100px] right-[-100px]" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Content */}
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
                  <span className="text-sm font-body text-text-muted">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <a 
                href="#projects" 
                className="px-8 py-3 bg-accent-cyan text-bg-primary font-bold rounded-md hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)]"
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

          {/* Right Column - Visual */}
          <motion.div 
            className="lg:col-span-5 hidden lg:flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border border-white/10 rounded-full border-t-accent-cyan animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-white/5 rounded-full border-b-accent-amber animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Center Monogram */}
              <div className="z-10 text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent-cyan to-accent-amber drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                M
              </div>

              {/* Orbiting tech badges */}
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-bg-card border border-accent-cyan/30 rounded-full text-xs font-code text-accent-cyan animate-[spin_20s_linear_infinite_reverse]">
                  PyTorch
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-3 py-1 bg-bg-card border border-accent-amber/30 rounded-full text-xs font-code text-accent-amber animate-[spin_20s_linear_infinite_reverse]">
                  Solidity
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-bg-card border border-accent-green/30 rounded-full text-xs font-code text-accent-green animate-[spin_20s_linear_infinite_reverse]">
                  FastAPI
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-bg-card border border-purple-500/30 rounded-full text-xs font-code text-purple-400 animate-[spin_20s_linear_infinite_reverse]">
                  Kubernetes
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
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
