import { useState, useEffect, useRef } from 'react';
import { Terminal, Wifi, Battery, Clock } from 'lucide-react';

export default function TerminalPortfolio({ responseData }) {
  const { extracted: data } = responseData || {};
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const profile = {
    name: data?.name || 'User Name',
    title: data?.position || 'Professional',
    email: data?.contact?.email || 'N/A',
    phone: data?.contact?.phone || 'N/A',
    location: data?.contact?.location || 'N/A',
    github: data?.github || 'N/A',
    linkedin: data?.linkedin || 'N/A',
    website: data?.website || 'N/A'
  };

  const ascii = `
    ___    __               ____        __                          
   /   |  / /__  _  __     / __ \\____  / /_  ____  _________  ____ 
  / /| | / / _ \\| |/_/    / / / / __ \\/ __ \\/ __ \\/ ___/ __ \\/ __ \\
 / ___ |/ /  __/>  <     / /_/ / /_/ / / / / / / (__  ) /_/ / / / /
/_/  |_/_/\\___/_/|_|    /_____/\\____/_/ /_/_/ /_/____/\\____/_/ /_/ 
  `;

  useEffect(() => {
    setHistory([
      { type: 'ascii', content: ascii },
      { type: 'system', content: '╔═══════════════════════════════════════════════════════════╗' },
      { type: 'system', content: `║  Welcome to ${profile.name}'s Interactive Terminal Portfolio  ║` },
      { type: 'system', content: '╚═══════════════════════════════════════════════════════════╝' },
      { type: 'success', content: '' },
      { type: 'info', content: '⚡ System initialized successfully' },
      { type: 'info', content: '🚀 Portfolio v2.0.0 loaded' },
      { type: 'success', content: '' },
      { type: 'output', content: 'Type "help" to see available commands or "about" to start.' },
      { type: 'output', content: '' }
    ]);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: {
      description: 'Display all available commands',
      execute: () => [
        { type: 'output', content: '╭─────────────────────────────────────────────────────────╮' },
        { type: 'output', content: '│                  AVAILABLE COMMANDS                     │' },
        { type: 'output', content: '╰─────────────────────────────────────────────────────────╯' },
        { type: 'success', content: '' },
        { type: 'command', content: '  about      →  Display personal information' },
        { type: 'command', content: '  skills     →  Show technical skills & expertise' },
        { type: 'command', content: '  experience →  View work experience' },
        { type: 'command', content: '  projects   →  Browse project portfolio' },
        { type: 'command', content: '  education  →  Show educational background' },
        { type: 'command', content: '  awards     →  Show recognition & awards' },
        { type: 'command', content: '  contact    →  Display contact information' },
        { type: 'command', content: '  resume     →  Download CV/Resume' },
        { type: 'command', content: '  social     →  View social media links' },
        { type: 'command', content: '  clear      →  Clear terminal screen' },
        { type: 'command', content: '  banner     →  Show welcome banner' },
        { type: 'success', content: '' },
        { type: 'info', content: '💡 Tip: Use ↑/↓ arrows to navigate command history' }
      ]
    },
    about: {
      description: 'Show about me',
      execute: () => [
        { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
        { type: 'success', content: '║                      ABOUT ME                          ║' },
        { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
        { type: 'output', content: '' },
        { type: 'output', content: `👤 Name:     ${profile.name}` },
        { type: 'output', content: `💼 Role:     ${profile.title}` },
        { type: 'output', content: `📍 Location: ${profile.location}` },
        { type: 'output', content: '' },
        { type: 'info', content: '📝 Bio:' },
        ... (data?.professional_summary ? data.professional_summary.match(/.{1,60}(\s|$)/g).map(line => ({ type: 'output', content: `   ${line.trim()}` })) : [{ type: 'output', content: '   No summary available.' }]),
        { type: 'output', content: '' },
        { type: 'success', content: '✨ Always learning, always building!' }
      ]
    },
    skills: {
      description: 'Show technical skills',
      execute: () => {
        const skillEntries = [];
        if (data?.skills) {
          Object.entries(data.skills).forEach(([category, list]) => {
             if (list && list.length > 0) {
                skillEntries.push({ type: 'info', content: `▸ ${category}:` });
                skillEntries.push({ type: 'output', content: `   ${list.join(', ')}` });
                skillEntries.push({ type: 'output', content: '' });
             }
          });
        }
        return [
          { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
          { type: 'success', content: '║                  TECHNICAL SKILLS                      ║' },
          { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
          { type: 'output', content: '' },
          ...skillEntries.length > 0 ? skillEntries : [{ type: 'output', content: '   No skills data available.' }]
        ];
      }
    },
    experience: {
      description: 'Show work experience',
      execute: () => {
        const expEntries = [];
        if (data?.experience) {
          data.experience.forEach(exp => {
            expEntries.push({ type: 'info', content: `🏢 ${exp.title}` });
            expEntries.push({ type: 'output', content: `   📍 ${exp.company}` });
            expEntries.push({ type: 'output', content: `   📅 ${exp.years}` });
            if (exp.description) {
               const descriptors = Array.isArray(exp.description) ? exp.description : [exp.description];
               descriptors.forEach(desc => {
                 expEntries.push({ type: 'output', content: `   • ${desc}` });
               });
            }
            expEntries.push({ type: 'output', content: '' });
          });
        }
        return [
          { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
          { type: 'success', content: '║                  WORK EXPERIENCE                       ║' },
          { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
          { type: 'output', content: '' },
          ...expEntries.length > 0 ? expEntries : [{ type: 'output', content: '   No experience data available.' }]
        ];
      }
    },
    projects: {
      description: 'Show projects',
      execute: () => {
         const projEntries = [];
         if (data?.projects) {
           data.projects.forEach(proj => {
             projEntries.push({ type: 'info', content: `🚀 ${proj.title}` });
             projEntries.push({ type: 'output', content: `   Tech: ${proj.tech || 'N/A'}` });
             projEntries.push({ type: 'output', content: `   Desc: ${proj.description || 'N/A'}` });
             projEntries.push({ type: 'output', content: '' });
           });
         }
        return [
          { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
          { type: 'success', content: '║                  PROJECT PORTFOLIO                     ║' },
          { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
          { type: 'output', content: '' },
          ...projEntries.length > 0 ? projEntries : [{ type: 'output', content: '   No projects data available.' }]
        ]
      }
    },
    education: {
      description: 'Show education',
      execute: () => {
         const eduEntries = [];
         if (data?.education) {
           data.education.forEach(edu => {
             eduEntries.push({ type: 'info', content: `🎓 ${edu.degree}` });
             eduEntries.push({ type: 'output', content: `   🏫 ${edu.institution}` });
             eduEntries.push({ type: 'output', content: `   📅 ${edu.start_year} - ${edu.end_year}` });
             eduEntries.push({ type: 'output', content: `   📊 GPA/CGPA: ${edu.cgpa || 'N/A'}` });
             eduEntries.push({ type: 'output', content: '' });
           });
         }
        return [
          { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
          { type: 'success', content: '║                     EDUCATION                          ║' },
          { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
          { type: 'output', content: '' },
          ...eduEntries.length > 0 ? eduEntries : [{ type: 'output', content: '   No education data available.' }]
        ]
      }
    },
    awards: {
      description: 'Show awards',
      execute: () => {
         const awardEntries = [];
         if (data?.awards) {
           data.awards.forEach(award => {
             awardEntries.push({ type: 'info', content: `🏆 ${award.title}` });
             awardEntries.push({ type: 'output', content: `   🏢 ${award.issuer}` });
             awardEntries.push({ type: 'output', content: `   📅 ${award.date}` });
             awardEntries.push({ type: 'output', content: '' });
           });
         }
        return [
          { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
          { type: 'success', content: '║                  AWARDS & RECOGNITION                  ║' },
          { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
          { type: 'output', content: '' },
          ...awardEntries.length > 0 ? awardEntries : [{ type: 'output', content: '   No awards data available.' }]
        ]
      }
    },
    contact: {
      description: 'Show contact info',
      execute: () => [
        { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
        { type: 'success', content: '║                  CONTACT INFORMATION                   ║' },
        { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
        { type: 'output', content: '' },
        { type: 'output', content: '📧 Email:    ' + profile.email },
        { type: 'output', content: '📱 Phone:    ' + profile.phone },
        { type: 'output', content: '📍 Location: ' + profile.location },
        { type: 'output', content: '' },
        { type: 'success', content: '💌 Feel free to reach out for collaborations or opportunities!' }
      ]
    },
    social: {
      description: 'Show social links',
      execute: () => [
        { type: 'success', content: '╔════════════════════════════════════════════════════════╗' },
        { type: 'success', content: '║                   SOCIAL LINKS                         ║' },
        { type: 'success', content: '╚════════════════════════════════════════════════════════╝' },
        { type: 'output', content: '' },
        { type: 'info', content: '🔗 GitHub:   ' + profile.github },
        { type: 'info', content: '🔗 LinkedIn: ' + profile.linkedin },
        { type: 'output', content: '' },
        { type: 'success', content: '👋 Connect with me on any platform!' }
      ]
    },
    resume: {
      description: 'Download resume',
      execute: () => [
        { type: 'success', content: '📄 Preparing resume download...' },
        { type: 'loading', content: '[████████████████████] 100%' },
        { type: 'success', content: '✅ Resume download link ready!' },
        { type: 'info', content: '📥 Contact the owner for the direct file access.' }
      ]
    },
    clear: {
      description: 'Clear terminal',
      execute: () => []
    },
    banner: {
      description: 'Show banner',
      execute: () => [
        { type: 'ascii', content: ascii },
        { type: 'system', content: '╔═══════════════════════════════════════════════════════════╗' },
        { type: 'system', content: `║  Welcome to ${profile.name}'s Interactive Terminal Portfolio  ║` },
        { type: 'system', content: '╚═══════════════════════════════════════════════════════════╝' },
        { type: 'output', content: '' }
      ]
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    const newHistory = [
      ...history,
      { type: 'input', content: `visitor@portfolio:~$ ${cmd}` }
    ];

    if (!trimmedCmd) {
      setHistory([...newHistory, { type: 'output', content: '' }]);
      return;
    }

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (commands[trimmedCmd]) {
      setHistory([...newHistory, ...commands[trimmedCmd].execute(), { type: 'output', content: '' }]);
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', content: `Command not found: ${trimmedCmd}` },
        { type: 'info', content: 'Type "help" to see available commands' },
        { type: 'output', content: '' }
      ]);
    }

    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div className="h-screen bg-black text-green-400 font-mono flex flex-col overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Terminal className="w-4 h-4" />
            <span className="text-sm">portfolio@terminal</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            <span>Connected</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-3 h-3" />
            <span>100%</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 pb-0"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-1">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`
                ${item.type === 'input' ? 'text-cyan-400 font-semibold' : ''}
                ${item.type === 'error' ? 'text-red-400' : ''}
                ${item.type === 'success' ? 'text-green-400' : ''}
                ${item.type === 'info' ? 'text-blue-400' : ''}
                ${item.type === 'command' ? 'text-yellow-300' : ''}
                ${item.type === 'skill' ? 'text-purple-400' : ''}
                ${item.type === 'system' ? 'text-cyan-300 font-semibold' : ''}
                ${item.type === 'ascii' ? 'text-green-500 text-xs leading-tight' : ''}
                ${item.type === 'loading' ? 'text-yellow-400' : ''}
                ${item.type === 'output' ? 'text-gray-300' : ''}
                whitespace-pre-wrap
              `}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Input */}
      <div className="p-4 flex items-center gap-2 border-t border-gray-800">
        <span className="text-cyan-400 font-semibold">visitor@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 font-mono"
          placeholder="Type a command..."
          autoFocus
          spellCheck="false"
        />
        <span className="text-gray-600 text-xs">Press Tab for autocomplete</span>
      </div>

      {/* Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan"></div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  );
}