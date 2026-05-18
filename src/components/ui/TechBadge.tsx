import React from 'react';
import * as Icons from 'react-icons/si';

interface TechBadgeProps {
  name: string;
  icon?: string;
  className?: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name, icon, className = '' }) => {
  const IconComponent = icon ? (Icons as any)[icon] : null;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-code font-medium text-text-secondary bg-bg-primary/50 border border-white/10 rounded-full hover:border-accent-cyan/30 hover:text-accent-cyan transition-colors ${className}`}>
      {IconComponent && <IconComponent size={12} />}
      {name}
    </span>
  );
};

export default TechBadge;
