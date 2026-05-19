import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlowOrbProps {
  color?: string;
  radius?: number;
  position?: [number, number, number];
  intensity?: number;
  pulseSpeed?: number;
}

export default function GlowOrb({
  color = '#00D4FF',
  radius = 0.8,
  position = [0, 0, 0],
  intensity = 3,
  pulseSpeed = 1.2,
}: GlowOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * pulseSpeed) * 0.12;
    if (meshRef.current) meshRef.current.scale.setScalar(pulse);
    if (matRef.current) matRef.current.emissiveIntensity = intensity + Math.sin(t * pulseSpeed * 1.3) * (intensity * 0.2);
  });

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: intensity,
    transparent: true,
    opacity: 0.9,
  }), [color, intensity]);

  const outerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: intensity * 0.3,
    transparent: true,
    opacity: 0.06,
  }), [color, intensity]);

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 20, 20]} />
        <primitive object={mat} ref={matRef} attach="material" />
      </mesh>
      <mesh scale={3.5}>
        <sphereGeometry args={[radius, 16, 16]} />
        <primitive object={outerMat} attach="material" />
      </mesh>
    </group>
  );
}
