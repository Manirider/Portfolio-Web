import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STREAK_COUNT = 1800;

export default function WarpTunnel({ visible = false }: { visible?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const matRef = useRef<THREE.LineBasicMaterial>(null!);
  const progressRef = useRef(0);

  const { positions } = useMemo(() => {
    const pos = new Float32Array(STREAK_COUNT * 6);
    for (let i = 0; i < STREAK_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r1 = 0.3 + Math.random() * 0.3;
      const r2 = 22 + Math.random() * 8;
      const sx = Math.sin(phi) * Math.cos(theta);
      const sy = Math.sin(phi) * Math.sin(theta);
      const sz = Math.cos(phi);
      pos[i * 6 + 0] = sx * r1;
      pos[i * 6 + 1] = sy * r1;
      pos[i * 6 + 2] = sz * r1;
      pos[i * 6 + 3] = sx * r2;
      pos[i * 6 + 4] = sy * r2;
      pos[i * 6 + 5] = sz * r2;
    }
    return { positions: pos };
  }, []);

  const waypoints = useMemo(() => [
    { pos: [0, 0, -2], color: '#00D4FF' },
    { pos: [0.5, 0.5, -6], color: '#00FF88' },
    { pos: [-0.3, -0.3, -10], color: '#FFB347' },
    { pos: [0.2, -0.4, -14], color: '#8844FF' },
    { pos: [0, 0.3, -18], color: '#FF44AA' },
  ], []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = visible ? 1 : 0;
    progressRef.current += (target - progressRef.current) * delta * 2;
    groupRef.current.rotation.z += delta * 0.04 * progressRef.current;
    if (matRef.current) {
      matRef.current.opacity = 0.3 * progressRef.current + 0.05;
    }
    const scaleVal = visible ? 1 : 0.001;
    groupRef.current.scale.x += (scaleVal - groupRef.current.scale.x) * delta * 2;
    groupRef.current.scale.y += (scaleVal - groupRef.current.scale.y) * delta * 2;
    groupRef.current.scale.z += (scaleVal - groupRef.current.scale.z) * delta * 2;
  });

  return (
    <group ref={groupRef} scale={0.001}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={matRef}
          color="#00D4FF"
          transparent
          opacity={0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Tunnel tube */}
      <mesh>
        <cylinderGeometry args={[7, 7, 50, 32, 1, true]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.05}
          wireframe
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Waypoint orbs */}
      {waypoints.map((wp, i) => (
        <mesh key={i} position={wp.pos as [number, number, number]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial
            color={wp.color}
            emissive={wp.color}
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}
