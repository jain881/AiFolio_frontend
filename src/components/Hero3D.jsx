import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, OrbitControls, Stars, Torus, Box, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function Core() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.4;
      meshRef.current.rotation.y = time * 0.6;
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 1 + Math.sin(time * 2) * 0.1;
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(1.2, 1.2, 1.2), []);

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <Box ref={meshRef} geometry={geometry} scale={1.2}>
        <MeshDistortMaterial
          color="#a855f7"
          roughness={0}
          metalness={0.8}
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          distort={0.4}
          speed={4}
          transparent
          opacity={0.9}
        />
      </Box>
    </Float>
  );
}

function SatelliteRing({ radius, speed, color, thickness }) {
  const ringRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = time * speed;
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.5;
    }
  });

  return (
    <Torus ref={ringRef} args={[radius, thickness, 16, 100]}>
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2} 
        transparent 
        opacity={0.6}
      />
    </Torus>
  );
}

function DataFragments() {
  const fragments = useMemo(() => {
    return new Array(20).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: Math.random() * 0.2
    }));
  }, []);

  return (
    <group>
      {fragments.map((f, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <Box position={f.position} rotation={f.rotation} scale={f.scale}>
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
          </Box>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse.x * 0.5, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, state.mouse.y * 0.5, 0.05);
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group}>
      <Core />
      <SatelliteRing radius={2.2} speed={1.2} color="#ec4899" thickness={0.02} />
      <SatelliteRing radius={2.8} speed={-0.8} color="#3b82f6" thickness={0.01} />
      <SatelliteRing radius={3.5} speed={0.5} color="#06b6d4" thickness={0.015} />
      <DataFragments />
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#ec4899" />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={2} />
        
        <Scene />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.0} radius={0.4} />
          <Vignette offset={0.3} darkness={0.9} />
        </EffectComposer>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    </div>
  );
}
