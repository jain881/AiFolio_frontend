import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Gamepad2, Sparkles, User, Code, Briefcase, 
  Trophy, Mail, Github, Linkedin, Heart,
  Star, Rocket, Zap, Target, Car, Flag,
  ChevronRight, Trophy as TrophyIcon
} from 'lucide-react';

// --- Aura Racer Mini-Game ---
const AuraRacer = ({ data }) => {
  const [carPos, setCarPos] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Simple game loop simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setScore(s => s + 1);
      // Spawn "Skill" powerups
      if (Math.random() > 0.95) {
        const skills = Object.values(data?.skills || {}).flat();
        const skill = skills[Math.floor(Math.random() * skills.length)];
        setObstacles(prev => [...prev, { id: Date.now(), text: skill, x: 100 }]);
      }
      
      setObstacles(prev => prev.map(o => ({ ...o, x: o.x - 2 })).filter(o => o.x > -20));
    }, 50);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="relative h-64 bg-[#1a1a1a] border-[6px] border-[#4D4D4D] rounded-[2rem] overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
      <div className="absolute top-4 left-6 flex items-center gap-4 z-10">
        <div className="bg-[#FFD93D] text-[#4D4D4D] px-4 py-1 rounded-full font-black italic text-sm">
          AURA_RACER_V1.0
        </div>
        <div className="text-white font-black text-xl italic tracking-tighter">
          SCORE: {score.toString().padStart(6, '0')}
        </div>
      </div>

      {/* Road Lines */}
      <div className="absolute bottom-10 left-0 right-0 h-1 bg-[#333] flex gap-8 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ x: [-100, 100] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-full bg-yellow-500/50" 
          />
        ))}
      </div>

      {/* The Car */}
      <motion.div
        animate={{ 
          y: isJumping ? -100 : 0,
          rotate: isJumping ? [0, -10, 0] : [0, 1, -1, 0]
        }}
        className="absolute bottom-12 left-20 z-20"
      >
        <div className="relative">
          <Car className="w-16 h-16 text-pink-500 fill-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
          <div className="absolute -bottom-2 -left-2 w-20 h-4 bg-black/40 blur-md rounded-full -z-10" />
          {/* Flame Exhaust */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
            className="absolute -left-6 bottom-4 w-6 h-3 bg-orange-500 rounded-full blur-sm" 
          />
        </div>
      </motion.div>

      {/* Obstacles / Skills */}
      <AnimatePresence>
        {obstacles.map(o => (
          <motion.div
            key={o.id}
            initial={{ x: '100%' }}
            animate={{ x: `${o.x}%` }}
            exit={{ opacity: 0 }}
            className="absolute bottom-14 flex flex-col items-center"
          >
            <div className="bg-blue-400 text-white px-3 py-1 rounded-full text-[10px] font-black border-2 border-[#4D4D4D] shadow-[2px_2px_0px_#4D4D4D] whitespace-nowrap">
              {o.text}
            </div>
            <Zap className="text-yellow-400 fill-yellow-400 w-4 h-4 mt-1 animate-bounce" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-2 left-6 text-[10px] text-white/30 font-bold">
        [SPACE] TO JUMP // COLLECT SKILLS FOR XP
      </div>
    </div>
  );
};

export default function ArcadePortfolio({ responseData }) {
  const { extracted: data } = responseData;
  const [activeTab, setActiveTab] = useState('profile');
  const [score, setScore] = useState(0);

  const tabs = [
    { id: 'profile', label: 'Player', icon: User, color: 'bg-pink-400' },
    { id: 'skills', label: 'Arsenal', icon: Zap, color: 'bg-yellow-400' },
    { id: 'experience', label: 'Quests', icon: Briefcase, color: 'bg-blue-400' },
    { id: 'projects', label: 'Bosses', icon: Target, color: 'bg-purple-400' },
    { id: 'education', label: 'Level_Up', icon: Star, color: 'bg-green-400' },
    { id: 'awards', label: 'Loot', icon: TrophyIcon, color: 'bg-orange-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-mono text-[#e0e0e0] overflow-x-hidden selection:bg-pink-500/30">
      {/* Gen-Z Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* HUD / Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#1a1a1a] border-[4px] border-[#333] p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center text-5xl font-black shadow-[0_0_30px_rgba(236,72,153,0.3)] text-white"
            >
              {data?.name?.[0] || 'A'}
            </motion.div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-md">
                {data?.name || "PLAYER_ONE"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border border-pink-500/30">
                  {data?.position || "MASTER_ARCHITECT"}
                </span>
                <span className="text-slate-500 font-bold text-[10px]">XP: {data?.experience_years ? `${data.experience_years}YRS` : 'LVL_99'}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="bg-[#222] border-2 border-[#333] px-6 py-2 rounded-2xl flex flex-col items-center">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural_Currency</span>
               <span className="text-2xl font-black text-yellow-400 italic font-mono">$ {score.toString().padStart(6, '0')}</span>
            </div>
          </div>
        </header>

        {/* Mini Game Integration */}
        <section className="mb-12">
           <AuraRacer data={data} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-between gap-3 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] flex flex-col items-center gap-2 p-4 rounded-3xl font-black uppercase text-xs transition-all border-[3px] 
                ${activeTab === tab.id ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-[#1a1a1a] text-slate-400 border-[#333]'}`}
            >
              <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-pink-500' : 'text-slate-500'}`} />
              {tab.label}
            </motion.button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="bg-[#111] border-[4px] border-[#222] rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] min-h-[500px] relative overflow-hidden">
          {/* Subtle Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[size:100%_4px] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                   <div className="bg-pink-500 text-white font-black px-6 py-2 rounded-full mb-8 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                      MISSION_BRIEFING
                   </div>
                   <p className="text-2xl font-bold leading-relaxed text-slate-300 italic">
                     "{data?.professional_summary || "Synthesizing professional identity..."}"
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-[#222] p-8 rounded-[2rem] border-2 border-slate-700/50 hover:border-blue-500/50 transition-colors group">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform">
                          <Mail className="text-blue-400" />
                        </div>
                        <h3 className="font-black text-lg uppercase tracking-wider text-white">COMM_CHANNEL</h3>
                      </div>
                      <div className="space-y-2 font-mono">
                        <p className="text-blue-400 font-black">{data?.contact?.email || 'OFFLINE'}</p>
                        <p className="font-bold text-slate-400">{data?.contact?.phone || 'PRIVATE'}</p>
                        <p className="text-xs text-slate-500 uppercase mt-4">{data?.contact?.location || 'NEURAL_SPACE'}</p>
                      </div>
                   </div>
                   <div className="bg-[#222] p-8 rounded-[2rem] border-2 border-slate-700/50 hover:border-pink-500/50 transition-colors group">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-pink-500/20 rounded-xl group-hover:scale-110 transition-transform">
                          <Rocket className="text-pink-400" />
                        </div>
                        <h3 className="font-black text-lg uppercase tracking-wider text-white">NETWORK_STATUS</h3>
                      </div>
                      <div className="flex gap-4">
                        <a href={data?.github || '#'} target="_blank" rel="noreferrer" className="flex-1 bg-[#1a1a1a] p-4 rounded-2xl flex flex-col items-center gap-2 border-2 border-[#333] hover:border-pink-400 transition-all cursor-pointer">
                          <Github className="w-8 h-8 text-white" />
                          <span className="text-[10px] font-black uppercase text-slate-500">GITHUB</span>
                        </a>
                        <a href={data?.linkedin || '#'} target="_blank" rel="noreferrer" className="flex-1 bg-[#1a1a1a] p-4 rounded-2xl flex flex-col items-center gap-2 border-2 border-[#333] hover:border-blue-400 transition-all cursor-pointer">
                          <Linkedin className="w-8 h-8 text-white" />
                          <span className="text-[10px] font-black uppercase text-slate-500">LINKEDIN</span>
                        </a>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {Object.entries(data?.skills || {}).map(([category, items], idx) => 
                  Array.isArray(items) && items.length > 0 && (
                    <div key={idx} className="bg-[#1a1a1a] p-8 rounded-[2.5rem] border-2 border-[#222] shadow-xl">
                      <h3 className="text-xl font-black mb-8 text-white flex items-center justify-between">
                        <span className="bg-[#333] px-4 py-1 rounded-lg text-xs tracking-widest">{category.toUpperCase()}</span>
                        <Zap className="text-yellow-400 w-5 h-5" />
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {items.map((skill, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            className="bg-[#222] px-4 py-2 border border-slate-700/50 rounded-xl text-blue-400 font-bold text-sm shadow-lg hover:bg-blue-500/10 transition-colors"
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                {data?.experience?.map((job, i) => (
                  <div key={i} className="relative pl-12 border-l-4 border-dashed border-slate-800 pb-10 last:pb-0">
                    <div className="absolute top-0 left-[-12px] w-5 h-5 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                    <div className="bg-[#1a1a1a] p-8 rounded-[2.5rem] border-2 border-[#222] shadow-2xl">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                          <h4 className="text-2xl font-black text-white italic">{job.title}</h4>
                          <p className="text-pink-500 font-black text-sm uppercase tracking-widest">@ {job.company}</p>
                        </div>
                        <div className="bg-[#222] px-4 py-2 rounded-xl text-xs font-black text-slate-400 border border-[#333]">
                          {job.years}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(Array.isArray(job.description) ? job.description : [job.description]).map((desc, d) => (
                          <div key={d} className="flex gap-4 items-start bg-[#222]/50 p-4 rounded-2xl border border-slate-800/50">
                             <ChevronRight className="w-4 h-4 text-pink-500 flex-shrink-0 mt-1" />
                             <p className="text-sm font-bold text-slate-400 leading-relaxed">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {data?.projects?.map((proj, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }}
                    className="flex flex-col bg-[#1a1a1a] border-[4px] border-[#222] rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] group-hover:bg-purple-600/20 transition-all" />
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl mb-8 flex items-center justify-center border-2 border-purple-500/30">
                      <Gamepad2 className="text-purple-400 w-8 h-8" />
                    </div>
                    <h4 className="text-3xl font-black uppercase mb-4 text-white leading-tight underline decoration-purple-500/30 decoration-[8px] underline-offset-[10px]">
                      {proj.title}
                    </h4>
                    <p className="text-sm font-bold text-slate-500 mb-8 flex-1 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                       {proj.tech?.split(',').map((t, idx) => (
                         <span key={idx} className="bg-[#222] text-[10px] font-black text-slate-400 px-3 py-1 rounded-lg border border-[#333]"># {t.trim()}</span>
                       ))}
                    </div>
                    <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                       LAUNCH_PROJECT
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data?.education?.map((edu, i) => (
                    <div key={i} className="bg-[#1a1a1a] p-8 rounded-[2.5rem] border-2 border-[#222] shadow-xl relative overflow-hidden group">
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/5 rounded-full group-hover:bg-green-500/10 transition-colors" />
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl mb-6 flex items-center justify-center border border-green-500/30">
                        <Star className="text-green-400" />
                      </div>
                      <h4 className="text-2xl font-black text-white mb-2 italic underline decoration-green-500/30 decoration-[6px] underline-offset-4">{edu.degree}</h4>
                      <p className="text-green-500 font-black text-sm uppercase mb-4 tracking-tighter">@ {edu.institution}</p>
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-500 bg-[#222] px-4 py-2 rounded-lg border border-[#333]">
                        <span>CLASS_OF_{edu.end_year}</span>
                        {edu.cgpa && <span>GPA_{edu.cgpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'awards' && (
              <motion.div
                key="awards"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {data?.awards?.map((award, i) => (
                  <div key={i} className="bg-[#1a1a1a] p-10 rounded-[3rem] border-2 border-[#222] flex flex-col items-center text-center group hover:bg-[#1a1a1a]/80 transition-all border-dashed">
                    <div className="w-20 h-20 bg-orange-500/20 rounded-full mb-8 flex items-center justify-center border-4 border-orange-500/30 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                      <TrophyIcon className="w-10 h-10 text-orange-400" />
                    </div>
                    <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{award.title}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{award.issuer}</p>
                    <div className="mt-6 px-4 py-1 bg-[#222] rounded-full text-[10px] font-black text-orange-400 border border-orange-500/20">
                      EARNED_{award.date}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-16 flex flex-col items-center gap-6">
            <div className="flex gap-8">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse delay-75" />
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse delay-150" />
            </div>
            <div className="bg-[#1a1a1a] border border-[#333] px-8 py-3 rounded-full text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">
               SYSTEM_STABLE // GEN_Z_PROTOCOL_ENGAGED // 2026
            </div>
        </footer>
      </div>
    </div>
  );
}
