import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import * as Icons from 'react-icons/si';
import { PortfolioData } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '../../lib/animations';

interface ContactProps {
  data: PortfolioData['personal'];
  socials: PortfolioData['socials'];
}

const Contact: React.FC<ContactProps> = ({ data, socials }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isFocused, setIsFocused] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this to a backend or service like Formspree
    console.log('Form submitted:', formData);
    alert('Thanks for your message! This is a demo form.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="06" subtitle="LET'S BUILD SOMETHING" title="GET IN TOUCH" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div 
            className="flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed mb-8">
              I'm actively looking for AI/ML, Full-Stack, and Blockchain opportunities. 
              Whether you have a project, a job offer, or just want to connect — my inbox is always open.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="mb-12 inline-flex items-center gap-3 px-4 py-2 bg-accent-green/5 border border-accent-green/20 rounded-full w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
              <span className="text-sm font-code text-accent-green font-medium">Currently Available for Opportunities</span>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div variants={slideInLeft}>
                <a href={`mailto:${data.email}`} className="block">
                  <GlowCard className="p-4 flex items-center gap-4 group cursor-pointer" glowColor="cyan">
                    <div className="p-3 bg-bg-card rounded-md border border-white/5 group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-colors">
                      <Mail size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-code text-accent-cyan/60 mb-1">Email</span>
                      <span className="font-medium text-text-primary group-hover:text-accent-cyan transition-colors">{data.email}</span>
                    </div>
                    <ExternalLink size={16} className="ml-auto opacity-0 group-hover:opacity-100 text-accent-cyan transition-opacity" />
                  </GlowCard>
                </a>
              </motion.div>
              
              <motion.div variants={slideInLeft}>
                <a href={`tel:${data.phone}`} className="block">
                  <GlowCard className="p-4 flex items-center gap-4 group cursor-pointer" glowColor="cyan">
                    <div className="p-3 bg-bg-card rounded-md border border-white/5 group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-colors">
                      <Phone size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-code text-accent-cyan/60 mb-1">Phone</span>
                      <span className="font-medium text-text-primary group-hover:text-accent-cyan transition-colors">{data.phone}</span>
                    </div>
                    <ExternalLink size={16} className="ml-auto opacity-0 group-hover:opacity-100 text-accent-cyan transition-opacity" />
                  </GlowCard>
                </a>
              </motion.div>

              {socials.map((social) => {
                const IconComponent = (Icons as any)[social.icon];
                return (
                  <motion.div key={social.name} variants={slideInLeft}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="block">
                      <GlowCard className="p-4 flex items-center gap-4 group cursor-pointer" glowColor="cyan">
                        <div className="p-3 bg-bg-card rounded-md border border-white/5 group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-colors">
                          {IconComponent && <IconComponent size={20} />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-code text-accent-cyan/60 mb-1">{social.name}</span>
                          <span className="font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                            {social.url.replace('https://', '').replace('www.', '')}
                          </span>
                        </div>
                        <ExternalLink size={16} className="ml-auto opacity-0 group-hover:opacity-100 text-accent-cyan transition-opacity" />
                      </GlowCard>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Terminal Form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="terminal-window h-full flex flex-col shadow-2xl shadow-accent-cyan/5">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                </div>
                <div className="flex-1 text-center font-code text-xs text-text-secondary">
                  contact@{data.name.split(' ')[0].toLowerCase()}.dev — bash — 80×24
                </div>
              </div>
              
              <div className="flex-1 p-6 bg-[#0a0a10] font-code text-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
                  <div className={`flex flex-col gap-2 transition-opacity ${isFocused && isFocused !== 'name' ? 'opacity-50' : 'opacity-100'}`}>
                    <label htmlFor="name" className="text-accent-cyan flex gap-2">
                      <span className="text-accent-cyan/50">{'>'}</span> name:
                    </label>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <span>[</span>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('name')}
                        onBlur={() => setIsFocused(null)}
                        required
                        className="flex-1 bg-transparent border-none outline-none text-text-primary focus:text-accent-cyan transition-colors p-0 focus:ring-0 placeholder-text-muted/30"
                        placeholder="Enter your name"
                      />
                      <span>]</span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col gap-2 transition-opacity ${isFocused && isFocused !== 'email' ? 'opacity-50' : 'opacity-100'}`}>
                    <label htmlFor="email" className="text-accent-cyan flex gap-2">
                      <span className="text-accent-cyan/50">{'>'}</span> email:
                    </label>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <span>[</span>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('email')}
                        onBlur={() => setIsFocused(null)}
                        required
                        className="flex-1 bg-transparent border-none outline-none text-text-primary focus:text-accent-cyan transition-colors p-0 focus:ring-0 placeholder-text-muted/30"
                        placeholder="Enter your email"
                      />
                      <span>]</span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col gap-2 transition-opacity ${isFocused && isFocused !== 'subject' ? 'opacity-50' : 'opacity-100'}`}>
                    <label htmlFor="subject" className="text-accent-cyan flex gap-2">
                      <span className="text-accent-cyan/50">{'>'}</span> subject:
                    </label>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <span>[</span>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('subject')}
                        onBlur={() => setIsFocused(null)}
                        required
                        className="flex-1 bg-transparent border-none outline-none text-text-primary focus:text-accent-cyan transition-colors p-0 focus:ring-0 placeholder-text-muted/30"
                        placeholder="Project inquiry, job offer, etc."
                      />
                      <span>]</span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col gap-2 flex-1 transition-opacity ${isFocused && isFocused !== 'message' ? 'opacity-50' : 'opacity-100'}`}>
                    <label htmlFor="message" className="text-accent-cyan flex gap-2">
                      <span className="text-accent-cyan/50">{'>'}</span> message:
                    </label>
                    <div className="flex items-start gap-2 text-text-secondary h-full">
                      <span>[</span>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setIsFocused('message')}
                        onBlur={() => setIsFocused(null)}
                        required
                        className="flex-1 bg-transparent border-none outline-none text-text-primary focus:text-accent-cyan transition-colors p-0 focus:ring-0 resize-none h-full min-h-[120px] placeholder-text-muted/30"
                        placeholder="Type your message here..."
                      />
                      <span>]</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-center">
                    <span className="text-accent-cyan/50 mr-2">{'>'}</span>
                    <button 
                      type="submit"
                      className="group flex items-center gap-2 text-accent-cyan hover:text-white transition-colors outline-none focus-visible:text-white"
                    >
                      <span className="text-text-secondary group-hover:text-white group-focus-visible:text-white transition-colors">$</span> 
                      <span>send --message</span>
                      <span className="w-[8px] h-[1em] bg-accent-cyan group-hover:bg-white animate-pulse" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
