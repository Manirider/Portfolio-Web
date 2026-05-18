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

import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import ParticleBackground from './components/ui/ParticleBackground';
import NoiseOverlay from './components/effects/NoiseOverlay';
import PageLoader from './components/ui/PageLoader';

function App() {
  useEffect(() => {
    // Smooth scrolling setup with Lenis
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to content</a>
      <NoiseOverlay />
      <ParticleBackground />
      <CustomCursor />
      <ScrollProgress />
      <PageLoader />

      <Navbar data={portfolioData.personal} />
      
      <main id="main-content" className="relative z-10">
        <Hero data={portfolioData} />
        <About data={portfolioData.about} personal={portfolioData.personal} />
        <Skills data={portfolioData.skills} />
        <Projects data={portfolioData.projects} />
        <Experience data={portfolioData.experience} />
        <Contact data={portfolioData.personal} socials={portfolioData.socials} />
      </main>

      <Footer data={portfolioData.personal} socials={portfolioData.socials} />
    </>
  );
}

export default App;
