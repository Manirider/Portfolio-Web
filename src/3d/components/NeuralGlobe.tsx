import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralGlobeProps {
  visible?: boolean;
  scale?: number;
  position?: [number, number, number];
}

function fibonacciSphere(samples: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius));
  }
  return points;
}

export default function NeuralGlobe({ visible = true, scale = 1, position = [0, 0, 0] }: NeuralGlobeProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const instancedRef = useRef<THREE.InstancedMesh>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);
  const clock = useRef({ time: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const NODE_COUNT = 180;
  const CONNECT_DIST = 0.45;

  const { nodePoints, linePositions } = useMemo(() => {
    const pts = fibonacciSphere(NODE_COUNT).map(p => p.multiplyScalar(2.2));
    const lines: number[] = [];
    let count = 0;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT_DIST * 2.2 && count < 600) {
          lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          count++;
        }
      }
    }
    return { nodePoints: pts, linePositions: new Float32Array(lines), lineCount: count };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nodeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00D4FF'),
    emissive: new THREE.Color('#00D4FF'),
    emissiveIntensity: 2.2,
    roughness: 0.1,
    metalness: 0.8,
  }), []);
  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.028, 6, 6), []);

  useEffect(() => {
    if (!instancedRef.current) return;
    nodePoints.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [nodePoints, dummy]);

  useEffect(() => {
    return () => {
      nodeMaterial.dispose();
      nodeGeo.dispose();
    };
  }, [nodeMaterial, nodeGeo]);

  useFrame((_, delta) => {
    clock.current.time += delta;
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x += delta * 0.03;
    groupRef.current.position.x += (mouse.current.x * 0.4 - groupRef.current.position.x) * 0.04;
    groupRef.current.position.y += (mouse.current.y * 0.25 - groupRef.current.position.y) * 0.04;
    const targetScale = visible ? scale : 0;
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.05;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.05;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.05;
    if (linesRef.current) {
      (linesRef.current.material as THREE.LineBasicMaterial).opacity =
        0.12 + Math.sin(clock.current.time * 0.8) * 0.04;
    }
    if (pulseRef.current) {
      const s = 1 + Math.sin(clock.current.time * 1.5) * 0.06;
      pulseRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Instanced nodes */}
      <instancedMesh ref={instancedRef} args={[nodeGeo, nodeMaterial, NODE_COUNT]} />

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00D4FF" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Outer torus ring */}
      <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.015, 8, 120]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={3}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 100]} />
        <meshStandardMaterial
          color="#FFB347"
          emissive="#FFB347"
          emissiveIntensity={2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}
