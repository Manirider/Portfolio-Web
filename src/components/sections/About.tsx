import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import { slideInLeft, slideInRight, staggerContainer } from '../../lib/animations';

interface AboutProps {
  data: PortfolioData['about'];
  personal: PortfolioData['personal'];
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="01" subtitle="WHO AM I" title="ABOUT ME" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column - Visual */}
          <motion.div 
            className="lg:col-span-5 relative"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <GlowCard className="p-8 aspect-[4/5] flex items-center justify-center relative">
              <div className="absolute inset-0 border-[4px] border-transparent border-t-accent-cyan/30 border-l-accent-cyan/30 rounded-xl rounded-br-[100px]" />
              
              <div className="text-center">
                <div className="text-[120px] font-display font-bold leading-none tracking-tighter gradient-text-cyan opacity-80">
                  MS
                </div>
              </div>

              {/* Stat bubbles */}
              <motion.div 
                className="absolute -right-8 top-16 px-4 py-2 bg-bg-primary/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-code text-accent-amber block mb-1">EDUCATION</span>
                <span className="text-sm font-medium">B.Tech AI/ML</span>
              </motion.div>

              <motion.div 
                className="absolute -left-6 bottom-32 px-4 py-2 bg-bg-primary/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-code text-accent-cyan block mb-1">ACADEMICS</span>
                <span className="text-sm font-medium">CGPA: 8.80</span>
              </motion.div>

              <motion.div 
                className="absolute -right-4 bottom-12 px-4 py-2 bg-bg-primary/80 backdrop-blur-md border border-white/10 rounded-lg shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-code text-accent-green block mb-1">LOCATION</span>
                <span className="text-sm font-medium">Hyderabad, India</span>
              </motion.div>
            </GlowCard>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col gap-6 text-text-secondary text-lg leading-relaxed mb-10">
              {data.paragraphs.map((paragraph, index) => (
                <motion.p key={index} variants={slideInRight}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div variants={slideInRight}>
              <GlowCard className="p-6 border-l-4 border-l-accent-cyan">
                <h4 className="font-code text-sm text-accent-cyan mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                  CURRENT STATUS
                </h4>
                <ul className="flex flex-col gap-3 font-body text-sm md:text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🔭</span>
                    <span><strong className="text-text-primary font-medium">Currently building:</strong> {data.currentlyBuilding}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">📚</span>
                    <span><strong className="text-text-primary font-medium">Learning:</strong> {data.learning}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-xl">🎯</span>
                    <span><strong className="text-text-primary font-medium">Open to:</strong> {data.openTo}</span>
                  </li>
                </ul>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-32" />
    </section>
  );
};

export default About;
