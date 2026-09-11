'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  position?: [number, number, number];
}

export function ParticleField({ position = [0, 0, 0] }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry>(null);
  
  const { viewport } = useThree();

  // Create icosahedron geometry
  const { particleGeometry, edgesGeometry } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.8, 2);
    
    // Geometry for the points
    const pGeo = new THREE.BufferGeometry();
    const positions = geo.attributes.position.array;
    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    // Calculate base normals for breathing effect
    const baseNormals = new Float32Array(positions.length);
    const tempVec = new THREE.Vector3();
    for (let i = 0; i < positions.length; i += 3) {
      tempVec.set(positions[i], positions[i+1], positions[i+2]).normalize();
      baseNormals[i] = tempVec.x;
      baseNormals[i+1] = tempVec.y;
      baseNormals[i+2] = tempVec.z;
    }
    pGeo.setAttribute('normal', new THREE.Float32BufferAttribute(baseNormals, 3));
    pGeo.setAttribute('basePosition', new THREE.Float32BufferAttribute(positions, 3));
    
    // Geometry for the edges
    const eGeo = new THREE.EdgesGeometry(geo);
    
    return { particleGeometry: pGeo, edgesGeometry: eGeo };
  }, []);

  // Use a ref for base positions to animate in useFrame
  const basePositions = useMemo(() => {
    return particleGeometry.getAttribute('basePosition').array as Float32Array;
  }, [particleGeometry]);
  
  const normals = useMemo(() => {
    return particleGeometry.getAttribute('normal').array as Float32Array;
  }, [particleGeometry]);

  useFrame((state, delta) => {
    if (document.hidden) return; // Skip animation when tab is not visible
    if (!groupRef.current || !particlesGeometryRef.current) return;

    const time = state.clock.getElapsedTime();

    // Slow continuous rotation
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.08;

    // Mouse reactivity (subtle rotation offset)
    const pointer = state.pointer;
    groupRef.current.rotation.y += (pointer.x * 0.5 - groupRef.current.rotation.y) * 0.02;

    // Breathing effect
    const positions = particlesGeometryRef.current.getAttribute('position').array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Calculate offset based on sine wave and vertex index to create ripple/breathing
      const offset = Math.sin(time * 0.5 + i * 0.3) * 0.03;
      
      positions[i] = basePositions[i] + normals[i] * offset;
      positions[i+1] = basePositions[i+1] + normals[i+1] * offset;
      positions[i+2] = basePositions[i+2] + normals[i+2] * offset;
    }
    
    particlesGeometryRef.current.getAttribute('position').needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={position}>
      <points>
        <bufferGeometry ref={particlesGeometryRef} {...particleGeometry} />
        <pointsMaterial 
          color="#39FF88" 
          size={0.04} 
          transparent 
          opacity={0.8} 
          sizeAttenuation 
        />
      </points>
      <lineSegments>
        <bufferGeometry {...edgesGeometry} />
        <lineBasicMaterial 
          color="#39FF88" 
          transparent 
          opacity={0.15} 
        />
      </lineSegments>
    </group>
  );
}
