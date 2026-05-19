import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, BarChart3, Ship, Brain } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import { fadeInUp, slideInLeft, staggerContainer, popIn } from '../../lib/animations';

function AnimatedCounter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const steps = 50;
          const increment = to / steps;
          const interval = setInterval(() => {
            start += increment;
            if (start >= to) { setCount(to); clearInterval(interval); }
            else setCount(Math.floor(start));
          }, 40);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref} className="font-code text-3xl md:text-4xl font-bold text-accent-amber">{prefix}{count}{suffix}</span>;
}

const PHILOSOPHY = [
  {
    title: 'Ship Fast, Learn Faster',
    icon: Ship,
    text: 'Perfect is the enemy of shipped. I build fast MVPs, gather real feedback, and iterate with data — not assumptions.',
  },
  {
    title: 'AI-Native by Default',
    icon: Brain,
    text: "I don't bolt AI on. I design products where intelligence is a first-class architectural citizen from day one.",
  },
  {
    title: 'Metrics or It Didn\'t Happen',
    icon: BarChart3,
    text: 'Every decision should be defensible with data. $700K savings. 60% efficiency gains. Numbers tell the truth.',
  },
];

const Entrepreneur: React.FC = () => {
  return (
    <section id="venture" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="03.5" subtitle="BEYOND THE CODE" title="ENTREPRENEUR & BUILDER" />

        {/* Quote */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="text-6xl md:text-7xl font-display text-accent-amber/30 leading-none select-none">"</span>
          <blockquote className="text-lg md:text-xl font-display leading-relaxed text-text-secondary -mt-8">
            I don't just write code — I build solutions.
            <br />
            Every system I architect starts with one question:
            <br />
            <span className="text-accent-amber font-bold">what problem does this actually solve?</span>
          </blockquote>
          <p className="mt-6 text-sm font-code text-text-secondary">— Manikanta Suryasai Sunkara</p>
        </motion.div>

        {/* Life OS Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="glass-card p-8 md:p-10 border-2 border-accent-amber/20 hover:border-accent-amber/40 transition-all relative overflow-hidden group hover:shadow-[0_0_40px_rgba(255,179,71,0.1)]">
            {/* IN PROGRESS badge */}
            <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-accent-amber/10 border border-accent-amber/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent-amber animate-pulse shadow-[0_0_8px_rgba(255,179,71,0.6)]" />
              <span className="text-xs font-code text-accent-amber font-medium">IN PROGRESS</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Rocket className="text-accent-amber" size={24} />
              <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary">LIFE OS</h3>
            </div>

            <p className="text-accent-amber/80 font-display text-lg mb-6 italic">
              "Your entire life, intelligently organized."
            </p>

            <p className="text-text-secondary mb-6 max-w-2xl">
              A full-stack AI-powered productivity platform that replaces 5 different apps with one intelligent system:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {[
                { icon: '🎯', text: 'Task management with AI prioritization engine' },
                { icon: '📈', text: 'Habit tracking with behavioral pattern analytics' },
                { icon: '💰', text: 'Personal finance & goal progress dashboards' },
                { icon: '🧠', text: 'AI-powered weekly review & insight generation' },
                { icon: '🔄', text: 'Cross-platform sync (web · mobile · desktop)' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-code text-text-secondary uppercase tracking-wider">Build Status</span>
                <span className="text-sm font-code text-accent-amber font-bold">~60%</span>
              </div>
              <div className="h-3 bg-bg-primary/80 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-amber to-orange-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'LLM APIs', 'Docker'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-code text-accent-amber/80 bg-accent-amber/5 border border-accent-amber/15 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/Manirider"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-sm font-medium bg-accent-amber text-bg-primary rounded-lg hover:bg-amber-400 transition-colors"
              >
                Follow on GitHub →
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-medium text-accent-amber border border-accent-amber/30 rounded-lg hover:bg-accent-amber/10 transition-colors"
              >
                Interested? Let's Talk →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Entrepreneur Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: 30, suffix: '+', label: 'Startup Ideas Evaluated' },
            { value: 1, suffix: '', label: 'Product Currently Shipping' },
            { value: 10, suffix: '+', label: 'BI Dashboards Built' },
            { value: 60, suffix: '%', label: 'Workflow Efficiency Gained' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              <p className="text-xs font-code text-text-secondary mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* EDC Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlowCard className="p-6 border-l-4 border-l-accent-amber h-full" glowColor="amber">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={20} className="text-accent-amber" />
                <span className="text-xs font-code text-accent-amber font-bold uppercase tracking-wider">Core Member</span>
              </div>
              <h4 className="text-lg font-display font-bold text-text-primary mb-1">Entrepreneurship Development Cell</h4>
              <p className="text-sm text-text-secondary mb-4">Aditya College, Surampalem</p>
              <ul className="flex flex-col gap-2 text-sm text-text-secondary">
                {['30+ startup ideas evaluated', 'Cross-disciplinary innovation work', 'New venture ideation & validation', 'Startup challenge participation'].map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-amber shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </motion.div>
        </div>

        {/* Builder Philosophy Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {PHILOSOPHY.map((card) => (
            <motion.div key={card.title} variants={popIn}>
              <GlowCard className="p-6 border-t-2 border-t-accent-amber/40 h-full" glowColor="amber">
                <card.icon size={28} className="text-accent-amber mb-4" />
                <h4 className="text-lg font-display font-bold text-text-primary mb-3">{card.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{card.text}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <p className="text-lg font-display text-text-secondary mb-6">Have an idea? Let's build it.</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 text-base font-bold bg-accent-amber text-bg-primary rounded-lg hover:bg-amber-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,179,71,0.3)]"
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>
      <div className="section-divider mt-32" />
    </section>
  );
};

export default Entrepreneur;
