import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, PerspectiveCamera, OrbitControls, Stars, 
  MeshDistortMaterial, Text, Float as FloatDrei, 
  ContactShadows, PresentationControls, useGLTF,
  MeshTransmissionMaterial
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ArrowLeft, Cpu, 
  Layers, Globe, Terminal, Code, User, Star 
} from 'lucide-react';
import * as THREE from 'three';

// --- Error Boundary for 3D Load Failures ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <NeuralFallback />;
    return this.props.children;
  }
}

// --- High-Tech Fallback (Signal Lost Mode) ---
function NeuralFallback() {
  return (
    <group scale={3} position={[0, -2, 0]}>
      {/* Head Capsule */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial 
          color="#a855f7" 
          speed={4} 
          distort={0.4} 
          metalness={0.8} 
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Digital Spine */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.1, 1.8, 32]} />
        <meshPhysicalMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.4} 
          metalness={1} 
          emissive="#3b82f6"
          emissiveIntensity={1}
        />
      </mesh>
      {/* Data Rings */}
      <group position={[0, 0.5, 0]}>
        {[0.6, 0.9, 1.2].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.005, 16, 100]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.1}
        color="#ec4899"
        font="https://fonts.gstatic.com/s/orbitron/v25/yYqxRnd6CQ8G2Ou_Nl97DluN.woff"
      >
        SIGNAL_LOST // FALLBACK_ENGAGED
      </Text>
    </group>
  );
}

// --- Holographic Shader Material ---
const HolographicMaterial = ({ color = "#a855f7" }) => {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) }
  }), [color]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <shaderMaterial
      transparent
      uniforms={uniforms}
      vertexShader={`
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          float scanline = sin(vPosition.y * 50.0 - uTime * 5.0) * 0.1 + 0.9;
          float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
          gl_FragColor = vec4(uColor, (fresnel + 0.2) * scanline * pulse * 0.6);
        }
      `}
    />
  );
};

// --- Styled 3D Avatar (Real 3D Model with Hologram) ---
function Avatar() {
  const modelUrl = 'https://models.readyplayerme.me/64b54e3d5c9c9c8e9b6a6b5a.glb';
  const { scene } = useGLTF(modelUrl);
  const group = useRef();
  const hologramColor = "#a855f7";

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: hologramColor,
          metalness: 0.9,
          roughness: 0.1,
          transparent: true,
          opacity: 0.4,
          emissive: hologramColor,
          emissiveIntensity: 0.5,
          wireframe: false
        });
      }
    });
  }, [scene]);


  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(time * 0.5) * 0.2;
  });

  if (!scene) return null;

  return (
    <group ref={group} scale={3.5} position={[0, -3.2, 0]}>
      <primitive object={scene}>
         <HolographicMaterial />
      </primitive>
      
      {/* Aura Glow around model */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial 
          color="#ec4899" 
          speed={2} 
          distort={0.3} 
          radius={1} 
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

const UIOverlay = ({ responseData }) => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
      {/* Header */}
      <header className="p-10 flex justify-between items-center pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase">{responseData.extracted?.name || "Neural Entity"}</h1>
            <div className="text-[10px] text-purple-400 font-bold tracking-[0.3em] uppercase">Nexus V4 Integrated System</div>
          </div>
        </motion.div>
        
        <div className="flex gap-4">
           <button onClick={() => window.location.href='/'} className="glass-morphism p-3 rounded-xl border-white/10 hover:bg-white/5 transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
        </div>
      </header>

      {/* Main UI Container */}
      <div className="flex-1 flex items-end justify-between p-10 gap-10">
        {/* Left Side: Information Modules */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md glass-morphism p-8 rounded-[2rem] border-white/10 pointer-events-auto shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
             {['summary', 'skills', 'experience', 'projects', 'education', 'awards'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`text-[9px] font-black px-4 py-2.5 rounded-lg uppercase tracking-widest transition-all whitespace-nowrap ${
                   activeTab === tab ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'text-slate-500 hover:text-white'
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="min-h-[220px]"
            >
               {activeTab === 'summary' && (
                 <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                       <Terminal className="w-5 h-5 text-purple-400" />
                       Strategic Output
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                       {responseData.extracted?.professional_summary || "No neural summary detected in stream."}
                    </p>
                 </div>
               )}
               {activeTab === 'skills' && (
                 <div className="grid grid-cols-2 gap-2">
                    {Object.entries(responseData.extracted?.skills || {}).map(([category, skills]) => 
                      Array.isArray(skills) && skills.length > 0 && (
                        <div key={category} className="contents">
                          {skills.slice(0, 2).map((skill, i) => (
                            <div key={`${category}-${i}`} className="bg-white/5 border border-white/5 p-3 rounded-xl text-[9px] font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 hover:bg-white/10 transition-colors">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                              {skill}
                            </div>
                          ))}
                        </div>
                      )
                    )}
                 </div>
               )}
               {activeTab === 'experience' && (
                 <div className="space-y-6">
                    {responseData.extracted?.experience?.slice(0, 2).map((exp, i) => (
                      <div key={i} className="relative pl-6 border-l border-purple-500/30">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-purple-500 rounded-full" />
                        <div className="text-sm font-black text-white">{exp.title}</div>
                        <div className="text-[10px] text-purple-400 uppercase font-bold mb-2">{exp.company} // {exp.years}</div>
                        <p className="text-slate-500 text-[11px] line-clamp-2">{(Array.isArray(exp.description) ? exp.description[0] : exp.description)}</p>
                      </div>
                    ))}
                 </div>
               )}
               {activeTab === 'projects' && (
                 <div className="space-y-4">
                    {responseData.extracted?.projects?.slice(0, 2).map((proj, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="text-xs font-black text-white mb-2">{proj.title}</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-2 italic">Tech: {proj.tech}</div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                 </div>
               )}
               {activeTab === 'education' && (
                 <div className="space-y-4">
                    {responseData.extracted?.education?.map((edu, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-purple-500/50 transition-colors">
                        <div className="text-xs font-black text-white mb-1 uppercase tracking-tight">{edu.degree}</div>
                        <div className="text-[9px] text-purple-400 font-bold uppercase mb-2">{edu.institution}</div>
                        <div className="text-[8px] text-slate-500 font-mono">STATUS: GRADUATED_{edu.end_year}</div>
                      </div>
                    ))}
                 </div>
               )}
               {activeTab === 'awards' && (
                 <div className="space-y-4">
                    {responseData.extracted?.awards?.map((award, i) => (
                      <div key={i} className="bg-purple-900/10 p-4 rounded-2xl border border-purple-500/10 flex items-center gap-4">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <div>
                          <div className="text-[11px] font-black text-white">{award.title}</div>
                          <div className="text-[8px] text-slate-500 uppercase font-bold">Issued by {award.issuer}</div>
                        </div>
                      </div>
                    ))}
                 </div>
               )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Side: Quick Action HUD */}
        <div className="flex flex-col gap-4 pointer-events-auto">
           {[
             { label: 'LinkedIn', icon: Linkedin, color: 'hover:text-blue-400' },
             { label: 'Github', icon: Github, color: 'hover:text-white' },
             { label: 'Email', icon: Mail, color: 'hover:text-red-400' }
           ].map((item, i) => (
             <motion.a
               href="#"
               key={i}
               whileHover={{ x: -10, scale: 1.1 }}
               className={`glass-morphism h-16 w-16 rounded-2xl border-white/10 flex items-center justify-center group transition-all relative ${item.color}`}
             >
                <item.icon className="w-6 h-6 text-slate-500 group-hover:scale-110 transition-transform" />
                <div className="absolute right-20 bg-black/80 text-[8px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap border border-white/10">
                   Open {item.label}
                </div>
             </motion.a>
           ))}
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="p-10 flex justify-between items-center">
         <div className="text-[10px] font-black text-slate-600 tracking-[0.5em] uppercase">
            Nexus_OS // {responseData.extracted?.name?.split(' ')[0]}_Interface // ID_8829-X
         </div>
         <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System_Nominal</span>
         </div>
      </footer>
    </div>
  );
};

export default function Nexus3DPortfolio({ responseData }) {
  // --- AI Voice Greeting ---
  useEffect(() => {
    const welcome = () => {
      const name = responseData.extracted?.name || "Agent";
      const utterance = new SpeechSynthesisUtterance(`Welcome to ${name}'s digital experience. Synchronization complete.`);
      utterance.rate = 0.9;
      utterance.pitch = 0.8; // Cyberpunk/AI vibe
      window.speechSynthesis.speak(utterance);
    };

    // Delay slightly for dramatic effect
    const timer = setTimeout(welcome, 1500);
    return () => clearTimeout(timer);
  }, [responseData.extracted?.name]);

  return (
    <div className="h-screen w-screen bg-[#020617] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent)] pointer-events-none" />
      <UIOverlay responseData={responseData} />
      
      <Canvas dpr={[1, 2]} shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={1} fade speed={1.5} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <FloatDrei speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
            <ErrorBoundary>
              <React.Suspense fallback={<NeuralFallback />}>
                <Avatar />
              </React.Suspense>
            </ErrorBoundary>
          </FloatDrei>
        </PresentationControls>

        <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={15} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}
