import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ArrowRight, Github, Linkedin, Mail, 
  MapPin, ExternalLink, Play, Search,
  Menu, X
} from 'lucide-react';

const RevealText = ({ children, delay = 0 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  </div>
);

const CinematicPortfolio = ({ responseData }) => {
  const { extracted: data } = responseData;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.1, 0.2, 0.2, 0.4]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-[#f0f0f0] font-serif selection:bg-white selection:text-black scroll-smooth">
      {/* Cinematic Background */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.05)_0%,transparent_50%)]"
      />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center p-10 z-10">
        <div className="max-w-4xl text-center">
          <RevealText delay={0.2}>
            <span className="text-xs font-sans tracking-[0.5em] uppercase opacity-40 mb-6 block">Directing Digital Experiences</span>
          </RevealText>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8]">
            <RevealText delay={0.4}>{data?.name?.split(' ')[0]}</RevealText>
            <RevealText delay={0.6}>
              <span className="italic opacity-30">{data?.name?.split(' ')[1]}</span>
            </RevealText>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="text-lg md:text-2xl font-sans font-light tracking-wide opacity-60 italic"
          >
            {data?.position} — Based in {data?.contact?.location}
          </motion.p>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-20"
        >
          <div className="w-[1px] h-20 bg-white" />
        </motion.div>
      </section>

      {/* Narrative Section (Summary) */}
      <section className="relative py-40 px-10 z-10 bg-white text-black">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="w-full md:w-1/3">
             <h2 className="text-xs font-sans font-bold tracking-widest uppercase mb-10 opacity-30 underline decoration-black underline-offset-8">The Narrative</h2>
          </div>
          <div className="w-full md:w-2/3">
             <p className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight">
               {data?.professional_summary}
             </p>
          </div>
        </div>
      </section>

      {/* Works Section (Projects) */}
      <section className="relative py-40 px-10 z-10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-20">
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter">WORKS<span className="text-xs font-sans tracking-[0.3em] font-bold block opacity-30 mt-4">SELECTED REELS</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#111] border border-[#111]">
             {data?.projects?.map((proj, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ scale: 0.98 }}
                 className="group bg-[#050505] p-20 flex flex-col justify-end min-h-[600px] border border-[#111] relative overflow-hidden transition-all duration-700 hover:bg-[#111]"
               >
                 <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-sans font-bold opacity-30 mb-4 block">SCENE_0{i+1}</span>
                 <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 group-hover:italic transition-all uppercase">{proj.title}</h3>
                 <p className="text-lg opacity-40 font-sans font-light max-w-sm mb-10 group-hover:opacity-100 transition-opacity">{proj.description}</p>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                       <Play className="fill-current w-4 h-4 ml-1" />
                    </div>
                    <span className="text-xs font-sans font-bold tracking-[0.3em] uppercase opacity-20">Case Study</span>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Skills Section (The Arsenal) */}
      <section className="relative py-40 px-10 z-10 bg-white text-black">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-xs font-sans font-bold tracking-widest uppercase mb-20 text-center opacity-30">The Digital Arsenal</h2>
            <div className="columns-1 md:columns-2 gap-20">
                {Object.entries(data?.skills || {}).map(([category, items], idx) => (
                    <div key={idx} className="mb-20 break-inside-avoid">
                        <h3 className="text-2xl font-black italic mb-8 border-b-2 border-black/10 pb-4 flex justify-between items-center">
                          {category} <span className="text-[10px] font-sans font-bold opacity-40">0{idx+1}</span>
                        </h3>
                        <ul className="space-y-4">
                            {items.map((skill, i) => (
                                <li key={i} className="text-3xl md:text-4xl font-light hover:italic transition-all cursor-crosshair">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Experience Section (Timeline) */}
      <section className="relative py-40 px-10 z-10 bg-[#050505]">
         <div className="max-w-6xl mx-auto">
            <div className="space-y-0">
               {data?.experience?.map((job, i) => (
                 <div key={i} className="group border-t border-white/10 py-20 flex flex-col md:flex-row gap-10 hover:bg-white/5 transition-colors px-10">
                    <div className="w-full md:w-1/4">
                       <span className="text-xs font-sans font-bold opacity-30 block mb-2">{job.years}</span>
                       <span className="text-xl font-black italic opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{job.company}</span>
                    </div>
                    <div className="w-full md:w-3/4">
                       <h4 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 group-hover:italic transition-all">{job.title}</h4>
                       <div className="space-y-6 opacity-40 group-hover:opacity-80 transition-opacity">
                          {(Array.isArray(job.description) ? job.description : [job.description]).map((desc, d) => (
                            <p key={d} className="text-xl leading-relaxed font-sans">{desc}</p>
                          ))}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Education Section (The Foundation) */}
      {data?.education && data.education.length > 0 && (
        <section className="relative py-40 px-10 z-10 bg-white text-black">
          <div className="max-w-5xl mx-auto">
             <h2 className="text-xs font-sans font-bold tracking-widest uppercase mb-20 text-center opacity-30">The Foundation</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {data.education.map((edu, i) => (
                  <div key={i} className="group border-l border-black/10 pl-10 py-6">
                    <span className="text-[10px] font-sans font-bold opacity-30 block mb-2">{edu.start_year} — {edu.end_year}</span>
                    <h3 className="text-3xl font-black mb-2 uppercase tracking-tight group-hover:italic transition-all">{edu.degree}</h3>
                    <p className="text-lg opacity-60 uppercase font-bold tracking-widest text-xs">{edu.institution}</p>
                    {edu.cgpa && <p className="mt-4 text-[10px] font-black opacity-30">GRADE_METER: {edu.cgpa}</p>}
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Awards Section (The Recognition) */}
      {data?.awards && data.awards.length > 0 && (
        <section className="relative py-40 px-10 z-10 bg-[#050505]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xs font-sans font-bold tracking-widest uppercase mb-20 text-center opacity-30">The Recognition</h2>
            <div className="space-y-12">
               {data.awards.map((award, i) => (
                 <div key={i} className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 py-12 group hover:bg-white/5 px-10 transition-colors">
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                      <span className="text-[10px] font-sans font-bold opacity-30 mb-2">{award.date}</span>
                      <h3 className="text-4xl font-black italic group-hover:not-italic transition-all uppercase tracking-tighter">{award.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-sans font-bold tracking-[0.4em] opacity-40 uppercase">{award.issuer}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer / Contact */}
      <footer className="relative h-screen flex flex-col items-center justify-center bg-white text-black p-10 z-10">
          <div className="text-center">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.8]">LET'S <br/><span className="italic">CONNECT</span></h2>
            <motion.a 
                whileHover={{ scale: 1.1 }}
                href={`mailto:${data?.contact?.email}`}
                className="text-2xl md:text-4xl font-black underline underline-offset-[16px] decoration-4 hover:text-pink-600 transition-colors"
            >
                {data?.contact?.email || "CONTACT@STUDIO"}
            </motion.a>
          </div>

          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-[10px] font-sans font-black tracking-[0.5em] opacity-30 uppercase">
             <span>AiFolio // Studio Edition</span>
             <div className="flex gap-10">
                <a href={data?.linkedin} className="hover:opacity-100 transition-opacity">LinkedIn</a>
                <a href={data?.github} className="hover:opacity-100 transition-opacity">GitHub</a>
             </div>
             <span>© 2026 Credits</span>
          </div>
      </footer>
    </div>
  );
};

export default CinematicPortfolio;
