"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = t * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshBasicMaterial 
          color="#D4AF37" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>
      
      <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.005, 16, 100]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.005, 16, 100]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
        </mesh>
      </group>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 1, -2]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <MeshDistortMaterial
            color="#D4AF37"
            speed={4}
            distort={0.4}
            radius={1}
            emissive="#D4AF37"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

/** Deterministic LCG pseudo-random number generator (seed-based) to avoid
 *  calling Math.random() inside useMemo (react-hooks/purity lint rule).
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function Particles({ count = 500 }) {
  const points = useMemo(() => {
    const rand = seededRandom(42);
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (rand() - 0.5) * 15;
      p[i * 3 + 1] = (rand() - 0.5) * 15;
      p[i * 3 + 2] = (rand() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#D4AF37"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, -10, 5]} color="#D4AF37" intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#D4AF37" intensity={2} castShadow />
        <RotatingGlobe />
        <Particles count={1000} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      <div className="absolute inset-0 bg-charcoal/60" />
    </div>
  );
}
