import { useEffect } from 'react';
import Lenis from 'lenis';
import { portfolioData } from './data/portfolioData';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Entrepreneur from './components/sections/Entrepreneur';

import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import NoiseOverlay from './components/effects/NoiseOverlay';
import PageLoader from './components/ui/PageLoader';
import MainCanvas from './3d/MainCanvas';

import { useSceneStore, SECTION_NAMES } from './store/sceneStore';

function App() {
  const { setSection, setScrollProgress, setMousePosition } = useSceneStore();

  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse tracking for 3D parallax
    const handleMouse = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // Intersection Observer for section detection
    const observers: IntersectionObserver[] = [];
    SECTION_NAMES.forEach((sectionId, index) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSection(index);
            }
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [setSection, setScrollProgress, setMousePosition]);

  return (
    <>
      {/* 3D WebGL Layer — fixed behind everything */}
      <MainCanvas />

      {/* HTML overlay */}
      <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        <a href="#main-content" className="skip-nav">Skip to content</a>
        <NoiseOverlay />
        <CustomCursor />
        <ScrollProgress />
        <PageLoader />

        <Navbar data={portfolioData.personal} />

        <main id="main-content" className="relative">
          <Hero data={portfolioData} />
          <About data={portfolioData.about} personal={portfolioData.personal} />
          <Skills data={portfolioData.skills} />
          <Projects data={portfolioData.projects} />
          <Entrepreneur />
          <Experience data={portfolioData.experience} />
          <Contact data={portfolioData.personal} socials={portfolioData.socials} />
        </main>

        <Footer data={portfolioData.personal} socials={portfolioData.socials} />
      </div>
    </>
  );
}

export default App;
