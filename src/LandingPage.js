import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Upload, Sparkles, FileText, Zap, CheckCircle, ArrowRight, Shield, Globe, Cpu, 
  Github, Linkedin, Smartphone, Layers, CreditCard, Star, Users, Command, 
  Terminal as TerminalIcon, Layout, Radio, MessageSquare, Twitter, Instagram, ChevronUp
} from 'lucide-react';
import MainPage from './Portfolio/MainPage';
import NeoStackPortfolio from './Portfolio/PaidPortfolio/NeoStackPortfolio';
import { useParams } from 'react-router-dom';
import { superbase } from './superbase';
import TemplateSelection from './Portfolio/TemplateSelection';
import TerminalPortfolio from './Portfolio/PaidPortfolio/TerminalPortfolio';
import MinimalistPortfolio from './Portfolio/PaidPortfolio/MinimalistPortfolio';
import CyberpunkPortfolio from './Portfolio/PaidPortfolio/CyberpunkPortfolio';
import Nexus3DPortfolio from './Portfolio/PaidPortfolio/Nexus3DPortfolio';
import LoginScreen from './Portfolio/LoginScreen';
import Hero3D from './components/Hero3D';

// --- Reusable Modern Components ---

const TiltCard = ({ children, className = "" }) => {
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 40;
    const yPct = (mouseY / height - 0.5) * -40;
    x.set(xPct);
    y.set(yPct);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d" }}
      className={`glass-morphism rounded-[2.5rem] relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
};

const MagneticButton = ({ children, onClick, className = "", variant = "primary" }) => {
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - (rect.left + rect.width / 2);
    const mouseY = e.clientY - (rect.top + rect.height / 2);
    x.set(mouseX * 0.4);
    y.set(mouseY * 0.4);
  }

  const baseStyles = "px-10 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 relative overflow-hidden group";
  const variants = {
    primary: "bg-white text-slate-900",
    secondary: "glass-morphism border-white/10 hover:bg-white/10",
    gradient: "bg-gradient-to-tr from-purple-600 to-pink-500 text-white"
  };

  return (
    <motion.button
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ x, y }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" 
      />
    </motion.button>
  );
};

const BackToTop = ({ visible, onClick, onMouseEnter, onMouseLeave }) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="fixed bottom-10 right-10 w-14 h-14 glass-morphism rounded-full z-[80] flex items-center justify-center hover:bg-white/10 transition-colors border-white/10 group shadow-2xl"
      >
        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    )}
  </AnimatePresence>
);

export default function LandingPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateSelection, setShowTemplateSelection] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const { scrollYProgress, scrollY } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setShowBackToTop(latest > 500);
    });
  }, [scrollY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await superbase.auth.getSession();
      } finally {
        setIsCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  const loginWithGoogle = async () => {
    const { error } = await superbase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Error during Google sign-in:', error.message);
  }

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      // Removed login check for free access
      setShowTemplateSelection(true);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Removed login check for free access
      setShowTemplateSelection(true);
    }
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setShowTemplateSelection(false);
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('cv', file);

    try {
      const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/upload-cv`, {
        method: 'POST',
        // Authorization header removed for free access
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-16 h-16 border-t-4 border-purple-500 border-r-4 border-r-transparent rounded-full shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        />
      </div>
    );
  }

  
  if (responseData && selectedTemplate) {
    switch (selectedTemplate) {
      case 'neostack': return <NeoStackPortfolio responseData={responseData} />;
      case 'terminal': return <TerminalPortfolio responseData={responseData} />;
      case 'minimalist': return <MinimalistPortfolio responseData={responseData} />;
      case 'cyberpunk': return <CyberpunkPortfolio responseData={responseData} />;
      case 'nexus': return <Nexus3DPortfolio responseData={responseData} />;
      default: return <MainPage responseData={responseData} />;
    }
  }

  if (showTemplateSelection) {
    return isUploading ? (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full glass-morphism p-12 rounded-[3rem]">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-[0_20px_40px_rgba(168,85,247,0.3)]"
          >
            <Cpu className="text-white w-12 h-12" />
          </motion.div>
          <h2 className="text-4xl font-black aurora-text tracking-tighter mb-4">SYNTHESIZING_EXPERIENCE...</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">AI is mapping your aura...</p>
        </div>
      </div>
    ) : (
      <TemplateSelection onSelect={handleTemplateSelect} />
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 overflow-x-hidden relative bg-mesh">
      <div className="grain-overlay" />
      <motion.div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      
      {/* Background Aura Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: mousePos.x * 0.1, y: mousePos.y * 0.1 }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-600/20 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ x: mousePos.x * -0.05, y: mousePos.y * -0.05 }}
          className="absolute top-[40%] -right-[10%] w-[35%] h-[35%] bg-pink-600/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: mousePos.x * 0.08, y: mousePos.y * -0.08 }}
          className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full" 
        />
      </div>

      <Hero3D />

      <nav className="fixed top-0 w-full z-50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-morphism rounded-full px-8 py-4 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:rotate-12 transition-transform">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter aurora-text">AiFolio</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Aura', id: 'how-it-works' },
              { label: 'Market', id: 'templates' },
              { label: 'Price', id: 'pricing' }
            ].map((item) => (
              <button 
                key={item.label} 
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => scrollToSection(item.id)}
                className="text-[10px] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-[0.3em] relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all group-hover:w-full" />
              </button>
            ))}
            <MagneticButton 
              variant="primary" 
              className="!px-6 !py-2.5 !text-xs" 
              onClick={loginWithGoogle}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Sign In
            </MagneticButton>
          </div>
        </div>
      </nav>

      <main className="relative pt-44 pb-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-60">
            <motion.div style={{ scale }}>
              <motion.div 
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-10"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Operational V2.0 // Ai Core Live</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-8xl md:text-9xl font-black leading-[0.85] mb-10 tracking-tighter"
              >
                Evolve Your <br />
                <span className="aurora-text">Digital DNA.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-slate-400 mb-14 max-w-lg leading-relaxed font-medium"
              >
                Standard portfolios were for Web2. We bridge the gap between your career history and high-fidelity visual storytelling.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-6">
                <MagneticButton 
                  variant="gradient" 
                  onClick={() => scrollToSection('upload-zone')}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Analyze My Aura
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton 
                  variant="secondary" 
                  onClick={() => scrollToSection('templates')}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Marketplace
                </MagneticButton>
              </div>
            </motion.div>

            {/* Glass Upload Zone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              id="upload-zone"
            >
              <TiltCard className="p-16 text-center border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-[2rem] p-12 transition-all duration-700 ${
                    isDragging ? 'border-purple-500 bg-purple-500/10 scale-105 shadow-2xl shadow-purple-500/20' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                   <div className="relative mb-10">
                      <motion.div 
                        animate={isDragging ? { y: -30, rotate: 15 } : { y: 0, rotate: 0 }}
                        className="w-28 h-28 bg-white text-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl relative z-10"
                      >
                        <Upload className="w-12 h-12" />
                      </motion.div>
                      <div className="absolute inset-0 bg-purple-500/30 blur-[60px] rounded-full animate-pulse z-0" />
                   </div>
                  
                  <h3 className="text-4xl font-black mb-4 tracking-tighter">Sync Your Resume</h3>
                  <p className="text-slate-500 mb-10 font-black uppercase tracking-[0.4em] text-[10px]">Neural-Link Processing Enabled</p>
                  
                  <label className="cursor-pointer group">
                    <input type="file" className="hidden" onChange={handleFileChange} />
                    <span 
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="bg-gradient-to-tr from-purple-600 to-pink-500 text-white px-12 py-5 rounded-2xl font-black inline-flex items-center gap-3 group-hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                      Select Source
                    </span>
                  </label>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* Value Stack Grid */}
          <motion.section 
            id="how-it-works" 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-60"
          >
             <div className="text-center mb-24">
                <h2 className="text-6xl font-black mb-6 tracking-tighter">The Hyper-Stack</h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Proprietary AI // Liquid UI // Instant Deployment</p>
             </div>
             <div className="grid md:grid-cols-3 gap-10">
                {[
                  { icon: Cpu, title: 'Neural Engine', desc: 'Our proprietary model shatters your resume into 50+ data points for a perfect map.' },
                  { icon: Layout, title: 'Liquid Styles', desc: 'High-performance components that adapt to every screen with modern physics.' },
                  { icon: Globe, title: 'Vapor Deploy', desc: 'Zero downtime deployment to our globally distributed edge network.' }
                ].map((item, i) => (
                  <TiltCard key={i} className="p-10 border-white/5 hover:border-white/20 transition-colors group">
                     <div 
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="w-16 h-16 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-purple-500/30 transition-all"
                      >
                        <item.icon className="text-purple-400 w-8 h-8" />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                     <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </TiltCard>
                ))}
             </div>
          </motion.section>

          {/* Pricing Grid */}
          <motion.section 
            id="pricing" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-60"
          >
             <div className="text-center mb-32">
                <h2 className="text-7xl font-black mb-6 tracking-tighter">Pricing Model.</h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs underline decoration-purple-500 underline-offset-8">No hidden fees // No subscription trap</p>
             </div>
             
             <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                <TiltCard className="p-16 border-white/5 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 text-4xl font-black text-white/5">GUEST</div>
                   <h3 className="text-3xl font-black mb-4">The Nomad</h3>
                   <div className="text-6xl font-black mb-10 tracking-tighter">$0 <span className="text-xl text-slate-500">/ forever</span></div>
                   <ul className="space-y-4 mb-14 text-slate-400 font-medium">
                      <li className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /> All Templates Free</li>
                      <li className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /> AI Analysis (Standard)</li>
                      <li className="flex items-center gap-3"><CheckCircle className="text-green-500 w-5 h-5" /> No Login Required</li>
                   </ul>
                   <button 
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => scrollToSection('upload-zone')} 
                    className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black hover:bg-white/10 transition-all"
                  >
                    Start Free
                  </button>
                </TiltCard>

                <TiltCard className="p-16 border-purple-500/30 bg-purple-500/5 shadow-[0_0_50px_rgba(168,85,247,0.1)] relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 text-4xl font-black text-purple-500/10">PRO</div>
                   <div className="bg-purple-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full absolute top-10 right-10 uppercase tracking-widest shadow-lg">Most Popular</div>
                   <h3 className="text-3xl font-black mb-4 aurora-text">The Visionary</h3>
                   <div className="text-6xl font-black mb-10 tracking-tighter text-white">FREE <span className="text-xl text-slate-500">/ limited time</span></div>
                   <ul className="space-y-4 mb-14 text-slate-300 font-medium">
                      <li className="flex items-center gap-3"><CheckCircle className="text-purple-400 w-5 h-5" /> All Premium Templates</li>
                      <li className="flex items-center gap-3"><CheckCircle className="text-purple-400 w-5 h-5" /> Priority Neural Analysis</li>
                      <li className="flex items-center gap-3"><CheckCircle className="text-purple-400 w-5 h-5" /> Custom Domain (1Yr)</li>
                      <li className="flex items-center gap-3"><CheckCircle className="text-purple-400 w-5 h-5" /> Multi-Format Export</li>
                   </ul>
                   <button 
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => scrollToSection('upload-zone')}
                    className="w-full py-5 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl font-black shadow-2xl hover:scale-[1.03] transition-transform"
                  >
                    Go Pro Now
                  </button>
                </TiltCard>
             </div>
          </motion.section>

          {/* Wall of Aura */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-60 py-20 border-y border-white/5 relative"
          >
             <div className="absolute inset-0 bg-mesh opacity-10" />
             <div className="text-center mb-32 relative z-10">
                <h2 className="text-6xl font-black mb-8 tracking-tighter">Wall of Aura.</h2>
                <div className="flex justify-center gap-2">
                   {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-500 w-6 h-6 fill-yellow-500" />)}
                </div>
             </div>
             
             <div className="grid md:grid-cols-4 gap-8 relative z-10 px-6">
                {[
                   { name: '@kevin_dev', job: 'FullStack', text: 'Literally took 2 secs and now my portfolio looks like a triple-A game menu. Unreal.' },
                   { name: '@sara.design', job: 'UI Designer', text: 'I was skeptical of AI, but the template quality is actually insane. Gen-Z design language is 🤌' },
                   { name: '@marcus_t', job: 'PM at Nexus', text: 'Managed to get 3 interviews in a week after switching to AiFolio. The Aura is real.' },
                   { name: '@lina_cloud', job: 'DevOps', text: 'Best $25 I ever spent on my career. The 3D interactions are such a smooth flex.' }
                ].map((testimonial, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="glass-morphism p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all cursor-default hover-glow"
                  >
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-tr from-slate-700 to-slate-800 rounded-full flex items-center justify-center font-black">{testimonial.name[1].toUpperCase()}</div>
                        <div>
                           <div className="font-black text-sm">{testimonial.name}</div>
                           <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{testimonial.job}</div>
                        </div>
                     </div>
                     <p className="text-slate-400 font-medium text-sm italic leading-relaxed">"{testimonial.text}"</p>
                  </motion.div>
                ))}
             </div>
          </motion.section>

          {/* Final CTA */}
          <section className="mb-60 text-center">
             <motion.div
               whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="max-w-4xl mx-auto"
               viewport={{ once: true }}
             >
                <h2 className="text-8xl md:text-9xl font-black mb-12 tracking-tighter">Stop Browsing. <br /><span className="aurora-text">Start Building.</span></h2>
                <MagneticButton 
                  variant="gradient" 
                  className="!px-16 !py-8 !text-2xl mx-auto" 
                  onClick={() => scrollToSection('upload-zone')}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                   Generate My Portfolio <ArrowRight className="w-8 h-8" />
                </MagneticButton>
             </motion.div>
          </section>
        </div>
      </main>

      {/* Complex Footer */}
      <footer className="py-32 px-6 border-t border-white/5 bg-black/20 relative z-20">
         <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-20">
            <div className="md:col-span-4">
               <div className="flex items-center gap-2 mb-8" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                 <Sparkles className="text-purple-500 w-8 h-8" />
                 <span className="text-3xl font-black tracking-tighter aurora-text">AiFolio.</span>
               </div>
               <p className="text-slate-500 font-semibold leading-relaxed mb-10">
                  Building the high-fidelity future of career identity. Powered by the Gemini AI Engine & ultra-modern design systems.
               </p>
               <div className="flex gap-6">
                  {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors border-white/5 group"
                    >
                       <Icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    </a>
                  ))}
               </div>
            </div>
            
            <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
               <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-10">Product</h4>
                  <ul className="space-y-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                     <li><button onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => scrollToSection('templates')} className="hover:text-white transition-colors">Marketplace</button></li>
                     <li><button onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">Aura Engine</button></li>
                     <li><a onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-10">Resources</h4>
                  <ul className="space-y-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                     <li><a onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} href="#" className="hover:text-white transition-colors">Support</a></li>
                     <li><a onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} href="#" className="hover:text-white transition-colors">Docs</a></li>
                     <li><a onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} href="#" className="hover:text-white transition-colors">Creator Program</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-10">Legal</h4>
                  <ul className="space-y-6 text-xs font-black text-slate-500 uppercase tracking-widest">
                     <li><a onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} href="#" className="hover:text-white transition-colors">Privacy</a></li>
                     <li><a onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} href="#" className="hover:text-white transition-colors">Terms</a></li>
                     <li><a onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} href="#" className="hover:text-white transition-colors">Cookies</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-10">Status</h4>
                  <div className="flex flex-col gap-4">
                     <div className="bg-green-500/5 text-green-500 px-4 py-3 rounded-xl border border-green-500/20 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Ai Core Online
                     </div>
                     <div className="text-[10px] text-slate-600 font-bold font-mono">
                        © 2026 GEN_VOID
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      <BackToTop 
        visible={showBackToTop} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    </div>
  );
}
