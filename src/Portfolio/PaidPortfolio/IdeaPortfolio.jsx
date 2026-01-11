import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Sun, Moon, Mail, Github, Linkedin, 
  MapPin, GraduationCap, Trophy, 
  Star, ChevronRight, Zap, Eye, EyeOff, Radio
} from 'lucide-react';

export default function IdeaPortfolio({ responseData }) {
  const { extracted: data } = responseData || {};
  const [theme, setTheme] = useState('FLUX'); // 'FLUX' (Moon) or 'SOLAR' (Sun)
  const isSolar = theme === 'SOLAR';
  
  // Theme Configuration
  const themeCfg = {
    SOLAR: {
      coreColor: '#fbbf24', // Amber 400
      flareColor: 'rgba(251, 191, 36, 0.4)',
      glowColor: 'rgba(251, 191, 36, 0.08)',
      dustColor: 'rgba(251, 191, 36, 0.2)',
      accent: 'text-amber-600',
      border: 'border-amber-100',
      bgSpotlight: 'rgba(251, 191, 36, 0.03)'
    },
    FLUX: {
      coreColor: '#22d3ee', // Cyan 400
      flareColor: 'rgba(34, 211, 238, 0.4)',
      glowColor: 'rgba(34, 211, 238, 0.12)',
      dustColor: 'rgba(255, 255, 255, 0.15)',
      accent: 'text-cyan-400',
      border: 'border-cyan-900/40',
      bgSpotlight: 'rgba(34, 211, 238, 0.05)'
    }
  }[theme];

  const stellarEnergy = useMotionValue(1);
  const [isSupernova, setIsSupernova] = useState(false);
  const constraintsRef = useRef(null);
  
  // Scroll & Interaction Logic
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 120 });
  const coreX = useMotionValue(0);
  const coreY = useMotionValue(0);
  const [lightPos, setLightPos] = useState({ x: '50%', y: '150px' });

  // Kinetic Perspective & Dynamic Illumination (Dampened for Clarity)
  const useStellarMotion = (elementY) => {
    const coreViewportY = 150 + coreY.get();
    
    const rotateX = useTransform(
      [coreY, scrollY],
      ([cY, sY]) => {
        const elementViewportY = elementY - sY;
        const dist = coreViewportY - elementViewportY;
        // Dampened rotation for rock-solid reading experience
        return Math.max(-12, Math.min(12, dist / 40));
      }
    );

    const rotateY = useTransform(coreX, [-800, 800], [-15, 15]);
    
    const proximityBrightness = useTransform(
      [coreY, scrollY],
      ([cY, sY]) => {
        if (isSolar) return 1; // Full visibility in Solar
        const elementViewportY = elementY - sY;
        const dist = Math.abs(coreViewportY - elementViewportY);
        // High baseline brightness (0.8) in Flux for perfect readability
        const revealFactor = Math.max(0.8, 1 - (dist / 1200));
        return revealFactor;
      }
    );

    return { rotateX, rotateY, proximityBrightness, perspective: 2000 };
  };

  // Lens Flare & Global Ambient
  const flareWidth = useTransform(stellarEnergy, [0, 1], ["50vw", "100vw"]);
  const flareOpacity = useTransform(stellarEnergy, [0, 1], [0.2, 0.6]);
  const ambientExposure = useTransform(stellarEnergy, [0, 1], [0.6, 1]);
  const globalIllumination = useTransform([stellarEnergy], ([v]) => 
    `radial-gradient(circle 1400px at ${lightPos.x} ${lightPos.y}, ${themeCfg.glowColor.replace('0.08', (0.08 * v).toString()).replace('0.12', (0.12 * v).toString())} 0%, transparent 100%)`
  );

  // Stellar Core Energy Flux
  useEffect(() => {
    let timeoutId;
    const triggerFlux = () => {
      const isExtreme = Math.random() > 0.95;
      setIsSupernova(isExtreme);
      if (isExtreme) {
        stellarEnergy.set(0.8);
        setTimeout(() => stellarEnergy.set(1.2), 100);
        setTimeout(() => stellarEnergy.set(1), 200);
      } else {
        stellarEnergy.set(0.98 + Math.random() * 0.04);
        setTimeout(() => stellarEnergy.set(1), 80);
      }
      timeoutId = setTimeout(triggerFlux, isExtreme ? 8000 : 4000);
    };
    timeoutId = setTimeout(triggerFlux, 2000);
    return () => clearTimeout(timeoutId);
  }, [stellarEnergy]);

  // Cosmic Dust (Subtler for Premium feel)
  const cosmicDust = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5, duration: Math.random() * 40 + 30, delay: Math.random() * -30
  })), []);

  useEffect(() => {
    const updateLight = () => {
      setLightPos({ 
        x: `${(window.innerWidth / 2) + coreX.get()}px`, 
        y: `${window.scrollY + coreY.get() + 150}px` 
      });
    };
    const unsubX = coreX.on('change', updateLight);
    const unsubY = coreY.on('change', updateLight);
    const unsubS = scrollY.on('change', updateLight);
    return () => { unsubX(); unsubY(); unsubS(); };
  }, [coreX, coreY, scrollY]);

  // Kinetic Section Wrapper
  const KineticSection = ({ children, estY, className = "" }) => {
    const { rotateX, rotateY, proximityBrightness } = useStellarMotion(estY);
    return (
      <motion.div 
        style={{ rotateX, rotateY, opacity: proximityBrightness, perspective: 2000 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div ref={constraintsRef} className={`min-h-screen transition-colors duration-1000 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative ${isSolar ? 'bg-[#fcfaf7] text-slate-900' : 'bg-[#01060a] text-cyan-50'}`}>
      
      {/* Noise Texture */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${isSolar ? 'opacity-[0.02] bg-[url("https://www.transparenttextures.com/patterns/pinstripe-light.png")]' : 'opacity-[0.04] bg-[url("https://www.transparenttextures.com/patterns/stardust.png")]'}`} />

      {/* Premium Theme Toggle (Shadow Refined) */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[2000] pointer-events-auto">
         <motion.div
            className={`flex items-center p-1 rounded-full border transition-all duration-1000 backdrop-blur-3xl ${isSolar ? 'bg-white/80 border-amber-200 shadow-xl shadow-amber-900/5' : 'bg-black/60 border-zinc-800 shadow-2xl shadow-black/80'}`}
         >
            <motion.button
              onClick={() => setTheme('FLUX')}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 ${!isSolar ? 'text-cyan-400' : 'text-slate-400'}`}
            >
              {!isSolar && <motion.div layoutId="toggle-bg" className="absolute inset-0 bg-cyan-950/40 rounded-full border border-cyan-500/20" />}
              <Moon className="w-4 h-4 relative z-10" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] relative z-10">FLUX</span>
            </motion.button>

            <motion.button
              onClick={() => setTheme('SOLAR')}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 ${isSolar ? 'text-amber-600' : 'text-slate-600'}`}
            >
              {isSolar && <motion.div layoutId="toggle-bg" className="absolute inset-0 bg-amber-50 rounded-full border border-amber-200" />}
              <Sun className="w-4 h-4 relative z-10" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] relative z-10">SOLAR</span>
            </motion.button>
         </motion.div>
      </div>

      {/* Full-Screen Illumination System */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 z-[5]"
          style={{ background: globalIllumination, opacity: ambientExposure }}
        />

        <div className="absolute top-0 left-0 w-full h-full z-[150]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col items-center">
            
            <motion.div 
              style={{ y: coreY, width: flareWidth, opacity: flareOpacity, top: 150, background: `linear-gradient(90deg, transparent, ${themeCfg.flareColor.replace('0.4', '1')}, transparent)` }}
              className="absolute h-[1px] blur-[3px]" 
            />
            <motion.div 
              style={{ y: coreY, width: flareWidth, opacity: flareOpacity * 0.4, top: 150, background: `linear-gradient(90deg, transparent, ${themeCfg.flareColor.replace('0.4', '0.1')}, transparent)` }}
              className="absolute h-32 blur-[80px]" 
            />

            {/* The Core (Centered Face) */}
            <motion.div 
              drag dragConstraints={constraintsRef} dragElastic={0.08}
              style={{ x: coreX, y: coreY }}
              initial={{ y: -600 }} animate={{ y: 0 }}
              transition={{ y: { type: "spring", damping: 35, stiffness: 45, delay: 0.5 } }}
              className="relative flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing mt-32"
            >
              <motion.div
                animate={{ scale: isSupernova ? [1, 1.2, 1] : [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-32 h-32 flex items-center justify-center"
              >
                  <div className="absolute inset-0 rounded-full blur-[70px] opacity-25" style={{ background: themeCfg.coreColor }} />
                  <div className="absolute inset-6 bg-white rounded-full blur-[20px] opacity-60" style={{ shadowColor: themeCfg.coreColor }} />
                  <div className="relative w-14 h-14 bg-white rounded-full shadow-[0_0_50px_#fff] flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 40 40" className="w-10 h-10 absolute pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                          <AnimatePresence mode="wait">
                            {isSolar ? (
                              <motion.g key="sun-face" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <circle cx="14" cy="18" r="1.5" fill="#444" />
                                <circle cx="26" cy="18" r="1.5" fill="#444" />
                                <path d="M 12 25 Q 20 32 28 25" stroke="#444" strokeWidth="2" fill="none" strokeLinecap="round" />
                              </motion.g>
                            ) : (
                              <motion.g key="moon-face" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <motion.circle 
                                  cx="14" cy="18" r="1.5" fill="#06b6d4" 
                                  animate={{ scaleY: [1, 0.1, 1] }} 
                                  transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
                                />
                                <circle cx="26" cy="18" r="1.5" fill="#06b6d4" />
                                <path d="M 13 26 Q 20 31 27 26" stroke="#06b6d4" strokeWidth="2" fill="none" strokeLinecap="round" />
                              </motion.g>
                            )}
                          </AnimatePresence>
                      </svg>
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border rounded-full opacity-20" 
                    style={{ borderColor: themeCfg.coreColor }}
                  />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Section (Balanced) */}
      <header className="relative z-[100] text-center pt-96 mb-64 pointer-events-none px-6">
        <motion.div>
          <h1 className={`text-[8rem] md:text-[16rem] font-black uppercase tracking-tighter mb-4 leading-[0.8] transition-all duration-1000 ${isSolar ? 'text-slate-900 border-white/20 opacity-90' : 'text-white mix-blend-overlay opacity-80'}`}>
            {data?.name || "Stellar"}
          </h1>
          <p className={`text-[10px] md:text-sm font-black tracking-[1.5em] uppercase mt-24 px-12 py-3 inline-block rounded-full border backdrop-blur-md transition-all duration-700 ${isSolar ? 'text-amber-700 bg-white/80 border-amber-200' : 'text-cyan-400 bg-cyan-950/20 border-cyan-400/20'}`}>
            {data?.position || "Cosmic Architect"}
          </p>
        </motion.div>
      </header>

      {/* Discovery Masking (Automated + Transparent) */}
      <motion.div 
        className="relative z-10 flex flex-col pt-32"
        style={{
          maskImage: isSolar ? 'none' : `radial-gradient(circle 1400px at ${lightPos.x} ${lightPos.y}, black 80%, transparent 100%)`,
          WebkitMaskImage: isSolar ? 'none' : `radial-gradient(circle 1400px at ${lightPos.x} ${lightPos.y}, black 80%, transparent 100%)`,
        }}
      >
        <div className="fixed inset-0 pointer-events-none z-0">
          {cosmicDust.map((d) => (
            <motion.div 
              key={d.id} className="absolute rounded-full" 
              style={{ width: d.size, height: d.size, left: `${d.x}%`, top: `${d.y}%`, background: themeCfg.dustColor }} 
              animate={{ y: [0, -100, 0], opacity: [0, 0.3, 0] }} 
              transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: "linear" }} 
            />
          ))}
        </div>

        <div className="pb-96 px-6 md:px-12 max-w-7xl mx-auto w-full relative z-10">
          
          <KineticSection estY={1400} className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-64 md:mb-80 items-center">
            <div className="lg:col-span-8 space-y-10 md:space-y-12">
              <div className="flex items-center gap-6 md:gap-8">
                 <div className={`w-16 md:w-20 h-[1px] transition-colors duration-700 ${isSolar ? 'bg-amber-300' : 'bg-cyan-500/30'}`} />
                 <span className={`text-[9px] md:text-[10px] font-black tracking-[0.8em] transition-colors duration-700 ${isSolar ? 'text-amber-500' : 'text-cyan-800'}`}>CORE_MANIFEST_V5.0</span>
              </div>
              <p className={`text-4xl md:text-8xl font-thin leading-[0.9] italic tracking-tight transition-colors duration-700 ${isSolar ? 'text-slate-800' : 'text-cyan-50'}`}>
                "{data?.professional_summary || "Harnessing the flux of innovation to build digital legacies."}"
              </p>
            </div>
            <div className={`lg:col-span-4 p-12 md:p-16 rounded-[3rem] md:rounded-[4rem] border backdrop-blur-3xl transition-all duration-700 ${isSolar ? 'bg-white/70 border-amber-100 shadow-xl shadow-amber-900/5 text-slate-900' : 'bg-cyan-950/10 border-cyan-400/10 text-cyan-50'}`}>
               <div className="space-y-10 md:space-y-12">
                  <div className={`border-b pb-8 transition-colors duration-700 ${isSolar ? 'border-amber-50' : 'border-cyan-950/40'}`}>
                     <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] mb-4 ${themeCfg.accent}`}>EXP_CYCLES</p>
                     <p className="text-7xl md:text-8xl font-black leading-none">{data?.experience_years || '10'}Y</p>
                  </div>
                  <div>
                     <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] mb-4 ${themeCfg.accent}`}>DEPLOYED_SYSTEMS</p>
                     <p className="text-7xl md:text-8xl font-black leading-none">{data?.projects?.length || '12'}</p>
                  </div>
               </div>
            </div>
          </KineticSection>

          <section className="mb-64 md:mb-80">
              <div className="flex justify-between items-end mb-24 md:mb-40">
                <motion.h2 className={`text-6xl md:text-[14rem] font-black uppercase tracking-tighter leading-none transition-colors duration-700 ${isSolar ? 'text-amber-100/50' : 'text-cyan-950/30'}`}>
                   Stack_Flux
                </motion.h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                 {Object.entries(data?.skills || {}).map(([category, skills], i) => (
                   Array.isArray(skills) && skills.length > 0 && (
                     <KineticSection estY={2500 + i*300} key={category} className={`p-10 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border transition-all group overflow-hidden ${isSolar ? 'bg-white border-amber-100 hover:border-amber-400 shadow-sm' : 'bg-black/40 border-cyan-950/20 hover:border-cyan-400/40'}`}>
                       <h3 className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 transition-colors ${themeCfg.accent}`}>{category}</h3>
                       <div className="flex flex-wrap gap-3 md:gap-4">
                         {skills.map((skill, j) => (
                           <span key={j} className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-all ${isSolar ? 'text-slate-400 group-hover:text-amber-700' : 'text-zinc-700 group-hover:text-white'}`}>{skill}</span>
                         ))}
                       </div>
                     </KineticSection>
                   )
                 ))}
              </div>
           </section>

           <section className="mb-64 md:mb-80">
              <motion.h2 className={`text-6xl md:text-[12rem] font-black uppercase tracking-tighter mb-32 md:mb-48 text-center leading-none transition-colors duration-700 ${isSolar ? 'text-amber-50' : 'text-cyan-950/10'}`}>Chronology</motion.h2>
              <div className="space-y-8 md:space-y-12">
                 {data?.experience?.map((exp, i) => (
                   <KineticSection estY={4200 + i*600} key={i} className={`group relative p-10 md:p-16 rounded-[3rem] md:rounded-[5rem] transition-all duration-1000 border ${isSolar ? 'hover:bg-white border-transparent hover:border-amber-100' : 'hover:bg-cyan-950/10 border-transparent hover:border-cyan-900/40'}`}>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
                         <div className={`lg:col-span-2 font-black text-[10px] tracking-[0.8em] pt-4 transition-colors ${isSolar ? 'text-amber-200' : 'text-cyan-950'}`}>{exp.years}</div>
                         <div className="lg:col-span-6">
                            <h3 className={`text-5xl md:text-7xl font-black transition-colors mb-4 md:mb-6 uppercase tracking-tighter leading-[0.9] ${isSolar ? 'text-slate-900 group-hover:text-amber-600' : 'text-zinc-100 group-hover:text-cyan-400'}`}>{exp.title}</h3>
                            <p className={`text-[9px] font-black uppercase tracking-[0.4em] transition-colors ${themeCfg.accent}`}>{exp.company}</p>
                         </div>
                         <div className="lg:col-span-4 space-y-6 md:space-y-8 pt-4">
                            {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc, idx) => (
                              <p key={idx} className={`text-xl md:text-2xl font-extralight leading-tight transition-colors ${isSolar ? 'text-slate-500 group-hover:text-amber-900' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                {desc}
                              </p>
                            ))}
                         </div>
                      </div>
                   </KineticSection>
                 ))}
              </div>
           </section>

           <section className="mb-64 md:mb-80">
              <motion.h2 className={`text-6xl md:text-[15rem] font-black uppercase tracking-tighter mb-32 md:mb-40 text-center transition-colors duration-700 ${isSolar ? 'text-amber-50/50' : 'opacity-[0.05]'}`}>Baseline</motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                 {data?.education?.map((edu, i) => (
                   <KineticSection estY={6500 + i*400} key={i} className={`p-16 md:p-20 rounded-[3rem] md:rounded-[4rem] border group relative overflow-hidden transition-all ${isSolar ? 'bg-white border-amber-100 hover:border-amber-400' : 'bg-cyan-950/5 border-cyan-900/10 hover:bg-cyan-950/20'}`}>
                      <div className="flex flex-col gap-8 md:gap-12 relative z-10">
                         <div className="flex items-center gap-8 md:gap-10">
                            <GraduationCap className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${themeCfg.accent}`} />
                            <div>
                               <h4 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3 transition-colors ${isSolar ? 'text-slate-800' : 'text-zinc-200'}`}>{edu.degree}</h4>
                               <p className={`text-[9px] font-black uppercase tracking-[0.4em] transition-colors ${isSolar ? 'text-slate-400 group-hover:text-amber-600' : 'text-cyan-950 group-hover:text-cyan-800'}`}>{edu.institution}</p>
                            </div>
                         </div>
                         <div className={`text-[10px] font-black tracking-[0.6em] text-right transition-colors ${isSolar ? 'text-amber-200' : 'text-cyan-900'}`}>{edu.start_year} // {edu.end_year}</div>
                      </div>
                   </KineticSection>
                 ))}
              </div>
           </section>

           <section className="mb-64 md:mb-80">
              <div className="flex items-center gap-8 md:gap-12 mb-32 md:mb-48">
                 <Radio className={`w-10 h-10 md:w-12 md:h-12 animate-pulse transition-colors ${themeCfg.accent}`} />
                 <motion.h2 className={`text-5xl md:text-9xl font-black uppercase tracking-tighter transition-colors duration-700 ${isSolar ? 'text-slate-900' : 'text-white'}`}>Project_Clusters</motion.h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                 {data?.projects?.map((proj, i) => (
                   <KineticSection estY={8000 + i*400} key={i} className={`p-12 md:p-16 rounded-[3.5rem] md:rounded-[4.5rem] border flex flex-col group min-h-[500px] md:h-[600px] relative overflow-hidden transition-all duration-700 ${isSolar ? 'bg-white border-amber-100 hover:border-amber-400' : 'bg-black/60 border-cyan-950/20 hover:border-cyan-400/20'}`}>
                      <div className="flex-1 space-y-12 md:space-y-16 relative z-10">
                         <div className="flex items-center justify-between">
                            <Star className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${themeCfg.accent}`} />
                            <span className={`text-[10px] font-black tracking-[0.6em] transition-colors ${isSolar ? 'text-amber-200' : 'text-cyan-950'}`}>{proj.tech}</span>
                         </div>
                         <h3 className={`text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter transition-colors ${isSolar ? 'text-slate-900 group-hover:text-amber-600' : 'text-zinc-200 group-hover:text-white'}`}>{proj.title}</h3>
                         <p className={`text-xl md:text-2xl font-extralight leading-tight transition-colors ${isSolar ? 'text-slate-500 group-hover:text-amber-900' : 'text-zinc-600 group-hover:text-zinc-400'}`}>{proj.description}</p>
                      </div>
                      <motion.button whileHover={{ x: 15 }} className={`mt-12 flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.6em] transition-all ${themeCfg.accent}`}>
                         CONNECT_SIGNAL <ChevronRight className="w-5 h-5" />
                      </motion.button>
                   </KineticSection>
                 ))}
              </div>
           </section>

           <footer className={`pt-32 md:pt-40 border-t flex flex-col md:flex-row justify-between items-center gap-16 md:gap-24 transition-all duration-1000 px-6 pb-20 ${isSolar ? 'border-amber-100' : 'border-cyan-950 opacity-40 hover:opacity-100'}`}>
              <div className="flex gap-12 md:gap-16">
                 {data?.github && <a href={data.github} target="_blank" rel="noreferrer" className={`p-6 border rounded-[2rem] transition-all ${isSolar ? 'bg-white border-amber-100 text-slate-400 hover:text-amber-600 shadow-sm' : 'bg-cyan-950/20 border-cyan-900 text-cyan-400 hover:border-cyan-400'}`}><Github className="w-8 h-8 md:w-10 md:h-10" /></a>}
                 {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className={`p-6 border rounded-[2rem] transition-all ${isSolar ? 'bg-white border-amber-100 text-slate-400 hover:text-amber-600 shadow-sm' : 'bg-cyan-950/20 border-cyan-900 text-cyan-400 hover:border-cyan-400'}`}><Linkedin className="w-8 h-8 md:w-10 md:h-10" /></a>}
              </div>
              <div className={`text-[10px] font-black uppercase tracking-[1em] text-center md:text-right transition-colors ${isSolar ? 'text-amber-200' : 'text-cyan-950'}`}>
                 STELLAR_FLUX_PROTOCOL // {new Date().getFullYear()}
              </div>
           </footer>
        </div>
      </motion.div>
    </div>
  );
}
