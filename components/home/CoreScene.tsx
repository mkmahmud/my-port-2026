'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const CORAL = '#ff6a55';
const ORBITS = [
  { tilt: [0.35, 0, 0.25], radius: 2.15, speed: 0.42, phase: 0 },
  { tilt: [-0.5, 0, -0.35], radius: 2.45, speed: -0.32, phase: 2.1 },
  { tilt: [1.15, 0, 0.1], radius: 1.9, speed: 0.36, phase: 4.2 },
] as const;

function Orbit({ index, active, still }: { index: number; active: number; still: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const node = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const { tilt, radius, speed, phase } = ORBITS[index];

  useFrame((_, delta) => {
    if (!spin.current || !node.current || !material.current) return;
    if (!still) {
      spin.current.rotation.y += delta * speed;
      node.current.rotation.x += delta * 0.8;
      node.current.rotation.y += delta * 0.6;
    }
    const on = active === index;
    const scale = THREE.MathUtils.lerp(node.current.scale.x, on ? 1.75 : 1, 0.08);
    node.current.scale.setScalar(scale);
    material.current.emissiveIntensity = THREE.MathUtils.lerp(material.current.emissiveIntensity, on ? 3.2 : 0.7, 0.08);
  });

  return (
    <group rotation={tilt as unknown as THREE.Euler}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 8, 200]} />
        <meshBasicMaterial color={CORAL} transparent opacity={active === index ? 0.6 : 0.22} />
      </mesh>
      <group ref={spin} rotation={[0, phase, 0]}>
        <mesh ref={node} position={[radius, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial ref={material} color="#2a1216" emissive={CORAL} emissiveIntensity={0.7} metalness={0.4} roughness={0.3} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Core({ active, still }: { active: number; still: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const shellEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.5, 0)), []);

  useFrame((state, delta) => {
    if (!rig.current || !wire.current || !shell.current || !pulse.current) return;
    if (!still) {
      wire.current.rotation.y += delta * 0.28;
      wire.current.rotation.x += delta * 0.11;
      shell.current.rotation.y -= delta * 0.14;
      shell.current.rotation.z += delta * 0.05;
      pulse.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05);
    }
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -state.pointer.y * 0.3, 0.05);
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, state.pointer.x * 0.45, 0.05);
  });

  return (
    <group ref={rig}>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial color="#ff4a3d" emissive="#ff3b3b" emissiveIntensity={2.6} toneMapped={false} />
      </mesh>
      <pointLight color={CORAL} intensity={14} distance={7} />
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#ff8a76" wireframe transparent opacity={0.5} />
      </mesh>
      <group ref={shell}>
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#1c0f13" metalness={0.7} roughness={0.25} transparent opacity={0.32} flatShading side={THREE.DoubleSide} />
        </mesh>
        <lineSegments geometry={shellEdges}>
          <lineBasicMaterial color={CORAL} transparent opacity={0.55} />
        </lineSegments>
      </group>
      {ORBITS.map((_, index) => <Orbit key={index} index={index} active={active} still={still} />)}
    </group>
  );
}

export default function CoreScene({ active, running, still }: { active: number; running: boolean; still: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={running ? 'always' : 'never'}
      camera={{ position: [0, 0.6, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3, 5]} intensity={1.1} color="#ffd6cf" />
      <Core active={active} still={still} />
      <gridHelper args={[16, 32, '#4a2025', '#3a1b1f']} position={[0, -2.35, 0]} />
      <Sparkles count={46} scale={[7, 4, 4]} size={2.2} speed={still ? 0 : 0.35} color={CORAL} opacity={0.7} />
    </Canvas>
  );
}
