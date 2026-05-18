import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { PortfolioData } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import TechBadge from '../ui/TechBadge';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, popIn } from '../../lib/animations';

interface ProjectsProps {
  data: PortfolioData['projects'];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [filter, setFilter] = useState('All');
  
  const featuredProjects = data.filter(p => p.featured);
  const otherProjects = data.filter(p => !p.featured);
  
  const filters = ['All', 'AI/ML', 'Blockchain', 'MLOps', 'Security'];
  
  const filteredOtherProjects = filter === 'All' 
    ? otherProjects 
    : otherProjects.filter(p => p.category.includes(filter));

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="03" subtitle="WHAT I'VE BUILT" title="PROJECTS" />

        {/* Featured Projects */}
        <div className="flex flex-col gap-24 mb-32">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const accentColor = 
              project.colorAccent === 'cyan' ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30' :
              project.colorAccent === 'amber' ? 'text-accent-amber bg-accent-amber/10 border-accent-amber/30' :
              'text-accent-green bg-accent-green/10 border-accent-green/30';
              
            const accentTextColor = 
              project.colorAccent === 'cyan' ? 'text-accent-cyan' :
              project.colorAccent === 'amber' ? 'text-accent-amber' :
              'text-accent-green';

            return (
              <div key={project.id} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
                {/* Visual (Left for even, Right for odd on Desktop) */}
                <motion.div 
                  className={`lg:col-span-6 relative z-10 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <GlowCard className="aspect-video w-full rounded-xl overflow-hidden flex items-center justify-center p-8 relative group" glowColor={project.colorAccent}>
                    {/* Placeholder for project image, using styled abstract representation */}
                    <div className="absolute inset-0 bg-bg-secondary opacity-50" />
                    <div className={`text-6xl font-display font-bold opacity-20 ${accentTextColor} group-hover:scale-110 transition-transform duration-700`}>
                      {project.title.substring(0, 2).toUpperCase()}
                    </div>
                    {/* Abstract lines/shapes overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                  </GlowCard>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className={`lg:col-span-6 relative z-20 flex flex-col ${isEven ? 'lg:order-2 lg:items-start lg:text-left' : 'lg:order-1 lg:items-end lg:text-right'}`}
                  variants={isEven ? slideInRight : slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <span className="font-display text-[120px] font-bold text-bg-primary absolute -top-16 opacity-10 select-none z-[-1]"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                    0{index + 1}.
                  </span>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-code font-bold border mb-4 ${accentColor}`}>
                    {project.category}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
                    {project.title}
                  </h3>
                  
                  <p className={`font-code text-sm mb-6 ${accentTextColor}`}>
                    {project.impact}
                  </p>
                  
                  <GlowCard className="p-6 mb-6" glowColor={project.colorAccent}>
                    <p className="text-text-secondary text-left leading-relaxed">
                      {project.description}
                    </p>
                  </GlowCard>
                  
                  <div className={`flex flex-wrap gap-2 mb-6 ${isEven ? 'justify-start' : 'justify-end'}`}>
                    {project.techStack.map(tech => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm">
                    {project.metrics.map(metric => (
                      <div key={metric.label} className={`flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                        <span className={`font-code font-bold text-xl ${accentTextColor}`}>{metric.value}</span>
                        <span className="text-xs text-text-muted uppercase tracking-wider">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-primary hover:text-accent-cyan transition-colors" aria-label="GitHub Repository">
                      <SiGithub size={24} />
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-primary hover:text-accent-cyan transition-colors" aria-label="Live Demo">
                        <ExternalLink size={24} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Other Projects Grid */}
        <div className="mt-32">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-text-primary">More Projects</h3>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-code font-medium transition-all ${
                    filter === f 
                      ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30' 
                      : 'bg-transparent text-text-muted border border-white/5 hover:text-text-primary hover:border-white/20'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={filter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredOtherProjects.map(project => (
                <motion.div key={project.id} variants={popIn} className="h-full">
                  <GlowCard className="h-full flex flex-col p-6" glowColor={project.colorAccent}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-accent-cyan opacity-80">
                        {/* Folder Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-cyan transition-colors">
                        <SiGithub size={20} />
                      </a>
                    </div>
                    
                    <h4 className="text-xl font-display font-bold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h4>
                    
                    <p className="text-xs font-code text-accent-cyan mb-4 opacity-80">
                      {project.impact}
                    </p>
                    
                    <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="text-xs font-code text-text-muted">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-xs font-code text-text-muted">+{project.techStack.length - 4}</span>
                      )}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="section-divider mt-32" />
    </section>
  );
};

export default Projects;
