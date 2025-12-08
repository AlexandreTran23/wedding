'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedRing({ position, rotationSpeed }: { position: [number, number, number]; rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#dc2626"
          emissive="#dc2626"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingHearts() {
  const hearts = useMemo(() => {
    // Réduire le nombre d'éléments sur mobile pour améliorer les performances
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 10 : 20;
    
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      rotationSpeed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  return (
    <>
      {hearts.map((heart, i) => (
        <AnimatedRing key={i} position={heart.position} rotationSpeed={heart.rotationSpeed} />
      ))}
    </>
  );
}

function ParticleField() {
  const particles = useMemo(() => {
    // Réduire le nombre de particules sur mobile pour améliorer les performances
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 300 : 1000;
    
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#dc2626" transparent opacity={0.6} />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#dc2626" />
        
        <FloatingHearts />
        <ParticleField />
        <Stars radius={100} depth={50} count={typeof window !== 'undefined' && window.innerWidth < 768 ? 2000 : 5000} factor={4} fade speed={1} />
        <Sparkles count={typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 100} scale={20} size={2} speed={0.4} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

