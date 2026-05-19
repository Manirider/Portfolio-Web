import React from 'react';
import { ArrowUp } from 'lucide-react';
import * as Icons from 'react-icons/si';
import { PortfolioData } from '../../types';

interface FooterProps {
  data: PortfolioData['personal'];
  socials: PortfolioData['socials'];
}

const Footer: React.FC<FooterProps> = ({ data, socials }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-bg-secondary pt-16 pb-8 border-t border-white/5">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent-cyan/20 via-accent-amber/20 to-accent-cyan/20" />
      
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold text-text-primary mb-2">
              {data.name}
            </h3>
            <p className="text-sm text-text-secondary">
              Building the future, one block at a time.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Built with React + Framer Motion<br />
              Deployed on Vercel
            </p>
          </div>
          
          <div className="flex gap-4">
            {socials.map((social) => {
              const IconComponent = (Icons as any)[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-bg-card border border-white/5 flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-all hover:-translate-y-1"
                  aria-label={social.name}
                >
                  {IconComponent && <IconComponent size={18} />}
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-text-secondary">
          <p>© {currentYear} {data.name}. All rights reserved.</p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 hover:text-accent-cyan transition-colors group"
          >
            Back to top
            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan transition-colors">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
