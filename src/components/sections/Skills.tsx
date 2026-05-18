import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'react-icons/si';
import { PortfolioData } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import { staggerContainer, popIn } from '../../lib/animations';

interface SkillsProps {
  data: PortfolioData['skills'];
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="02" subtitle="TECH ARSENAL" title="SKILLS" />

        <div className="flex flex-col gap-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4 border-b border-white/10 pb-4">
            {data.map((category, index) => {
              const IconComponent = (Icons as any)[category.icon];
              return (
                <button
                  key={category.title}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all relative ${
                    activeTab === index 
                      ? 'text-accent-cyan bg-white/5' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {IconComponent && <IconComponent size={16} />}
                  <span className="font-code text-sm md:text-base font-medium">{category.title}</span>
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-cyan"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {data[activeTab].skills.map((skill) => {
                  const IconComponent = (Icons as any)[skill.icon];
                  return (
                    <motion.div key={skill.name} variants={popIn}>
                      <GlowCard className="p-4 flex flex-col gap-4 h-full" glowColor={activeTab % 2 === 0 ? 'cyan' : 'amber'}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${activeTab % 2 === 0 ? 'bg-accent-cyan/10 text-accent-cyan' : 'bg-accent-amber/10 text-accent-amber'}`}>
                            {IconComponent ? <IconComponent size={24} /> : <div className="w-6 h-6" />}
                          </div>
                          <span className="font-medium text-text-primary">{skill.name}</span>
                        </div>
                        
                        <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden mt-auto">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className={`h-full rounded-full ${activeTab % 2 === 0 ? 'bg-accent-cyan' : 'bg-accent-amber'}`}
                          />
                        </div>
                      </GlowCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="section-divider mt-32" />
    </section>
  );
};

export default Skills;
