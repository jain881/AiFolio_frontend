import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Code, Briefcase, GraduationCap, Award, ExternalLink, Download, Terminal, ChevronRight } from 'lucide-react';

export default function NeoStackPortfolio({responseData}) {
const {extracted:data} = responseData;
const [activeSection, setActiveSection] = useState('about');
const [terminalMode, setTerminalMode] = useState(false);
const [terminalInput, setTerminalInput] = useState('');
const [terminalOutput, setTerminalOutput] = useState([
{ type: 'system', text: 'Welcome to Portfolio Terminal v1.0' },
{ type: 'system', text: 'Type "help" for available commands' }
]);

const personalInfo = {
name: data?.name ? data.name.toUpperCase() : null,
title: data?.position || null,
email: data?.contact?.email || null,
phone: data?.contact?.phone || null,
location: data?.contact?.location || null,
github: data?.github || null,
linkedin: data?.linkedin || null,
};

const skills = {
Backend: data?.skills?.Backend || [],
Architecture: data?.skills?.Architecture || [],
Databases: data?.skills?.Databases || [],
"Cloud/DevOps": data?.skills?.["Cloud / DevOps"] || [],
Frontend: data?.skills?.Frontend || [],
Security: data?.skills?.Authentication || [],
"AI/Tools": data?.skills?.["AI / Tools"] || [],
};

const experience = data?.experience?.length
? data.experience.map((job) => ({
company: job.company,
position: job.title,
period: job.years,
highlights: job.description
? Array.isArray(job.description)
? job.description
.map((point) => point.trim())
.filter((point) => point)
: job.description.split("\n")
: [],
}))
: [];

// const projects = [
//   {
//     name: 'E-Commerce Platform',
//     tech: 'React, Node.js, PostgreSQL',
//     description: 'Full-featured online store with payment integration',
//     link: '#'
//   },
//   {
//     name: 'Task Management System',
//     tech: 'Next.js, MongoDB, Tailwind',
//     description: 'Collaborative project management tool',
//     link: '#'
//   },
//   {
//     name: 'Real-time Chat App',
//     tech: 'React, Socket.io, Express',
//     description: 'Instant messaging with file sharing',
//     link: '#'
//   }
// ];

const projects = data?.projects?.length
? data.projects.map((project) => ({
title: project.title,
tech: project.tech || "Tech Stack N/A",
description: project.description || "No description available.",
gradient: "from-purple-600 to-blue-600",
}))
: [];
  
const awards = data?.awards?.length
? data.awards.map((award) => ({
title: award.title,
company: award.issuer,
date: award.date,
}))
: [];

const education = data?.education?.length
? data.education.map((edu) => ({
institution: edu.institution,
degree: edu.degree,
field_of_study: edu.field_of_study,
cgpa: edu.cgpa,
start_year: edu.start_year,
end_year: edu.end_year,
}))
: [];

const handleTerminalCommand = (cmd) => {
const command = cmd.trim().toLowerCase();
let response = [];

switch(command) {
case 'help':
response = [
{ type: 'command', text: `> ${cmd}` },
{ type: 'output', text: 'Available commands:' },
{ type: 'output', text: '  about    - Show personal information' },
{ type: 'output', text: '  skills   - List technical skills' },
{ type: 'output', text: '  work     - Display work experience' },
{ type: 'output', text: '  projects - Show project portfolio' },
{ type: 'output', text: '  contact  - Show contact information' },
{ type: 'output', text: '  clear    - Clear terminal' },
{ type: 'output', text: '  exit     - Return to GUI mode' }
];
break;
case 'about':
response = [
{ type: 'command', text: `> ${cmd}` },
{ type: 'output', text: `Name: ${personalInfo.name}` },
{ type: 'output', text: `Role: ${personalInfo.title}` },
{ type: 'output', text: `Location: ${personalInfo.location}` }
];
break;
case 'skills':
response = [
{ type: 'command', text: `> ${cmd}` },
...Object.entries(skills).flatMap(([category, skillList]) => 
  Array.isArray(skillList) && skillList.length > 0 ? [{
    type: 'output',
    text: `${category}: ${skillList.join(', ')}`
  }] : []
) 
];
break;
case 'work':
response = [
{ type: 'command', text: `> ${cmd}` },
...(Array.isArray(experience) ? experience : []).map(exp => ({ 
type: 'output', 
text: `${exp.position} @ ${exp.company} (${exp.period})` 
}))
];
break;
case 'projects':
response = [
{ type: 'command', text: `> ${cmd}` },
...projects.map(proj => ({ 
type: 'output', 
text: `${proj.name} - ${proj.tech}` 
}))
];
break;
case 'contact':
response = [
{ type: 'command', text: `> ${cmd}` },
{ type: 'output', text: `Email: ${personalInfo.email}` },
{ type: 'output', text: `Phone: ${personalInfo.phone}` },
{ type: 'output', text: `GitHub: ${personalInfo.github}` }
];
break;
case 'clear':
setTerminalOutput([]);
return;
case 'exit':
setTerminalMode(false);
return;
default:
response = [
{ type: 'command', text: `> ${cmd}` },
{ type: 'error', text: `Command not found: ${cmd}` },
{ type: 'output', text: 'Type "help" for available commands' }
];
}

setTerminalOutput([...terminalOutput, ...response]);
};



if (terminalMode) {
return (
<div className="min-h-screen bg-black text-green-400 font-mono p-4">
<div className="max-w-4xl mx-auto">
<div className="mb-4 flex justify-between items-center">
<div className="flex items-center gap-2">
<Terminal className="w-5 h-5" />
<span className="text-sm">portfolio@terminal:~$</span>
</div>
<button
onClick={() => setTerminalMode(false)}
className="text-xs bg-green-900/30 px-3 py-1 rounded hover:bg-green-900/50"
>
Exit Terminal
</button>
</div>
          
<div className="space-y-1 mb-4 max-h-[70vh] overflow-y-auto">
{terminalOutput.map((line, idx) => (
<div key={idx} className={`
${line.type === 'command' ? 'text-yellow-400' : ''}
${line.type === 'error' ? 'text-red-400' : ''}
${line.type === 'system' ? 'text-blue-400' : ''}
`}>
{line.text}
</div>
))}
</div>

<div className="flex items-center gap-2">
<span className="text-green-500">$</span>
<input
type="text"
value={terminalInput}
onChange={(e) => setTerminalInput(e.target.value)}
onKeyPress={(e) => {
if (e.key === 'Enter') {
e.preventDefault();
if (terminalInput.trim()) {
handleTerminalCommand(terminalInput);
setTerminalInput('');
}
}
}}
className="flex-1 bg-transparent outline-none text-green-400"
placeholder="Type a command..."
autoFocus
/>
</div>
</div>
</div>
);
}
return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
{/* Animated Background */}
<div className="fixed inset-0 overflow-hidden pointer-events-none">
<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
</div>

<div className="relative z-10 max-w-6xl mx-auto p-6">
{/* Header */}
<header className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 mb-6 border border-white/20 shadow-2xl">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div className="flex items-start gap-6">
<div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
{personalInfo.name.split(' ').map(n => n[0]).join('')}
</div>
<div>
<h1 className="text-4xl font-bold text-white mb-2">{personalInfo.name}</h1>
<p className="text-xl text-purple-300 mb-3">{personalInfo.title}</p>
<div className="flex flex-wrap gap-4 text-sm text-gray-300">
                 
{personalInfo.location && (
<span className="flex items-center gap-2">
<MapPin className="w-4 h-4" /> {personalInfo.location}
</span>
)}
{
personalInfo.github && (
<a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
<Github className="w-4 h-4" /> GitHub   
</a>
)}
{ personalInfo.linkedin && (
<a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
<Linkedin className="w-4 h-4" /> LinkedIn
</a>
)}  
{ personalInfo.email && (
<a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition">
<Mail className="w-4 h-4" /> {personalInfo.email}
</a>
)}
{ personalInfo.phone && (
<span className="flex items-center gap-2">
<Phone className="w-4 h-4" /> {personalInfo.phone}
</span>
) 
}
                 
                  
</div>
</div>
</div>
<div className="flex gap-3">
<button
onClick={() => setTerminalMode(true)}
className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition flex items-center gap-2"
>
<Terminal className="w-4 h-4" />
Terminal
</button>
<button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition flex items-center gap-2">
<Download className="w-4 h-4" />
Resume
</button>
</div>
</div>
</header>

{/* Navigation */}
<nav className="backdrop-blur-lg bg-white/10 rounded-2xl p-2 mb-6 border border-white/20 flex flex-wrap gap-2">
{['about', 'experience', 'projects', 'skills', 'education'].map(section => (
<button
key={section}
onClick={() => setActiveSection(section)}
className={`px-6 py-3 rounded-xl transition capitalize font-medium ${
activeSection === section
? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
: 'text-gray-300 hover:bg-white/10'
}`}
>
{section}
</button>
))}
</nav>

{/* Content */}
<main className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
{activeSection === 'about' && (
<div className="space-y-6">
<h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
<Code className="w-8 h-8 text-purple-400" />
About Me
</h2>
<p className="text-gray-300 text-lg leading-relaxed">
Passionate Full Stack Developer with 4+ years of experience building scalable web applications.
Specialized in React, Node.js, and cloud technologies. Love solving complex problems and creating
elegant solutions that make a real impact.
</p>
<div className="flex gap-4 mt-6">
<a href="#" className="text-purple-400 hover:text-purple-300 transition">
<Github className="w-6 h-6" />
</a>
<a href="#" className="text-purple-400 hover:text-purple-300 transition">
<Linkedin className="w-6 h-6" />
</a>
<a href="#" className="text-purple-400 hover:text-purple-300 transition">
<Mail className="w-6 h-6" />
</a>
</div>
</div>
)}

{activeSection === 'experience' && (
<div className="space-y-6">
<h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
<Briefcase className="w-8 h-8 text-purple-400" />
Work Experience
</h2>
{experience.map((exp, idx) => (
<div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition">
<div className="flex justify-between items-start mb-3">
<div>
<h3 className="text-xl font-bold text-white">{exp.position}</h3>
<p className="text-purple-300">{exp.company}</p>
</div>
<span className="text-sm text-gray-400 bg-purple-900/30 px-3 py-1 rounded-full">{exp.period}</span>
</div>
{
exp.highlights.length > 0 && (
<ul className="space-y-2 mb-3">
{exp.highlights.map((highlight, i) => ( 
<li key={i} className="text-sm text-gray-400 flex items-start gap-2">
<ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
{highlight}
</li>
))}
</ul>
)
}
<p className="text-gray-300 mb-3">{exp.description}</p>
{/* <ul className="space-y-2">
{exp?.achievements.map((achievement, i) => (
<li key={i} className="text-sm text-gray-400 flex items-start gap-2">
<ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
{achievement}
</li>
))}
</ul> */}
</div>
))}
</div>
)}

{activeSection === 'projects' && (
<div className="space-y-6">
<h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
<Code className="w-8 h-8 text-purple-400" />
Featured Projects
</h2>
<div className="grid md:grid-cols-2 gap-6">
{projects.map((project, idx) => (
<div key={idx} className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition group">
<h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition">{project.name}</h3>
<p className="text-sm text-purple-300 mb-3">{project.tech}</p>
<p className="text-gray-300 mb-4">{project.description}</p>
<a href={project.link} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition">
View Project <ExternalLink className="w-4 h-4" />
</a>
</div>
))}
</div>
</div>
)}

{activeSection === 'skills' && (
<div className="space-y-6">
<h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
<Award className="w-8 h-8 text-purple-400" />
Technical Skills
</h2>
<div className="space-y-6">
<div>
{Object.entries(skills).map(([skill,values], idx) => (
<>
<h3 key={idx} className="text-xl font-semibold text-purple-300 mb-3">{Object.keys(skills)[idx]}</h3>
<div className="flex flex-wrap gap-3 mb-4">
{(values).map((s, i) => (  
<span key={i} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white px-4 py-2 rounded-lg">
{s}
</span>
))}
</div>
</>
))}
{/* <h3 className="text-xl font-semibold text-purple-300 mb-3">Frontend</h3>
<div className="flex flex-wrap gap-3">
{data?.skills.map((skill, idx) => (
<span key={idx} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white px-4 py-2 rounded-lg">
{skill}
</span>
))}
</div> */}
</div>
{/* <div>
<h3 className="text-xl font-semibold text-purple-300 mb-3">Backend</h3>
<div className="flex flex-wrap gap-3">
{skills.backend.map((skill, idx) => (
<span key={idx} className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-white px-4 py-2 rounded-lg">
{skill}
</span>
))}
</div>
</div>
<div>
<h3 className="text-xl font-semibold text-purple-300 mb-3">Tools & Technologies</h3>
<div className="flex flex-wrap gap-3">
{skills.tools.map((skill, idx) => (
<span key={idx} className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-white px-4 py-2 rounded-lg">
{skill}
</span>
))}
</div>
</div> */}
</div>
</div>
)}

{activeSection === 'education' && (
<div className="space-y-6">
<h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
<GraduationCap className="w-8 h-8 text-purple-400" />
Education
</h2>
{education.map((edu, idx) => (
<div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/10">
<h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
<p className="text-purple-300 mb-2">{edu.field_of_study}</p>
<div className="flex justify-between text-sm text-gray-400">
<span>{edu.start_year} - {edu.end_year}</span>
<span>GPA: {edu.cgpa}</span>
</div>
</div>
))}
</div>
)}
</main>

{/* Footer */}
<footer className="text-center text-gray-400 mt-8 pb-4">
<p>© 2024 {personalInfo.name}. Built with React & Tailwind CSS</p>
</footer>
</div>
</div>
);
}

