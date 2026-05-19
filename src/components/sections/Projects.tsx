import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, GitFork, Star, FolderOpen, AlertTriangle } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { PortfolioData } from '../../types';
import SectionTitle from '../ui/SectionTitle';
import GlowCard from '../ui/GlowCard';
import TechBadge from '../ui/TechBadge';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, popIn } from '../../lib/animations';
import { useGitHubData, GitHubRepo } from '../../hooks/useGitHubData';

interface ProjectsProps {
  data: PortfolioData['projects'];
}

const FEATURED_PROJECTS = [
  {
    id: 'nlp-platform',
    title: 'Multitask NLP Platform',
    categories: ['AI/ML', 'MLOps'],
    impactLine: '⚡ 60% memory reduction · <50ms CPU inference · Int8 ONNX export',
    description: 'Production NLP API with shared DistilBERT encoder serving 3 tasks (Sentiment, NER, QA). Int8 ONNX export with MLflow experiment tracking and Prometheus observability.',
    metrics: [
      { label: 'Latency', value: '<50ms' },
      { label: 'Memory', value: '60% Smaller' },
      { label: 'NLP Tasks', value: '3 Served' },
      { label: 'Optimized', value: 'CPU ONNX' },
    ],
    techStack: ['Python', 'PyTorch', 'FastAPI', 'ONNX', 'MLflow', 'Docker', 'Prometheus', 'DistilBERT'],
    githubUrl: 'https://github.com/Manirider',
    accent: 'cyan' as const,
  },
  {
    id: 'healthcare-prediction',
    title: 'Healthcare Outcome Prediction',
    categories: ['AI/ML', 'Data Science'],
    impactLine: '🏥 0.99 AUC-ROC · 0.92 F1-Score · ~$700K/year savings per 1K patients',
    description: 'End-to-end ML pipeline predicting patient treatment outcomes with MICE imputation, SMOTE balancing, Optuna hyperparameter tuning, and SHAP explainability.',
    metrics: [
      { label: 'AUC-ROC', value: '0.99' },
      { label: 'F1-Score', value: '0.92' },
      { label: 'Savings', value: '$700K/yr' },
      { label: 'Explained', value: 'SHAP' },
    ],
    techStack: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'Optuna', 'SMOTE', 'Streamlit', 'Docker'],
    githubUrl: 'https://github.com/Manirider',
    accent: 'amber' as const,
  },
  {
    id: 'omnichain-bridge',
    title: 'Omnichain Asset Bridge',
    categories: ['Blockchain', 'Web3'],
    impactLine: '⛓️ 2 chains · 28 unit tests · Exactly-once delivery · RBAC',
    description: 'Production-quality two-chain asset bridge implementing Lock/Mint and Burn/Unlock patterns with cross-chain governance, crash recovery, replay protection, and role-based access control.',
    metrics: [
      { label: 'Chains', value: '2 Bridged' },
      { label: 'Tests', value: '28 Pass' },
      { label: 'Attacks', value: '0 Replay' },
      { label: 'Auth', value: 'RBAC' },
    ],
    techStack: ['Solidity', 'Hardhat', 'Ethers.js', 'OpenZeppelin', 'Node.js', 'SQLite', 'Docker'],
    githubUrl: 'https://github.com/Manirider',
    accent: 'green' as const,
  },
  {
    id: 'mlops-platform',
    title: 'End-to-End MLOps Platform',
    categories: ['MLOps', 'DevOps'],
    impactLine: '🚀 52 tests · 50% faster deploys · Full CI/CD · K8s orchestrated',
    description: 'Automated ML training, experiment tracking, versioning, and deployment with Kubernetes and CI/CD pipeline orchestration.',
    metrics: [
      { label: 'Tests', value: '52 Pass' },
      { label: 'Deploy', value: '50% Faster' },
      { label: 'Infra', value: 'Full K8s' },
      { label: 'CI/CD', value: 'GitHub' },
    ],
    techStack: ['Python', 'FastAPI', 'MLflow', 'Kubernetes', 'PostgreSQL', 'Redis', 'Celery'],
    githubUrl: 'https://github.com/Manirider',
    accent: 'cyan' as const,
  },
  {
    id: 'multi-agent-ai',
    title: 'Multi-Agent AI System',
    categories: ['AI', 'LLM'],
    impactLine: '🤖 3 agents collaborating · Groq + Gemini + OpenAI · Deterministic',
    description: 'Multi-agent orchestration with Researcher, Writer, and Critic agents using Groq, Gemini, and OpenAI for collaborative content generation.',
    metrics: [
      { label: 'Agents', value: '3 Active' },
      { label: 'LLM APIs', value: '3 Used' },
      { label: 'Logs', value: 'Structured' },
      { label: 'State', value: 'Shared' },
    ],
    techStack: ['Python', 'Groq', 'Google Gemini', 'OpenAI', 'LangGraph'],
    githubUrl: 'https://github.com/Manirider',
    accent: 'cyan' as const,
  },
  {
    id: 'llm-security',
    title: 'LLM Security Middleware',
    categories: ['AI Security', 'MLOps'],
    impactLine: '🛡️ 90%+ attack detection · <5% false positives · Defense-in-depth',
    description: 'Defense-in-depth middleware protecting LLMs from prompt injection, jailbreaks, and data leakage with multi-layer security architecture.',
    metrics: [
      { label: 'Detection', value: '90%+' },
      { label: 'FP Rate', value: '<5%' },
      { label: 'Injection', value: 'Blocked' },
      { label: 'Jailbreak', value: 'Guarded' },
    ],
    techStack: ['Python', 'Flask', 'NLP', 'Security Middleware'],
    githubUrl: 'https://github.com/Manirider',
    accent: 'green' as const,
  },
];

const LANG_COLORS: Record<string, string> = {
  Python: '#3776AB', TypeScript: '#3178C6', JavaScript: '#F7DF1E',
  Solidity: '#AA6746', Java: '#B07219', HTML: '#E34C26',
  CSS: '#563D7C', 'Jupyter Notebook': '#F37626',
};

function LanguageBar({ languages }: { languages: { name: string; count: number; color: string }[] }) {
  const total = languages.reduce((s, l) => s + l.count, 0);
  return (
    <div className="flex h-2 rounded-full overflow-hidden bg-bg-primary w-full max-w-xs">
      {languages.map((lang) => (
        <div
          key={lang.name}
          className="h-full"
          style={{ width: `${(lang.count / total) * 100}%`, backgroundColor: lang.color }}
          title={`${lang.name}: ${lang.count} repos`}
        />
      ))}
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? LANG_COLORS[repo.language] || '#8888AA' : '#8888AA';
  const updated = new Date(repo.pushed_at);
  const daysAgo = Math.floor((Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24));
  const timeLabel = daysAgo === 0 ? 'today' : daysAgo === 1 ? 'yesterday' : `${daysAgo}d ago`;

  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <GlowCard className="p-5 flex flex-col h-full group cursor-pointer" glowColor="cyan">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 text-accent-cyan opacity-80">
            <FolderOpen size={18} />
            <span className="font-code text-sm font-medium group-hover:text-white transition-colors truncate">{repo.name}</span>
          </div>
          <ExternalLink size={14} className="text-text-muted shrink-0 group-hover:text-accent-cyan transition-colors" />
        </div>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1 line-clamp-2">
          {repo.description || 'No description provided.'}
        </p>
        <div className="flex items-center gap-4 text-xs text-text-secondary font-code mt-auto">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1"><Star size={12} />{repo.stargazers_count}</span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1"><GitFork size={12} />{repo.forks_count}</span>
          )}
          <span className="ml-auto">{timeLabel}</span>
        </div>
      </GlowCard>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card p-5 flex flex-col gap-3 animate-pulse">
      <div className="h-4 w-1/2 bg-white/5 rounded" />
      <div className="h-3 w-full bg-white/5 rounded" />
      <div className="h-3 w-3/4 bg-white/5 rounded" />
      <div className="mt-auto flex gap-4">
        <div className="h-3 w-12 bg-white/5 rounded" />
        <div className="h-3 w-8 bg-white/5 rounded" />
      </div>
    </div>
  );
}

const Projects: React.FC<ProjectsProps> = () => {
  const { repos, stats, loading, apiError } = useGitHubData();
  const [searchQuery, setSearchQuery] = useState('');
  const [langFilter, setLangFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'stars' | 'name' | 'size'>('latest');
  const [showCount, setShowCount] = useState(12);

  const langTabs = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter(Boolean));
    return ['All', ...Array.from(langs).slice(0, 5)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let result = [...repos];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((r) =>
        r.name.toLowerCase().includes(q) || (r.description && r.description.toLowerCase().includes(q))
      );
    }
    if (langFilter !== 'All') {
      result = result.filter((r) => r.language === langFilter);
    }
    switch (sortBy) {
      case 'stars': result.sort((a, b) => b.stargazers_count - a.stargazers_count); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'size': result.sort((a, b) => b.size - a.size); break;
      default: result.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
    }
    return result;
  }, [repos, searchQuery, langFilter, sortBy]);

  const visibleRepos = filteredRepos.slice(0, showCount);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <SectionTitle number="03" subtitle="WHAT I'VE BUILT" title="PROJECTS" />

        {/* GitHub Live Stats Strip */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <GlowCard className="p-4 md:p-5" glowColor="cyan">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <SiGithub size={18} className="text-text-primary" />
                <span className="font-code text-sm text-text-primary font-medium">GitHub</span>
              </div>
              {loading ? (
                <div className="flex gap-4 flex-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-5 w-20 bg-white/5 rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  <span className="text-xs font-code px-2 py-0.5 rounded bg-white/5 text-text-secondary">
                    📁 {stats.totalRepos} Repos
                  </span>
                  <span className="text-xs font-code px-2 py-0.5 rounded bg-white/5 text-text-secondary">
                    ⭐ {stats.totalStars} Stars
                  </span>
                  <span className="text-xs font-code px-2 py-0.5 rounded bg-white/5 text-text-secondary">
                    🔀 {stats.totalForks} Forks
                  </span>
                  <span className="text-xs font-code px-2 py-0.5 rounded bg-white/5 text-text-secondary">
                    💻 171+ Commits
                  </span>
                  <div className="ml-auto hidden md:flex items-center gap-3">
                    <LanguageBar languages={stats.topLanguages} />
                  </div>
                </>
              )}
              {apiError && (
                <span className="flex items-center gap-1 text-xs text-accent-amber">
                  <AlertTriangle size={12} /> Cached data
                </span>
              )}
            </div>
          </GlowCard>
        </motion.div>

        {/* Featured Projects */}
        <div className="flex flex-col gap-20 mb-24">
          {FEATURED_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            const accentTextColor =
              project.accent === 'cyan' ? 'text-accent-cyan' :
              project.accent === 'amber' ? 'text-accent-amber' :
              'text-accent-green';
            const accentBadge =
              project.accent === 'cyan' ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30' :
              project.accent === 'amber' ? 'text-accent-amber bg-accent-amber/10 border-accent-amber/30' :
              'text-accent-green bg-accent-green/10 border-accent-green/30';

            return (
              <div key={project.id} className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
                {/* Visual card */}
                <motion.div
                  className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                >
                  <GlowCard className="aspect-[4/3] w-full flex flex-col items-center justify-center p-6 relative overflow-hidden" glowColor={project.accent}>
                    <div className="absolute inset-0 bg-bg-secondary opacity-50" />
                    <div className={`text-5xl md:text-6xl font-display font-bold opacity-15 ${accentTextColor} relative z-10`}>
                      {project.title.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4 relative z-10 w-full max-w-[240px]">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <span className={`font-code text-sm font-bold ${accentTextColor}`}>{m.value}</span>
                          <span className="block text-[10px] text-text-secondary uppercase tracking-wider">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>

                {/* Content */}
                <motion.div
                  className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  variants={isEven ? slideInRight : slideInLeft}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.categories.map((cat) => (
                      <span key={cat} className={`px-2.5 py-0.5 text-[10px] font-code font-bold rounded-full border ${accentBadge}`}>{cat}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-2">{project.title}</h3>
                  <p className={`font-code text-sm mb-4 ${accentTextColor}`}>{project.impactLine}</p>
                  <GlowCard className="p-5 mb-5" glowColor={project.accent}>
                    <p className="text-text-secondary leading-relaxed text-sm">{project.description}</p>
                  </GlowCard>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-white transition-colors"
                  >
                    <SiGithub size={16} /> View on GitHub →
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* All GitHub Repos */}
        <div className="mt-16">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h3 className="text-xl font-display font-bold text-text-primary">
              All {stats.totalRepos} Repositories
            </h3>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search repos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white/[0.03] border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan/30 transition-colors"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'stars' | 'name' | 'size')}
                className="px-3 py-2 text-xs font-code bg-white/[0.03] border border-white/10 rounded-lg text-text-secondary focus:outline-none focus:border-accent-cyan/30"
              >
                <option value="latest">Latest</option>
                <option value="stars">Stars</option>
                <option value="name">A-Z</option>
                <option value="size">Size</option>
              </select>
            </div>
          </motion.div>

          {/* Language filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(langTabs.length > 1 ? langTabs : ['All']).map((lang) => (
              <button
                key={lang}
                onClick={() => setLangFilter(lang || 'All')}
                className={`px-3 py-1.5 rounded-full text-xs font-code font-medium transition-all ${
                  langFilter === lang
                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30'
                    : 'bg-transparent text-text-muted border border-white/5 hover:text-text-primary hover:border-white/20'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Repo Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${langFilter}-${sortBy}-${searchQuery}`}
                  variants={staggerContainer}
                  initial="hidden" animate="visible" exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {visibleRepos.length > 0 ? (
                    visibleRepos.map((repo) => (
                      <motion.div key={repo.id} variants={popIn}>
                        <RepoCard repo={repo} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 text-text-secondary font-code text-sm">
                      No repos match your filters.{' '}
                      <button onClick={() => { setSearchQuery(''); setLangFilter('All'); }} className="text-accent-cyan hover:text-white">
                        Clear filters →
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {filteredRepos.length > showCount && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowCount((c) => c + 12)}
                    className="px-6 py-2.5 text-sm font-code text-accent-cyan border border-accent-cyan/30 rounded-lg hover:bg-accent-cyan/10 transition-colors"
                  >
                    Load {Math.min(12, filteredRepos.length - showCount)} more →
                  </button>
                </div>
              )}
            </>
          )}

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <a
              href="https://github.com/Manirider?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-accent-cyan border border-accent-cyan/30 rounded-lg hover:bg-accent-cyan/10 transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
            >
              <SiGithub size={16} />
              View all {stats.totalRepos} repositories on GitHub →
            </a>
          </div>
        </div>
      </div>
      <div className="section-divider mt-32" />
    </section>
  );
};

export default Projects;
