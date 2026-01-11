import React from 'react';
import NeoStackPortfolio from './PaidPortfolio/NeoStackPortfolio';
import TerminalPortfolio from './PaidPortfolio/TerminalPortfolio';
import MinimalistPortfolio from './PaidPortfolio/MinimalistPortfolio';
import CyberpunkPortfolio from './PaidPortfolio/CyberpunkPortfolio';
import Nexus3DPortfolio from './PaidPortfolio/Nexus3DPortfolio';
import ArcadePortfolio from './PaidPortfolio/ArcadePortfolio';
import CinematicPortfolio from './PaidPortfolio/CinematicPortfolio';
import LuminaPortfolio from './PaidPortfolio/LuminaPortfolio';
import IdeaPortfolio from './PaidPortfolio/IdeaPortfolio';
import MainPage from './MainPage';
import { X, Palette, Terminal, Zap, Star, Check, Layout, Radio, User, Gamepad2, Calendar, Sparkles, Target, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const staticData = {
  extracted: {
    name: "ALEX CHEN",
    position: "Full-Stack Developer",
    experience_years: "5",
    professional_summary: "Passionate developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and Cloud Architecture.",
    contact: {
      email: "alex.chen@example.com",
      phone: "+1 (555) 000-1234",
      location: "San Francisco, CA"
    },
    skills: {
      Backend: ["Node.js", "Python", "Go"],
      Frontend: ["React", "Next.js", "Tailwind CSS"],
      Databases: ["PostgreSQL", "MongoDB", "Redis"],
      "Cloud / DevOps": ["AWS", "Docker", "Kubernetes"],
      "AI / Tools": ["Gemini API", "OpenAI", "PyTorch"],
      "Soft Skills": ["Leadership", "Agile", "Public Speaking"]
    },
    experience: [
      {
        company: "Tech Solutions Inc.",
        title: "Senior Developer",
        years: "2021 - Present",
        description: ["Led a team of 5 developers", "Reduced API latency by 40%", "Implemented CI/CD pipelines"]
      }
    ],
    projects: [
      {
        title: "AI Portfolio Generator",
        tech: "React, Gemini API, Node.js",
        description: "An automated tool to generate stunning portfolios from CVs."
      }
    ],
    awards: [
      { title: "Innovation Award", issuer: "Tech Giants Forum", date: "2023" }
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "B.S. Computer Science",
        field_of_study: "Information Systems",
        start_year: "2016",
        end_year: "2020",
        cgpa: "3.9"
      }
    ],
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  }
};

const templates = [
  {
    id: 'standard',
    name: 'Standard Aesthetic',
    description: 'Clean, professional design with a smooth rainbow gradient effect.',
    price: 'Free',
    icon: Palette,
    features: ['Responsive Layout', 'Rainbow Theme', 'Skill Visualization'],
    color: 'from-blue-400 to-cyan-400',
    tag: 'Professional',
    previewImg: '/standard_preview.png'
  },
  {
    id: 'terminal',
    name: 'Developer Terminal',
    description: 'A retro-style interactive terminal experience for developers.',
    price: 'Free',
    icon: Terminal,
    features: ['Retro Vibe', 'Interactive Commands', 'CLI Experience'],
    color: 'from-green-400 to-emerald-500',
    tag: 'Classic',
    previewImg: '/terminal_preview.png'
  },
  {
    id: 'neostack',
    name: 'Modern NeoStack',
    description: 'Cutting-edge premium design with modern glassmorphism and animations.',
    price: 'Free',
    icon: Zap,
    features: ['Premium Animations', 'Glassmorphism', 'Tech-first Look'],
    color: 'from-purple-500 to-pink-500',
    tag: 'Premium',
    featured: true,
    previewImg: '/neostack_preview.png'
  },
  {
    id: 'minimalist',
    name: 'Minimalist Executive',
    description: 'Sophisticated whitespace and serif typography for a premium feel.',
    price: 'Free',
    icon: Layout,
    features: ['Executive Style', 'Mobile Optimized', 'High Contrast'],
    color: 'from-slate-700 to-slate-900',
    tag: 'Clean',
    previewImg: '/minimalist_preview.png'
  },
  {
    id: 'cyberpunk',
    name: 'Retro Cyberpunk',
    description: 'High-tech Sci-Fi aesthetic with neon accents and glitch effects.',
    price: 'Free',
    icon: Radio,
    features: ['Glitch Effects', 'Neon Highlights', 'Animated HUD'],
    color: 'from-cyan-500 to-pink-500',
    tag: 'Sci-Fi',
    previewImg: '/cyberpunk_preview.png'
  },
  {
    id: 'nexus',
    name: 'Nexus 3D',
    description: 'Ultra-modern 3D portfolio with a holographic AI avatar and interactive OS UI.',
    price: 'Free',
    icon: User,
    features: ['3D Hologram', 'OS Interface', 'Particle Effects'],
    color: 'from-purple-600 to-indigo-600',
    tag: 'Next-Gen',
    previewImg: '/nexus_preview.png'
  },
  {
    id: 'arcade',
    name: 'Arcade Rush',
    description: 'Vibrant cartoon/game theme with interactive score system and bouncy animations.',
    price: 3, // Base price per day in USD
    icon: Gamepad2,
    features: ['Game UI', 'Interactive Score', 'Cartoon Aesthetic'],
    color: 'from-yellow-400 to-pink-500',
    tag: 'Fun',
    dayPrice: 3,
    previewImg: '/arcade_preview.png'
  },
  {
    id: 'cinematic',
    name: 'Cinematic Noir',
    description: 'Minimalist, high-end studio aesthetic with elegant typography and atmospheric scrolling.',
    price: 5, // Base price per day
    icon: Layout,
    features: ['Studio Aesthetic', 'Atmospheric Transitions', 'Premium Serif'],
    color: 'from-white to-slate-400',
    tag: 'Elite',
    dayPrice: 5,
    previewImg: '/cinematic_preview.png'
  },
  {
    id: 'lumina',
    name: 'Lumina Dream',
    description: 'Soft pastel gradients and organic mesh backgrounds for a dreamy aesthetic.',
    price: 4,
    icon: Sparkles,
    features: ['Mesh Gradients', 'Dreamy Aesthetic', 'Floating UI'],
    color: 'from-blue-200 to-purple-200',
    tag: 'Aesthetic',
    dayPrice: 4,
    previewImg: '/lumina_preview.png'
  },
  {
    id: 'idea',
    name: 'Idea Spark',
    description: 'Industrial-minimalist theme with a dynamic descending and flickering light bulb.',
    price: 6,
    icon: Lightbulb,
    features: ['Dynamic Lighting', 'Flicker Effect', 'Industrial Aesthetic'],
    color: 'from-zinc-800 to-yellow-600',
    tag: 'Innovative',
    dayPrice: 6,
    previewImg: '/idea_preview.png'
  }
];

export default function TemplateSelection({ onSelect }) {
  const [previewId, setPreviewId] = React.useState(null);
  const [days, setDays] = React.useState(7);

  const calculateTotalPrice = (basePrice) => {
    if (basePrice === 'Free') return 'Free';
    return (basePrice * days).toFixed(2);
  };

  const handleSelect = (templateId) => {
    onSelect(templateId, days);
  };

  const renderPreview = () => {
    if (!previewId) return null;

    let PreviewComponent;
    switch (previewId) {
      case 'neostack':
        PreviewComponent = NeoStackPortfolio;
        break;
      case 'terminal':
        PreviewComponent = TerminalPortfolio;
        break;
      case 'minimalist':
        PreviewComponent = MinimalistPortfolio;
        break;
      case 'cyberpunk':
        PreviewComponent = CyberpunkPortfolio;
        break;
      case 'nexus':
        PreviewComponent = Nexus3DPortfolio;
        break;
      case 'arcade':
        PreviewComponent = ArcadePortfolio;
        break;
      case 'cinematic':
        PreviewComponent = CinematicPortfolio;
        break;
      case 'lumina':
        PreviewComponent = LuminaPortfolio;
        break;
      case 'idea':
        PreviewComponent = IdeaPortfolio;
        break;
      case 'standard':
        PreviewComponent = MainPage;
        break;
      default:
        return null;
    }

    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-[100] bg-slate-900 flex flex-col"
        >
          <div className="bg-slate-800/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-4">
               <h3 className="text-white font-bold text-xl uppercase tracking-wider">{previewId} Preview</h3>
               <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full border border-purple-500/30">STATIC DATA MODE</span>
            </div>
            <button 
              onClick={() => setPreviewId(null)}
              className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-slate-900 pointer-events-auto opacity-100">
            <PreviewComponent responseData={staticData} />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4">
      {renderPreview()}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-purple-400">Portfolio Style</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Uploaded! Now select a template to showcase your professional profile.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-12 bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Calendar className="text-purple-400" /> DEPLOYMENT DURATION
           </h3>
           <div className="w-full max-w-xl">
             <div className="flex justify-between mb-4 text-sm font-bold text-slate-400">
               <span>1 DAY</span>
               <span className="text-purple-400 text-lg uppercase">{days} DAYS SELECTED</span>
               <span>365 DAYS</span>
             </div>
             <input 
               type="range" 
               min="1" 
               max="365" 
               value={days} 
               onChange={(e) => setDays(parseInt(e.target.value))}
               className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
             />
             <div className="mt-4 text-center text-xs text-slate-500 font-medium">
                Portfolio will be automatically removed after {days} days unless renewed.
             </div>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
        >
          {templates.map((template) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={template.id}
              className={`relative bg-slate-800/30 backdrop-blur-xl border ${
                template.featured ? 'border-purple-500 shadow-2xl shadow-purple-500/20' : 'border-slate-700'
              } rounded-3xl p-8 flex flex-col h-full transition-all duration-300 group/card cursor-default`}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {template.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-white" />
                  Most Popular
                </div>
              )}

              <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden group">
                 <img 
                    src={template.previewImg} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
                 <button
                    onClick={() => setPreviewId(template.id)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                 >
                    Show Preview
                 </button>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{template.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{template.tag}</span>
                </div>
                <div className="text-right">
                  <div className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3 inline-block border border-purple-500/20">
                    {template.price === 'Free' ? 'LIFETIME FREE' : `$${template.dayPrice} / DAY`}
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-start gap-1">
                      <span className="text-xl font-bold text-white mt-1">$</span>
                      <span className="text-5xl font-black text-white tracking-tighter">
                        {calculateTotalPrice(template.price)}
                      </span>
                    </div>
                    {template.price !== 'Free' && (
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Target className="w-3 h-3 text-emerald-500" />
                        TOTAL_RENTAL_{days}_DAYS
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                {template.description}
              </p>

              <div className="space-y-3 mb-8 flex-1">
                {template.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-slate-300">
                    <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-slate-700/50 flex items-center justify-center`}>
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelect(template.id)}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 ${
                  template.featured
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/25'
                    : 'bg-white text-slate-900 hover:bg-slate-200'
                }`}
              >
                Launch Protocol
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
