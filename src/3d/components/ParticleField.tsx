import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore, SECTION_COLORS } from '../../store/sceneStore';

const PARTICLE_COUNT = 2500;

const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  attribute float aRandomness;
  varying float vAlpha;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.x += sin(uTime * 0.3 + aRandomness * 6.28) * 0.12;
    modelPosition.y += cos(uTime * 0.2 + aRandomness * 6.28) * 0.12;
    modelPosition.z += sin(uTime * 0.15 + aRandomness * 3.14) * 0.06;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    gl_PointSize = uSize * (280.0 / -viewPosition.z);
    vAlpha = 1.0 - smoothstep(0.0, 28.0, length(modelPosition.xyz));
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - (dist * 2.0);
    strength = pow(max(strength, 0.0), 3.0);
    gl_FragColor = vec4(uColor, strength * vAlpha * 0.55);
  }
`;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const currentColor = useRef(new THREE.Color(SECTION_COLORS[0]));
  const targetColor = useRef(new THREE.Color(SECTION_COLORS[0]));
  const currentSection = useSceneStore((s) => s.currentSection);

  const { positions, randomness } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const rand = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28;
      rand[i] = Math.random();
    }
    return { positions: pos, randomness: rand };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSize: { value: 2.2 },
    uColor: { value: new THREE.Color(SECTION_COLORS[0]) },
  }), []);

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    const sectionColor = SECTION_COLORS[currentSection] || SECTION_COLORS[0];
    targetColor.current.set(sectionColor);
    currentColor.current.lerp(targetColor.current, delta * 1.2);
    materialRef.current.uniforms.uColor.value.copy(currentColor.current);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          args={[randomness, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
