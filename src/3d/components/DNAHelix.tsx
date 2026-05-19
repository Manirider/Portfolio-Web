import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null!);

  const createHelixPath = (strand: 'A' | 'B', pts = 100) => {
    const offset = strand === 'B' ? Math.PI : 0;
    return new THREE.CatmullRomCurve3(
      Array.from({ length: pts }, (_, i) => {
        const t = i / pts;
        const angle = t * Math.PI * 7 + offset;
        const r = 1.1;
        return new THREE.Vector3(Math.cos(angle) * r, t * 7 - 3.5, Math.sin(angle) * r);
      })
    );
  };

  const { pathA, pathB, rungPositions } = useMemo(() => {
    const pA = createHelixPath('A');
    const pB = createHelixPath('B');
    const rungs: Array<{ a: THREE.Vector3; b: THREE.Vector3 }> = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      rungs.push({ a: pA.getPoint(t), b: pB.getPoint(t) });
    }
    return { pathA: pA, pathB: pB, rungPositions: rungs };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[3.5, 0, -2]}>
      {/* Strand A - cyan */}
      <mesh>
        <tubeGeometry args={[pathA, 120, 0.045, 8, false]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.8} />
      </mesh>

      {/* Strand B - amber */}
      <mesh>
        <tubeGeometry args={[pathB, 120, 0.045, 8, false]} />
        <meshStandardMaterial color="#FFB347" emissive="#FFB347" emissiveIntensity={1.8} />
      </mesh>

      {/* Rungs */}
      {rungPositions.map((rung, i) => {
        const mid = rung.a.clone().add(rung.b).multiplyScalar(0.5);
        const dir = rung.b.clone().sub(rung.a);
        const len = dir.length();
        const up = new THREE.Vector3(0, 1, 0);
        const quat = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize());
        return (
          <group key={i}>
            <mesh position={mid} quaternion={quat}>
              <cylinderGeometry args={[0.02, 0.02, len, 6]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.25} emissive="#ffffff" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={rung.a}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#00D4FF' : '#00FF88'}
                emissive={i % 2 === 0 ? '#00D4FF' : '#00FF88'}
                emissiveIntensity={2.5}
              />
            </mesh>
            <mesh position={rung.b}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#FFB347' : '#FF6B6B'}
                emissive={i % 2 === 0 ? '#FFB347' : '#FF6B6B'}
                emissiveIntensity={2.5}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
