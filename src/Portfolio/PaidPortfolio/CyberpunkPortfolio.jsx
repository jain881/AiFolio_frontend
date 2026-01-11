import React, { useState, useEffect } from 'react';
import { Terminal, Zap, Cpu, Database, Globe, Github, Linkedin, Mail, ArrowRight, Share2, Shield, Radio } from 'lucide-react';

export default function CyberpunkPortfolio({ responseData, isPreview }) {
  const staticData = {
    extracted: {
      name: "KAIZEN-01",
      position: "Full-Stack Cyber Architect",
      contact: {
        email: "kaizen@neuro.net",
        location: "Neo-Tokyo Sector 7"
      },
      skills: {
        "CORE_SYSTEMS": ["React.js", "Neural-link APIs", "Quantum DB", "Cyber-Security"],
        "PROTOCOLS": ["TCP/IP over Neural", "Encrypted Mesh", "Synaptic Load Balancing"],
        "GEAR": ["Vite", "Tailwind Neon", "Substance Designer"]
      },
      experience: [
        {
          company: "NEURAL-TECH CORP",
          title: "Lead Systems Architect",
          years: "2077 - 2089",
          description: "Optimized neural pathways for high-frequency trading bots. Reduced latency by 25 nanoseconds."
        },
        {
          company: "DATA-DRIVEN SOLUTIONS",
          title: "Grid Runner",
          years: "2072 - 2077",
          description: "Recovered lost data shards from corrupted server clusters in the deep web."
        }
      ],
      education: [
        {
          institution: "CYBER-TECH ACADEMY",
          degree: "Neural-Link Specialist",
          field_of_study: "Information Flux",
          start_year: "2068",
          end_year: "2072"
        }
      ],
      projects: [
        { title: "NEO-TOKYO HACK", tech: "Solana, WebGL", description: "A decentralized city-state simulation on the blockchain." },
        { title: "SYNTHWAVE CITY", tech: "Three.js, MIDI", description: "Audio-reactive 3D visualization of synthetic soundscapes." }
      ]
    }
  };

  const finalData = isPreview ? staticData : responseData;
  const data = finalData?.extracted || {};
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* HUD Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-cyan-500/20 z-50">
        <div className="h-full bg-cyan-500 animate-[scan_2s_linear_infinite]" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header Unit */}
        <header className="mb-20">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className={`relative ${glitch ? 'animate-pulse scale-105 skew-x-2' : ''}`}>
               <div className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
               <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-4 bg-gradient-to-br from-white via-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  {data.name || "UNIDENTIFIED"}
               </h1>
               <div className="flex items-center gap-4 text-pink-500 font-black tracking-widest uppercase">
                  <div className="h-0.5 w-12 bg-pink-500" />
                  {data.position || "SYSTEM_OPERATOR"}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-auto">
               <div className="bg-slate-900/50 p-6 border border-cyan-500/30 rounded-xl backdrop-blur-md">
                  <p className="text-[10px] text-cyan-500/50 uppercase mb-2">// CONTACT_PROTOCOL</p>
                  <p className="text-white font-bold">{data.contact?.email}</p>
                  <p className="text-cyan-500/70 text-sm mt-1">{data.contact?.location}</p>
               </div>
               <div className="bg-slate-900/50 p-6 border border-pink-500/30 rounded-xl backdrop-blur-md">
                  <p className="text-[10px] text-pink-500/50 uppercase mb-2">// UPLINK_STATUS</p>
                  <div className="flex gap-4">
                     <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                     <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                     <Shield className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* Content Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Matrix */}
          <main className="lg:col-span-8 space-y-24">
            
            {/* Experience Sector */}
            <section>
              <h2 className="text-4xl font-black italic mb-12 flex items-center gap-4">
                <div className="h-8 w-1 bg-pink-500" />
                EXP_HISTORY
              </h2>
              <div className="space-y-12">
                {data.experience?.map((exp, i) => (
                  <div key={i} className="group relative">
                    <div className="absolute -left-12 top-2 w-8 h-px bg-cyan-500/50 group-hover:w-12 group-hover:bg-cyan-500 transition-all" />
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
                      <span className="text-xs font-black text-pink-500 tracking-[0.2em]">{exp.years}</span>
                    </div>
                    <p className="text-cyan-500/70 uppercase text-xs mb-4 font-black">{exp.company}</p>
                    <div className="text-slate-400 leading-relaxed max-w-2xl bg-slate-900/20 p-4 border-l border-cyan-500/20 space-y-2">
                      {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc, idx) => (
                        <p key={idx} className="text-sm">• {desc}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recognition Sector (Awards) */}
            {data?.awards && data.awards.length > 0 && (
              <section>
                <h2 className="text-4xl font-black italic mb-12 flex items-center gap-4">
                  <div className="h-8 w-1 bg-yellow-500" />
                  RECOGNITION_DATA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.awards.map((award, i) => (
                    <div key={i} className="bg-slate-900/40 p-6 border border-yellow-500/20 hover:border-yellow-500/50 transition-all border-dashed">
                       <span className="text-[10px] text-yellow-500/50 block mb-2 font-black tracking-widest uppercase">ID: AWARD_{award.date}</span>
                       <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                       <p className="text-xs text-slate-500 uppercase tracking-tighter">Issued by {award.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Project Grid */}
            <section>
              <h2 className="text-4xl font-black italic mb-12 flex items-center gap-4">
                <div className="h-8 w-1 bg-cyan-500" />
                PROJECT_STACK
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.projects?.map((proj, i) => (
                  <div key={i} className="bg-slate-900/40 p-1 border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:translate-y-[-4px] group">
                    <div className="bg-slate-900 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                      <p className="text-[10px] text-pink-500 font-black mb-4 uppercase tracking-widest">{proj.tech}</p>
                      <p className="text-slate-400 text-sm mb-6">{proj.description}</p>
                      <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-black underline cursor-pointer">ACCESS_SOURCE</span>
                         <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Modules */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Skills Module */}
            <div className="bg-slate-900/50 border border-cyan-500/20 p-8 rounded-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-cyan-500/10 transition-colors" />
               <h3 className="text-2xl font-black italic mb-8 border-b border-cyan-500/20 pb-4">SKILLS_MATRIX</h3>
                <div className="space-y-8">
                   {Object.entries(data.skills || {}).map(([cat, list], i) => 
                     Array.isArray(list) && list.length > 0 && (
                       <div key={i}>
                         <p className="text-[10px] text-cyan-500/50 mb-3 font-black tracking-[0.2em]">{cat}</p>
                         <div className="flex flex-wrap gap-2">
                           {list.map((s, j) => (
                             <span key={j} className="text-xs bg-slate-800 text-cyan-400 px-3 py-1 border border-cyan-500/10 hover:border-cyan-500 transition-colors">
                               {s}
                             </span>
                           ))}
                         </div>
                       </div>
                     )
                   )}
                </div>
            </div>

            {/* Neural Load Status */}
            <div className="bg-pink-500/5 border border-pink-500/20 p-8 rounded-2xl">
               <h3 className="text-2xl font-black italic mb-8 border-b border-pink-500/20 pb-4">NODE_STATUS</h3>
               <div className="space-y-4">
                  {[
                    { label: 'CPU_LOAD', val: '84%' },
                    { label: 'NEURAL_LINK', val: 'STABLE' },
                    { label: 'ENCRYPTION', val: 'AES-2048' }
                  ].map((sys, i) => (
                    <div key={i} className="flex justify-between items-center">
                       <span className="text-[10px] font-black">{sys.label}</span>
                       <span className="text-xs text-pink-500 font-bold">{sys.val}</span>
                    </div>
                  ))}
               </div>
            </div>

          </aside>
        </div>

        {/* System Footer */}
        <footer className="mt-32 pt-12 border-t border-cyan-500/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              SYSTEM_ONLINE_V2.089
           </div>
           <div>© 2077 GENESIS_VOID.NET // {data.name}</div>
           <div className="flex gap-8">
              <span className="cursor-pointer hover:text-cyan-400">DEBUG_LOGS</span>
              <span className="cursor-pointer hover:text-cyan-400">PROTOCOL_X</span>
           </div>
        </footer>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
