'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ParticleField } from './ParticleField';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-base">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <ParticleField position={[1.5, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
