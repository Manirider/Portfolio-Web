import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    vUv = uv;
    float angle = position.z * 1.8 + uTime * 0.4;
    float x = position.x * cos(angle) - position.y * sin(angle);
    float y = position.x * sin(angle) + position.y * cos(angle);
    vDistortion = length(position.xy);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, position.z, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float dist = length(vUv - 0.5);
    float spiral = fract(angle / (3.14159 * 2.0) + dist * 4.5 - uTime * 0.4);
    vec3 color = mix(uColor1, uColor2, spiral);
    float alpha = smoothstep(0.52, 0.18, dist) * 0.88;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function WormholePortal({ visible = false }: { visible?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#00D4FF') },
    uColor2: { value: new THREE.Color('#FF44AA') },
  }), []);

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta * 0.8;
    }
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.08;
      const target = visible ? 1 : 0;
      meshRef.current.scale.x += (target - meshRef.current.scale.x) * delta * 1.5;
      meshRef.current.scale.y += (target - meshRef.current.scale.y) * delta * 1.5;
      meshRef.current.scale.z += (target - meshRef.current.scale.z) * delta * 1.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={0}>
      <cylinderGeometry args={[7, 7, 14, 64, 32, true]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
