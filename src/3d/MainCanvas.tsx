import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Grid, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import ParticleField from './components/ParticleField';
import NeuralGlobe from './components/NeuralGlobe';
import DNAHelix from './components/DNAHelix';
import FloatingGeometry from './components/FloatingGeometry';
import WarpTunnel from './components/WarpTunnel';
import WormholePortal from './components/WormholePortal';
import GlowOrb from './components/GlowOrb';
import { useSceneStore } from '../store/sceneStore';

function SceneContent() {
  const { scene, camera } = useThree();
  const currentSection = useSceneStore((s) => s.currentSection);
  const camTargetRef = useRef({ x: 0, y: 0, z: 8 });
  const fogRef = useRef<THREE.FogExp2 | null>(null);
  const mouse = useSceneStore((s) => s.mousePosition);

  useEffect(() => {
    const fog = new THREE.FogExp2('#050508', 0.012);
    scene.fog = fog;
    fogRef.current = fog;
    return () => { scene.fog = null; };
  }, [scene]);

  useEffect(() => {
    switch (currentSection) {
      case 0: camTargetRef.current = { x: 0, y: 0, z: 8 }; break;
      case 1: camTargetRef.current = { x: 0.5, y: 1, z: 7.5 }; break;
      case 2: camTargetRef.current = { x: 0, y: 0, z: 11 }; break;
      case 3: camTargetRef.current = { x: 1.5, y: 2, z: 10 }; break;
      case 4: camTargetRef.current = { x: 0.8, y: 0.5, z: 9 }; break;
      case 5: camTargetRef.current = { x: 0, y: 0, z: 6 }; break;
      case 6: camTargetRef.current = { x: 0, y: 0, z: 9 }; break;
      default: camTargetRef.current = { x: 0, y: 0, z: 8 };
    }
  }, [currentSection]);

  useFrame((_, delta) => {
    const t = camTargetRef.current;
    (camera as THREE.PerspectiveCamera).position.x +=
      (t.x + mouse.x * 0.4 - (camera as THREE.PerspectiveCamera).position.x) * delta * 1.8;
    (camera as THREE.PerspectiveCamera).position.y +=
      (t.y + mouse.y * 0.25 - (camera as THREE.PerspectiveCamera).position.y) * delta * 1.8;
    (camera as THREE.PerspectiveCamera).position.z +=
      (t.z - (camera as THREE.PerspectiveCamera).position.z) * delta * 1.8;
    (camera as THREE.PerspectiveCamera).lookAt(0, 0, 0);
  });

  const isHero = currentSection === 0;
  const isAbout = currentSection === 1;
  const isSkills = currentSection === 2;
  const isProjects = currentSection === 3;
  const isVenture = currentSection === 4;
  const isExperience = currentSection === 5;
  const isContact = currentSection === 6;

  return (
    <>
      {/* Ambient & directional lights */}
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 0, 5]} color="#00D4FF" intensity={3} distance={22} />
      <pointLight position={[-5, -3, 2]} color="#FFB347" intensity={1.8} distance={18} />
      <pointLight position={[5, 5, 0]} color="#ffffff" intensity={0.4} distance={20} />

      {/* Always-on particle field */}
      <ParticleField />

      {/* Holographic grid */}
      <Grid
        position={[0, -4.2, 0]}
        args={[80, 80]}
        cellSize={1}
        cellThickness={0.4}
        cellColor="#00D4FF"
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor="#003366"
        fadeDistance={38}
        fadeStrength={4}
        followCamera={false}
        infiniteGrid
      />

      {/* Hero: Neural Globe */}
      <NeuralGlobe
        visible={isHero || isAbout}
        scale={isHero ? 1 : 0.28}
        position={isAbout ? [-5, 2.5, 0] : [2, 0, 0]}
      />

      {/* About: DNA Helix */}
      {isAbout && <DNAHelix />}

      {/* Skills: Floating polyhedra */}
      <FloatingGeometry visible={isSkills || isProjects} />

      {/* Experience: Warp Tunnel */}
      <WarpTunnel visible={isExperience} />

      {/* Contact: Wormhole + glow orb */}
      <WormholePortal visible={isContact} />
      {isContact && (
        <GlowOrb color="#FF44AA" radius={0.6} position={[0, 0, 0]} intensity={4} pulseSpeed={1.5} />
      )}

      {/* Section accent orbs */}
      {isHero && <GlowOrb color="#00D4FF" radius={0.2} position={[-6, -2, -2]} intensity={2} />}
      {isAbout && <GlowOrb color="#FFB347" radius={0.15} position={[5, -3, -1]} intensity={2} />}
      {isSkills && <GlowOrb color="#00FF88" radius={0.18} position={[0, -3.5, -1]} intensity={2.5} />}
      {isProjects && <GlowOrb color="#0088FF" radius={0.18} position={[-6, 1, -2]} intensity={2} />}
      {isVenture && <GlowOrb color="#FFB347" radius={0.25} position={[3, -1, -2]} intensity={3} />}

      {/* Post-processing */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.45}
          luminanceSmoothing={0.9}
          radius={0.85}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0007, 0.0007)}
          radialModulation
          modulationOffset={0.45}
        />
        <Vignette eskil={false} offset={0.12} darkness={0.85} />
        <Noise opacity={0.025} blendFunction={BlendFunction.ADD} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}

export default function MainCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      camera={{ fov: 60, near: 0.1, far: 200, position: [0, 0, 8] }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      dpr={[1, 1.5]}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
