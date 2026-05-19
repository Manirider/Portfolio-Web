import { create } from 'zustand';

interface MousePosition {
  x: number;
  y: number;
}

interface SceneStore {
  currentSection: number;
  scrollProgress: number;
  sectionProgress: number;
  mousePosition: MousePosition;
  isLoaded: boolean;
  setSection: (n: number) => void;
  setScrollProgress: (p: number) => void;
  setSectionProgress: (p: number) => void;
  setMousePosition: (pos: MousePosition) => void;
  setLoaded: (v: boolean) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentSection: 0,
  scrollProgress: 0,
  sectionProgress: 0,
  mousePosition: { x: 0, y: 0 },
  isLoaded: false,
  setSection: (n) => set({ currentSection: n }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setSectionProgress: (p) => set({ sectionProgress: p }),
  setMousePosition: (pos) => set({ mousePosition: pos }),
  setLoaded: (v) => set({ isLoaded: v }),
}));

export const SECTION_COLORS = [
  '#00D4FF', // Hero: cyan
  '#FFB347', // About: amber
  '#00FF88', // Skills: green
  '#0088FF', // Projects: blue
  '#FFB347', // Venture: amber
  '#8844FF', // Experience: purple
  '#FF44AA', // Contact: pink-cyan
];

export const SECTION_NAMES = ['home', 'about', 'skills', 'projects', 'venture', 'experience', 'contact'];
