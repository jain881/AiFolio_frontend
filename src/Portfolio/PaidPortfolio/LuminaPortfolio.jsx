import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Heart, Star, Cloud, 
  User, Zap, Briefcase, Target,
  Mail, Github, Linkedin, Moon,
  Sun, Compass, RefreshCcw, Trophy, Rocket
} from 'lucide-react';

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -40, 0],
      x: [0, 20, 0],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute rounded-full blur-[80px] opacity-40 ${className}`}
  />
);

const LuminaPortfolio = ({ responseData }) => {
  const { extracted: data } = responseData;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#2d3436] font-sans overflow-x-hidden relative">
      {/* Dreamy Background */}
      <div className="fixed inset-0 z-0 bg-[#f9f9f9]">
        <FloatingShape className="w-[500px] h-[500px] bg-purple-200 -top-20 -left-20" />
        <FloatingShape className="w-[600px] h-[600px] bg-blue-100 top-1/2 -right-40" delay={2} />
        <FloatingShape className="w-[400px] h-[400px] bg-pink-100 bottom-0 left-1/4" delay={5} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-10 py-20">
        {/* Soft Header */}
        <header className="flex justify-between items-center mb-32 backdrop-blur-md bg-white/30 border border-white/50 p-6 rounded-[2.5rem] shadow-xl shadow-purple-500/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-400 to-blue-300 rounded-full flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-bold tracking-tight text-xl">{data?.name}</span>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/80 p-3 rounded-full hover:bg-white transition-all shadow-sm">
                <Mail className="w-5 h-5 text-purple-400" />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center mb-40">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
           >
             <h1 className="text-7xl md:text-8xl font-black mb-10 tracking-tighter bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
               Hello, I'm <br/> {data?.name?.split(' ')[0]}.
             </h1>
             <p className="text-2xl md:text-3xl font-medium opacity-60 max-w-2xl mx-auto leading-relaxed italic">
               "{data?.professional_summary}"
             </p>
           </motion.div>
        </section>

        {/* Floating Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           {/* Info Module */}
           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-white/40 backdrop-blur-xl border border-white/80 p-10 rounded-[3rem] shadow-2xl shadow-purple-500/5 col-span-full md:col-span-1"
           >
             <div className="w-12 h-12 bg-purple-100 rounded-2xl mb-8 flex items-center justify-center">
               <User className="text-purple-500" />
             </div>
             <h2 className="text-4xl font-black mb-6 tracking-tight">The Visionary</h2>
             <p className="font-medium opacity-60 leading-relaxed text-lg">
                Crafting interfaces that feel like a dream. Based in {data?.contact?.location}.
             </p>
           </motion.div>

           {/* Skills Module */}
           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-white/40 backdrop-blur-xl border border-white/80 p-10 rounded-[3rem] shadow-2xl shadow-purple-500/5 col-span-full md:col-span-1"
           >
              <div className="w-12 h-12 bg-blue-100 rounded-2xl mb-8 flex items-center justify-center">
               <Zap className="text-blue-500" />
             </div>
             <h2 className="text-4xl font-black mb-8 tracking-tight">The Toolkit</h2>
             <div className="flex flex-wrap gap-2">
                {Object.entries(data?.skills || {}).map(([category, skills]) => 
                  Array.isArray(skills) && skills.length > 0 && (
                    <div key={category} className="contents">
                      {skills.slice(0, 3).map((skill, i) => (
                        <span key={`${category}-${i}`} className="px-4 py-1.5 bg-white rounded-full font-bold text-xs shadow-sm border border-purple-50">
                            {skill}
                        </span>
                      ))}
                    </div>
                  )
                )}
             </div>
           </motion.div>

           {/* Experience Section */}
           <section className="col-span-full pt-20">
              <h2 className="text-5xl font-black mb-16 tracking-tighter text-center">My Journey.</h2>
              <div className="space-y-10">
                 {data?.experience?.map((job, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="group bg-white/60 p-10 rounded-[3rem] border border-white flex flex-col md:flex-row gap-8 items-center shadow-lg hover:shadow-2xl transition-all"
                    >
                       <div className="w-20 h-20 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-2xl text-purple-400 group-hover:scale-110 transition-transform">
                          {i + 1}
                       </div>
                       <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl font-black">{job.title}</h3>
                          <p className="font-bold opacity-40 uppercase tracking-widest text-xs mb-4">{job.company} // {job.years}</p>
                          <div className="space-y-2">
                            {(Array.isArray(job.description) ? job.description : [job.description]).map((desc, idx) => (
                              <p key={idx} className="font-medium opacity-60 leading-relaxed text-sm">• {desc}</p>
                            ))}
                          </div>
                       </div>
                       <div className="bg-white p-4 rounded-full shadow-sm">
                          <Compass className="w-6 h-6 text-blue-300 animate-spin-slow" />
                       </div>
                    </motion.div>
                 ))}
              </div>
           </section>

           {/* Education & Awards Section */}
           <section className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-10 pt-20">
              {data?.education && data.education.length > 0 && (
                <div className="bg-white/40 backdrop-blur-xl border border-white/80 p-10 rounded-[3rem] shadow-xl">
                   <div className="w-12 h-12 bg-pink-100 rounded-2xl mb-8 flex items-center justify-center">
                    <Star className="text-pink-500" />
                  </div>
                  <h2 className="text-3xl font-black mb-8 tracking-tight">Academic Base</h2>
                  <div className="space-y-6">
                    {data.education.map((edu, i) => (
                      <div key={i} className="border-l-2 border-pink-100 pl-4 py-1">
                        <h4 className="font-black text-lg">{edu.degree}</h4>
                        <p className="text-sm font-bold opacity-60">{edu.institution}</p>
                        <p className="text-xs font-medium opacity-40">{edu.start_year} - {edu.end_year} {edu.cgpa && `// CGPA: ${edu.cgpa}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data?.awards && data.awards.length > 0 && (
                <div className="bg-white/40 backdrop-blur-xl border border-white/80 p-10 rounded-[3rem] shadow-xl">
                   <div className="w-12 h-12 bg-yellow-100 rounded-2xl mb-8 flex items-center justify-center">
                    <Trophy className="text-yellow-500" />
                  </div>
                  <h2 className="text-3xl font-black mb-8 tracking-tight">Accolades</h2>
                  <div className="space-y-6">
                    {data.awards.map((award, i) => (
                      <div key={i} className="border-l-2 border-yellow-100 pl-4 py-1">
                        <h4 className="font-black text-lg">{award.title}</h4>
                        <p className="text-sm font-bold opacity-60">{award.issuer}</p>
                        <p className="text-xs font-medium opacity-40">{award.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
           </section>

           {/* Projects Section */}
           <section className="col-span-full pt-20">
              <h2 className="text-5xl font-black mb-16 tracking-tighter text-center">Dream Projects.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {data?.projects?.map((proj, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-b from-white to-purple-50/30 border border-white p-12 rounded-[4rem] shadow-xl"
                    >
                       <div className="w-14 h-14 bg-white rounded-2xl mb-10 flex items-center justify-center shadow-md">
                          <Rocket className="text-purple-400" />
                       </div>
                       <h3 className="text-4xl font-black mb-6 tracking-tight leading-none">{proj.title}</h3>
                       <p className="font-medium opacity-60 mb-10 text-lg leading-relaxed">{proj.description}</p>
                       <div className="flex flex-wrap gap-2 mb-8">
                         {proj.tech?.split(',').map((t, idx) => (
                           <span key={idx} className="bg-purple-50 text-[10px] font-black text-purple-400 px-3 py-1 rounded-lg border border-purple-100">#{t.trim()}</span>
                         ))}
                       </div>
                    </motion.div>
                 ))}
              </div>
           </section>
        </div>

        {/* Footer */}
        <footer className="mt-40 text-center">
            <div className="inline-flex items-center gap-6 p-8 bg-white border border-white rounded-[3rem] shadow-2xl shadow-purple-500/10">
                <div className="flex -space-x-4">
                    {[Github, Linkedin, Mail].map((Icon, i) => (
                        <div key={i} className="w-12 h-12 bg-white rounded-full border border-purple-100 flex items-center justify-center shadow-sm hover:z-10 hover:border-purple-300 transition-all cursor-pointer">
                            <Icon className="w-5 h-5 opacity-60" />
                        </div>
                    ))}
                </div>
                <div className="h-10 w-[1px] bg-purple-100" />
                <p className="font-black opacity-30 uppercase tracking-[0.2em] text-xs">AURA_SYNCED_2026</p>
            </div>
            <div className="mt-10 opacity-20 font-light flex items-center justify-center gap-2 italic">
               Lumina Aesthetic Template <Heart className="w-3 h-3 fill-current" /> Studio Folio
            </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LuminaPortfolio;
