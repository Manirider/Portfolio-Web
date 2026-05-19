import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'react-icons/si';
import { ExternalLink, Award, Zap, Target, Shield } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import { staggerContainer, popIn, fadeInUp } from '../../lib/animations';
import type { PortfolioData } from '../../types';

interface SkillsProps {
  data: PortfolioData['skills'];
}

const GPP_SKILLS = [
  { name: 'System Design', score: 100, tasks: 3, badge: '👑' },
  { name: 'Transfer Learning', score: 100, tasks: 2, badge: '👑' },
  { name: 'User Acceptance Testing', score: 99, tasks: 4, badge: '⭐' },
  { name: 'Solution Architecture', score: 99, tasks: 2, badge: '⭐' },
  { name: 'Prompt Engineering', score: 98, tasks: 2, badge: '⭐' },
  { name: 'API Integration', score: 98, tasks: 2, badge: '⭐' },
  { name: 'Machine Learning', score: 96, tasks: 3, badge: '⭐' },
  { name: 'Test-Driven Development', score: 95, tasks: 3, badge: null },
  { name: 'Data Preprocessing', score: 94, tasks: 4, badge: null },
  { name: 'Model Evaluation', score: 93, tasks: 3, badge: null },
  { name: 'Feature Engineering', score: 92, tasks: 2, badge: null },
  { name: 'NLP', score: 91, tasks: 3, badge: null },
  { name: 'ETL Pipelines', score: 90, tasks: 2, badge: null },
  { name: 'CI/CD', score: 89, tasks: 2, badge: null },
  { name: 'Security Auditing', score: 88, tasks: 2, badge: null },
  { name: 'Smart Contract Dev', score: 87, tasks: 3, badge: null },
  { name: 'REST API Design', score: 86, tasks: 2, badge: null },
  { name: 'Docker & K8s', score: 85, tasks: 2, badge: null },
  { name: 'Database Design', score: 84, tasks: 2, badge: null },
  { name: 'Agile/Scrum', score: 83, tasks: 1, badge: null },
];

const GPP_TOOLS = [
  { name: 'Pandas', score: 99, tasks: 4, icon: 'SiPandas' },
  { name: 'Jupyter', score: 99, tasks: 3, icon: 'SiJupyter' },
  { name: 'Seaborn', score: 99, tasks: 3, icon: 'SiPython' },
  { name: 'OpenZeppelin', score: 98, tasks: 3, icon: 'SiOpenzeppelin' },
  { name: 'Ethers.js', score: 95, tasks: 11, icon: 'SiEthereum', mostPracticed: true },
  { name: 'Solidity', score: 95, tasks: 11, icon: 'SiSolidity', mostPracticed: true },
  { name: 'Scikit-Learn', score: 95, tasks: 5, icon: 'SiScikitlearn' },
  { name: 'TensorFlow', score: 94, tasks: 6, icon: 'SiTensorflow' },
  { name: 'PyTorch', score: 93, tasks: 4, icon: 'SiPytorch' },
  { name: 'FastAPI', score: 92, tasks: 3, icon: 'SiFastapi' },
  { name: 'Docker', score: 91, tasks: 5, icon: 'SiDocker' },
  { name: 'MLflow', score: 90, tasks: 3, icon: 'SiMlflow' },
  { name: 'Flask', score: 89, tasks: 3, icon: 'SiFlask' },
  { name: 'PostgreSQL', score: 88, tasks: 2, icon: 'SiPostgresql' },
  { name: 'Redis', score: 87, tasks: 2, icon: 'SiRedis' },
  { name: 'React', score: 86, tasks: 2, icon: 'SiReact' },
  { name: 'Next.js', score: 85, tasks: 2, icon: 'SiNextdotjs' },
  { name: 'Git', score: 90, tasks: 4, icon: 'SiGit' },
  { name: 'Hardhat', score: 88, tasks: 3, icon: 'SiEthereum' },
  { name: 'Prometheus', score: 82, tasks: 2, icon: 'SiPrometheus' },
];

const DOMAINS = [
  { name: 'Data Science', score: 97, color: '#00D4FF' },
  { name: 'Blockchain', score: 95, color: '#00FF88' },
  { name: 'Machine Learning', score: 95, color: '#00D4FF' },
  { name: 'Backend Dev', score: 90, color: '#FFB347' },
  { name: 'Data Engineering', score: 90, color: '#FFB347' },
  { name: 'DevOps', score: 79, color: '#FF4488' },
];

const CLUSTERS = [
  {
    avg: 97, color: '#FF4444', label: 'AI Security',
    tags: ['AI Security', 'API Security', 'Input/Output Sanitization', 'LLM Security', 'Logging & Monitoring', 'Prompt Injection Detection'],
  },
  {
    avg: 88, color: '#00FF88', label: 'Smart Contracts',
    tags: ['Dockerization', 'Ethereum', 'Gas Optimization', 'Git', 'Smart Contract Development'],
  },
  {
    avg: 86, color: '#00D4FF', label: 'NLP Engineering',
    tags: ['CLI Development', 'Cosine Similarity', 'Error Handling & Logging', 'Information Retrieval', 'Modular Code Architecture', 'NLP'],
  },
  {
    avg: 62, color: '#FFB347', label: 'DevOps & Backend',
    tags: ['Cron Jobs', 'Docker', 'Linux Automation', 'Backend Development', 'Blockchain'],
  },
];

function ScoreBadge({ score }: { score: number }) {
  if (score >= 100) return <span title="Perfect Score" className="text-amber-400">👑</span>;
  if (score >= 95) return <span title="Elite Level" className="text-yellow-400">⭐</span>;
  if (score >= 90) return <span title="Advanced" className="text-xs text-accent-cyan font-code opacity-60">ADV</span>;
  return null;
}

function SkillBar({ name, score, tasks, badge, delay = 0 }: { name: string; score: number; tasks: number; badge?: string | null; delay?: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 py-2 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.05, duration: 0.4 }}
    >
      <div className="flex items-center gap-2 w-48 min-w-[11rem] shrink-0">
        {badge && <span className="text-sm">{badge}</span>}
        <span className="text-sm text-text-primary font-medium truncate">{name}</span>
      </div>
      <div className="flex-1 h-2 bg-bg-primary/80 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-purple-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay * 0.05 + 0.2, duration: 1, ease: 'easeOut' }}
        />
      </div>
      <span className="text-sm font-code font-bold text-accent-cyan w-10 text-right">{score}%</span>
      <span className="text-xs text-text-secondary font-code w-14 text-right hidden sm:block">{tasks} tasks</span>
    </motion.div>
  );
}

function RadarChart({ domains }: { domains: typeof DOMAINS }) {
  const cx = 150, cy = 150, r = 110;
  const n = domains.length;
  const points = domains.map((d, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const dist = (d.score / 100) * r;
    return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
  });
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
      {/* Grid rings */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={Array.from({ length: n }, (_, i) => {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
            const dist = (level / 100) * r;
            return `${cx + Math.cos(angle) * dist},${cy + Math.sin(angle) * dist}`;
          }).join(' ')}
          fill="none"
          stroke="rgba(0,212,255,0.08)"
          strokeWidth="1"
        />
      ))}
      {/* Axis lines */}
      {domains.map((_, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        return (
          <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle) * r} y2={cy + Math.sin(angle) * r}
            stroke="rgba(0,212,255,0.1)" strokeWidth="1" />
        );
      })}
      {/* Data polygon */}
      <motion.polygon
        points={polygonPoints}
        fill="rgba(0,212,255,0.15)"
        stroke="#00D4FF"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      {/* Data points + labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill={domains[i].color} />
          <text
            x={cx + Math.cos((Math.PI * 2 * i) / n - Math.PI / 2) * (r + 20)}
            y={cy + Math.sin((Math.PI * 2 * i) / n - Math.PI / 2) * (r + 20)}
            textAnchor="middle" dominantBaseline="middle"
            fill="#D0D0E8" fontSize="9" fontFamily="JetBrains Mono, monospace"
          >
            {domains[i].name}
          </text>
        </g>
      ))}
    </svg>
  );
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllTools, setShowAllTools] = useState(false);

  const tabs = [
    { label: 'Skills', icon: Target },
    { label: 'Tools', icon: Zap },
    { label: 'Domains', icon: Award },
    { label: 'Clusters', icon: Shield },
    { label: 'Tech Stack', icon: null },
  ];

  const visibleSkills = showAllSkills ? GPP_SKILLS : GPP_SKILLS.slice(0, 8);
  const visibleTools = showAllTools ? GPP_TOOLS : GPP_TOOLS.slice(0, 8);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="02" subtitle="VERIFIED CAPABILITIES" title="TECH ARSENAL" />

        {/* Partnr GPP Verification Badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <GlowCard className="p-4 md:p-5 border-l-4 border-l-accent-green" glowColor="green">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="text-accent-green text-lg">✅</span>
                <span className="text-sm font-medium text-text-primary">Scores verified by Partnr Global Placement Program</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-code text-text-secondary">
                <span className="px-2 py-0.5 rounded bg-white/5">90 Tools</span>
                <span className="px-2 py-0.5 rounded bg-white/5">91 Skills</span>
                <span className="px-2 py-0.5 rounded bg-white/5">7 Domains</span>
                <span className="px-2 py-0.5 rounded bg-white/5">10 Clusters</span>
                <span className="px-2 py-0.5 rounded bg-accent-amber/10 text-accent-amber">🔥 8-Week Streak</span>
              </div>
              <a
                href="https://app.partnr.network/global-placement-program/dashboard?tab=skills"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs font-medium text-accent-cyan hover:text-white transition-colors flex items-center gap-1 shrink-0"
              >
                View Full Report <ExternalLink size={12} />
              </a>
            </div>
          </GlowCard>
        </motion.div>

        <div className="flex flex-col gap-8">
          {/* Tabs */}
          <div className="flex flex-nowrap gap-1 md:gap-3 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
            {tabs.map((tab, index) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-3 rounded-t-lg transition-all relative whitespace-nowrap shrink-0 ${
                    activeTab === index
                      ? 'text-accent-cyan bg-white/5'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {IconComp && <IconComp size={14} />}
                  <span className="font-code text-xs md:text-sm font-medium">{tab.label}</span>
                  {activeTab === index && (
                    <motion.div
                      layoutId="skillsActiveTab"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-cyan"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="min-h-[450px]">
            <AnimatePresence mode="wait">
              {/* Tab 0: GPP Skills */}
              {activeTab === 0 && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-1">
                    {visibleSkills.map((skill, i) => (
                      <SkillBar key={skill.name} name={skill.name} score={skill.score} tasks={skill.tasks} badge={skill.badge} delay={i} />
                    ))}
                  </div>
                  {GPP_SKILLS.length > 8 && (
                    <button
                      onClick={() => setShowAllSkills(!showAllSkills)}
                      className="mt-4 text-sm font-code text-accent-cyan hover:text-white transition-colors"
                    >
                      {showAllSkills ? 'Show less ↑' : `Show ${GPP_SKILLS.length - 8} more ↓`}
                    </button>
                  )}
                </motion.div>
              )}

              {/* Tab 1: GPP Tools */}
              {activeTab === 1 && (
                <motion.div
                  key="tools"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {visibleTools.map((tool, i) => {
                    const IconComponent = (Icons as Record<string, React.ComponentType<{size: number}>>)[tool.icon];
                    return (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <GlowCard className="p-3 flex items-center gap-3" glowColor="cyan">
                          <div className="p-2 rounded-md bg-accent-cyan/10 text-accent-cyan shrink-0">
                            {IconComponent ? <IconComponent size={18} /> : <Zap size={18} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-text-primary truncate">{tool.name}</span>
                              <ScoreBadge score={tool.score} />
                              {'mostPracticed' in tool && tool.mostPracticed && (
                                <span className="text-[10px] font-code px-1.5 py-0.5 bg-accent-amber/10 text-accent-amber rounded whitespace-nowrap">MOST PRACTICED</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-purple-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${tool.score}%` }}
                                  transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                                />
                              </div>
                              <span className="text-xs font-code text-accent-cyan shrink-0">{tool.score}%</span>
                              <span className="text-xs font-code text-text-secondary shrink-0">{tool.tasks}t</span>
                            </div>
                          </div>
                        </GlowCard>
                      </motion.div>
                    );
                  })}
                  {GPP_TOOLS.length > 8 && (
                    <button
                      onClick={() => setShowAllTools(!showAllTools)}
                      className="col-span-full mt-2 text-sm font-code text-accent-cyan hover:text-white transition-colors text-left"
                    >
                      {showAllTools ? 'Show less ↑' : `Show ${GPP_TOOLS.length - 8} more ↓`}
                    </button>
                  )}
                </motion.div>
              )}

              {/* Tab 2: Domains */}
              {activeTab === 2 && (
                <motion.div
                  key="domains"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col lg:flex-row gap-8 items-center"
                >
                  <div className="w-full lg:w-1/2">
                    <RadarChart domains={DOMAINS} />
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col gap-3">
                    {DOMAINS.map((domain, i) => (
                      <motion.div
                        key={domain.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                        style={{ borderLeftColor: domain.color, borderLeftWidth: '3px' }}
                      >
                        <span className="text-sm text-text-primary font-medium flex-1">{domain.name}</span>
                        <div className="w-28 h-2 bg-bg-primary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: domain.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${domain.score}%` }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-sm font-code font-bold" style={{ color: domain.color }}>{domain.score}%</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Clusters */}
              {activeTab === 3 && (
                <motion.div
                  key="clusters"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {CLUSTERS.map((cluster, i) => (
                    <motion.div
                      key={cluster.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlowCard
                        className="p-5"
                        glowColor={cluster.color === '#FF4444' ? 'cyan' : cluster.color === '#00FF88' ? 'green' : 'cyan'}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="text-2xl font-code font-bold"
                            style={{ color: cluster.color, textShadow: cluster.avg >= 95 ? `0 0 20px ${cluster.color}40` : 'none' }}
                          >
                            {cluster.avg}%
                          </span>
                          <span className="text-xs font-code text-text-secondary">avg</span>
                          <span className="text-sm font-medium text-text-primary ml-auto">{cluster.label} Stack</span>
                        </div>
                        <div className="h-[1px] bg-white/5 mb-4" />
                        <div className="flex flex-wrap gap-2">
                          {cluster.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-code rounded-full border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors cursor-default"
                              title={tag}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Tab 4: Tech Stack (original grid) */}
              {activeTab === 4 && (
                <motion.div
                  key="techstack"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
                >
                  {data.flatMap((cat) => cat.skills).slice(0, 16).map((skill) => {
                    const IconComponent = (Icons as Record<string, React.ComponentType<{size: number}>>)[skill.icon];
                    return (
                      <motion.div key={skill.name} variants={popIn}>
                        <GlowCard className="p-4 flex flex-col gap-3 h-full" glowColor="cyan">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-accent-cyan/10 text-accent-cyan">
                              {IconComponent ? <IconComponent size={22} /> : <div className="w-[22px] h-[22px]" />}
                            </div>
                            <span className="font-medium text-text-primary text-sm">{skill.name}</span>
                          </div>
                          <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden mt-auto">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                              className="h-full rounded-full bg-accent-cyan"
                            />
                          </div>
                        </GlowCard>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="section-divider mt-32" />
    </section>
  );
};

export default Skills;
