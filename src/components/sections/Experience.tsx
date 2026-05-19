import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import TechBadge from '../ui/TechBadge';

interface ExperienceProps {
  data: PortfolioData['experience'];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="04" subtitle="MY JOURNEY" title="EXPERIENCE" />

        <div className="relative max-w-4xl mx-auto">
          {/* Center Timeline Line (Desktop) / Left Line (Mobile) */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-accent-cyan to-transparent opacity-20 -translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          <div className="flex flex-col gap-12">
            {data.map((item, index) => {
              const isEven = index % 2 === 0;
              
              const badgeColorClass = 
                item.badgeColor === 'cyan' ? 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10' :
                item.badgeColor === 'amber' ? 'text-accent-amber border-accent-amber/30 bg-accent-amber/10' :
                item.badgeColor === 'green' ? 'text-accent-green border-accent-green/30 bg-accent-green/10' :
                'text-purple-400 border-purple-500/30 bg-purple-500/10';

              const dotColorClass = 
                item.badgeColor === 'cyan' ? 'bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.8)]' :
                item.badgeColor === 'amber' ? 'bg-accent-amber shadow-[0_0_10px_rgba(255,179,71,0.8)]' :
                item.badgeColor === 'green' ? 'bg-accent-green shadow-[0_0_10px_rgba(0,255,136,0.8)]' :
                'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]';

              return (
                <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-bg-primary z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <div className={`w-full h-full rounded-full ${dotColorClass}`} />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div 
                    className={`md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <GlowCard className="p-6 md:p-8" glowColor={item.badgeColor === 'purple' ? 'cyan' : item.badgeColor}>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-2 py-1 text-[10px] font-code font-bold rounded-sm border uppercase tracking-wider ${badgeColorClass}`}>
                          {item.type}
                        </span>
                        <span className="text-sm font-code text-text-secondary">{item.period}</span>
                      </div>
                      
                      <h3 className="text-2xl font-display font-bold text-text-primary mb-1">
                        {item.role}
                      </h3>
                      <h4 className="text-lg text-text-secondary mb-4">
                        {item.company}
                        {item.location && <span className="text-text-secondary text-sm ml-2">| {item.location}</span>}
                      </h4>
                      
                      <ul className="flex flex-col gap-2 mb-6">
                        {item.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${item.badgeColor === 'purple' ? 'bg-purple-400' : `bg-accent-${item.badgeColor}`}`} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                          {item.techStack.map(tech => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>
                      )}
                    </GlowCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="section-divider mt-32" />
    </section>
  );
};

export default Experience;
