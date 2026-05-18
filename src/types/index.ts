export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface ProjectMetrics {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  impact: string;
  description: string;
  metrics: ProjectMetrics[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  colorAccent: 'cyan' | 'amber' | 'green';
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  type: 'INTERNSHIP' | 'EDUCATION' | 'FULL-TIME';
  highlights: string[];
  techStack: string[];
  badgeColor: 'cyan' | 'amber' | 'green' | 'purple';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    middleName: string;
    lastName: string;
    roles: string[];
    tagline: string;
    email: string;
    phone: string;
    location: string;
    resumeUrl: string;
  };
  stats: {
    label: string;
    value: string | number;
    prefix?: string;
    suffix?: string;
  }[];
  about: {
    paragraphs: string[];
    currentlyBuilding: string;
    learning: string;
    openTo: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  socials: SocialLink[];
}
