'use client';

import { useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const CORAL = '#ff6a55';
const BG = '#0a090a';
const ORBITS = [
  { tilt: [0.35, 0, 0.25], radius: 2.15, speed: 0.42, phase: 0 },
  { tilt: [-0.5, 0, -0.35], radius: 2.5, speed: -0.32, phase: 2.1 },
  { tilt: [1.15, 0, 0.1], radius: 1.85, speed: 0.36, phase: 4.2 },
] as const;

type SceneProps = { active: number; running: boolean; still: boolean; velocity: MutableRefObject<number> };

function Orbit({ index, active, still }: { index: number; active: number; still: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const node = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.MeshBasicMaterial>(null);
  const glow = useRef<THREE.MeshStandardMaterial>(null);
  const { tilt, radius, speed, phase } = ORBITS[index];

  useFrame((_, delta) => {
    if (!spin.current || !node.current || !glow.current || !ring.current) return;
    if (!still) {
      spin.current.rotation.y += delta * speed;
      node.current.rotation.x += delta * 0.9;
      node.current.rotation.y += delta * 0.7;
    }
    const on = active === index;
    node.current.scale.setScalar(THREE.MathUtils.lerp(node.current.scale.x, on ? 1.9 : 1, 0.08));
    glow.current.emissiveIntensity = THREE.MathUtils.lerp(glow.current.emissiveIntensity, on ? 2.6 : 0.8, 0.08);
    ring.current.opacity = THREE.MathUtils.lerp(ring.current.opacity, on ? 0.75 : 0.16, 0.08);
  });

  return (
    <group rotation={tilt as unknown as THREE.Euler}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.007, 8, 220]} />
        <meshBasicMaterial ref={ring} color={CORAL} transparent opacity={0.16} toneMapped={false} />
      </mesh>
      <group ref={spin} rotation={[0, phase, 0]}>
        <mesh ref={node} position={[radius, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial ref={glow} color="#2a1216" emissive={CORAL} emissiveIntensity={0.9} metalness={0.4} roughness={0.3} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Core({ active, still, velocity }: Omit<SceneProps, 'running'>) {
  const rig = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Group>(null);
  const shellEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.5, 0)), []);
  const dust = useMemo(() => {
    const points = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i++) {
      const angle = (i / 240) * Math.PI * 2;
      const r = 3 + (i % 3) * 0.08;
      points.set([Math.cos(angle) * r, Math.sin(i * 12.9) * 0.05, Math.sin(angle) * r], i * 3);
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (!rig.current || !wire.current || !shell.current) return;
    const kick = still ? 0 : Math.abs(velocity.current) * 0.02;
    if (!still) {
      wire.current.rotation.y += delta * (0.28 + kick);
      wire.current.rotation.x += delta * 0.11;
      shell.current.rotation.y -= delta * (0.14 + kick * 0.6);
      shell.current.rotation.z += delta * 0.05;
    }
    // Each service turns the whole system to face the viewer.
    const target = active * ((Math.PI * 2) / 3) + state.pointer.x * 0.35;
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, target, 0.04);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, 0.18 - state.pointer.y * 0.22, 0.05);
  });

  return (
    <group ref={rig}>
      <mesh>
        <icosahedronGeometry args={[0.6, 24]} />
        <MeshDistortMaterial color="#b3202c" emissive="#ff2a3a" emissiveIntensity={0.55} distort={still ? 0 : 0.34} speed={2} roughness={0.18} metalness={0.35} />
      </mesh>
      <pointLight color={CORAL} intensity={18} distance={8} />
      <pointLight position={[2.5, 2, 3]} color="#ffd0c8" intensity={10} distance={9} />
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.08, 1]} />
        <meshBasicMaterial color="#ff9480" wireframe transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <group ref={shell}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial color="#1c0d12" metalness={0.3} roughness={0.15} clearcoat={1} transparent opacity={0.3} flatShading side={THREE.DoubleSide} />
        </mesh>
        <lineSegments geometry={shellEdges}>
          <lineBasicMaterial color={CORAL} transparent opacity={0.7} toneMapped={false} />
        </lineSegments>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ff8a76" size={0.03} transparent opacity={0.7} />
      </points>
      {ORBITS.map((_, index) => <Orbit key={index} index={index} active={active} still={still} />)}
    </group>
  );
}

export default function CoreScene({ active, running, still, velocity }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={running ? 'always' : 'never'}
      camera={{ position: [0, 0.4, 7], fov: 40 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 7, 15]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 5]} intensity={1.2} color="#ffd6cf" />
      <Core active={active} still={still} velocity={velocity} />
      <gridHelper args={[22, 44, '#3a1a1e', '#3a1a1e']} position={[0, -2.4, 0]} />
      <Sparkles count={60} scale={[8, 4.5, 5]} size={2.4} speed={still ? 0 : 0.35} color={CORAL} opacity={0.75} />
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur intensity={0.95} luminanceThreshold={0.42} luminanceSmoothing={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
