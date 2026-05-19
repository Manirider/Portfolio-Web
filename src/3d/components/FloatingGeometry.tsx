import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShapeConfig {
  geo: 'icosahedron' | 'octahedron' | 'dodecahedron' | 'box' | 'tetrahedron';
  args: number[];
  color: string;
  position: [number, number, number];
  baseY: number;
  rotSpeed: [number, number, number];
}

const SHAPES: ShapeConfig[] = [
  { geo: 'icosahedron', args: [1.4, 1], color: '#00D4FF', position: [-5.5, 1, -4], baseY: 1, rotSpeed: [0.004, 0.006, 0.001] },
  { geo: 'octahedron', args: [1.2], color: '#00FF88', position: [5.5, -1, -3], baseY: -1, rotSpeed: [0.003, 0.007, 0.002] },
  { geo: 'dodecahedron', args: [1.2], color: '#FFB347', position: [2.5, 2.5, -5.5], baseY: 2.5, rotSpeed: [0.005, 0.004, 0.003] },
  { geo: 'box', args: [1.4, 1.4, 1.4], color: '#0088FF', position: [-3.5, -2.5, -4.5], baseY: -2.5, rotSpeed: [0.006, 0.005, 0.002] },
  { geo: 'tetrahedron', args: [1.3], color: '#FF44AA', position: [0, 3.5, -6], baseY: 3.5, rotSpeed: [0.004, 0.008, 0.001] },
];

function createGeo(shape: ShapeConfig): THREE.BufferGeometry {
  switch (shape.geo) {
    case 'icosahedron': return new THREE.IcosahedronGeometry(...(shape.args as [number, number]));
    case 'octahedron': return new THREE.OctahedronGeometry(...(shape.args as [number]));
    case 'dodecahedron': return new THREE.DodecahedronGeometry(...(shape.args as [number]));
    case 'box': return new THREE.BoxGeometry(...(shape.args as [number, number, number]));
    case 'tetrahedron': return new THREE.TetrahedronGeometry(...(shape.args as [number]));
    default: return new THREE.SphereGeometry(1, 12, 12);
  }
}

function FloatingShape({ config, index }: { config: ShapeConfig; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const solidRef = useRef<THREE.Mesh>(null!);

  const geo = useMemo(() => createGeo(config), [config]);
  const wireMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: config.color,
    emissive: config.color,
    emissiveIntensity: 0.6,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  }), [config.color]);
  const solidMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: config.color,
    emissive: config.color,
    emissiveIntensity: 0.1,
    transparent: true,
    opacity: 0.06,
  }), [config.color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += config.rotSpeed[0];
    meshRef.current.rotation.y += config.rotSpeed[1];
    meshRef.current.rotation.z += config.rotSpeed[2];
    meshRef.current.position.y = Math.sin(t * 0.5 + index * 1.2) * 0.3 + config.baseY;
    if (solidRef.current) {
      solidRef.current.rotation.copy(meshRef.current.rotation);
      solidRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={config.position} geometry={geo} material={wireMat} />
      <mesh ref={solidRef} position={config.position} scale={1.02} geometry={geo} material={solidMat} />
    </>
  );
}

export default function FloatingGeometry({ visible = true }: { visible?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = visible ? 1 : 0;
    groupRef.current.scale.x += (target - groupRef.current.scale.x) * delta * 1.5;
    groupRef.current.scale.y += (target - groupRef.current.scale.y) * delta * 1.5;
    groupRef.current.scale.z += (target - groupRef.current.scale.z) * delta * 1.5;
  });

  return (
    <group ref={groupRef}>
      {SHAPES.map((shape, i) => (
        <FloatingShape key={i} config={shape} index={i} />
      ))}
    </group>
  );
}
