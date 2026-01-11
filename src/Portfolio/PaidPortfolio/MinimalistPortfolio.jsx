import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, ChevronRight, FileText } from 'lucide-react';

export default function MinimalistPortfolio({ responseData, isPreview }) {
  const staticData = {
    extracted: {
      name: "Alexandra Chen",
      position: "Executive Strategy Director",
      contact: {
        email: "alexandra.chen@example.com",
        phone: "+1 (555) 000-1111",
        location: "Singapore / Global"
      },
      skills: {
        "Core Expertise": ["Strategic Planning", "Market Growth", "Operations", "Digital Transformation"],
        "Leadership": ["Team Development", "Stakeholder Mgmt", "Global P&L"],
        "Technical": ["AI Implementation", "Cloud Strategy", "Data Analytics"]
      },
      experience: [
        {
          company: "Global Tech Corp",
          title: "Senior Strategy Director",
          years: "2020 - Present",
          description: "Leading digital transformation initiatives for Fortune 500 clients. Managed $50M portfolio."
        },
        {
          company: "Innovation Hub",
          title: "Strategic Consultant",
          years: "2016 - 2020",
          description: "Architected market entry strategies for emerging Asian markets."
        }
      ],
      education: [
        {
            institution: "INSEAD",
            degree: "MBA",
            field_of_study: "Global Management",
            start_year: "2014",
            end_year: "2015",
            cgpa: "3.9/4.0"
        }
      ],
      projects: [
        { title: "Project: Global Sustainability Initiative", tech: "Strategic Planning, ESG Compliance", description: "Led a cross-functional team to reduce carbon footprint by 30% across 12 global sites." },
        { title: "Project: Future City Urban Planning", tech: "Smart City Tech, AI Ethics", description: "Consulted on the development of AI-driven urban infrastructure for the 2030 smart city project." }
      ]
    }
  };

  const finalData = isPreview ? staticData : responseData;
  const data = finalData?.extracted || {};
  const [activeSection, setActiveSection] = useState('experience');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-serif selection:bg-slate-200">
      <div className="max-w-5xl mx-auto px-8 py-20">
        
        {/* Header - Executive Style */}
        <header className="border-b border-slate-200 pb-12 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-8">
            <h1 className="text-5xl font-light tracking-tight text-slate-900 uppercase">
              {data.name || "Portfolio"}
            </h1>
            <span className="text-xl text-slate-500 font-sans tracking-widest uppercase">
              {data.position || "Professional"}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-sans tracking-wider text-slate-400 uppercase">
            {data.contact?.email && (
              <a href={`mailto:${data.contact.email}`} className="hover:text-slate-900 transition flex items-center gap-2">
                <Mail className="w-3 h-3" /> {data.contact.email}
              </a>
            )}
            {data.contact?.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-3 h-3" /> {data.contact.location}
              </span>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition flex items-center gap-2">
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-3">
            <nav className="flex flex-col gap-6 font-sans text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
              {['experience', 'projects', 'skills', 'education', 'awards'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-left transition-all duration-300 hover:text-slate-900 ${
                    activeSection === section ? 'text-slate-900 translate-x-2' : ''
                  }`}
                >
                  {activeSection === section && <span className="absolute -left-4">/</span>}
                  {section}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="md:col-span-9">
            {activeSection === 'experience' && (
              <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {data.experience?.map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-2xl font-light text-slate-900">{exp.title}</h3>
                      <span className="font-sans text-xs text-slate-400 font-bold uppercase tracking-widest">{exp.years}</span>
                    </div>
                    <p className="text-slate-500 font-sans font-medium uppercase tracking-wider mb-4">{exp.company}</p>
                    <div className="text-slate-600 leading-loose text-lg border-l border-slate-200 pl-8 ml-1 space-y-2">
                      {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((desc, idx) => (
                        <p key={idx} className="text-sm">• {desc}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {activeSection === 'projects' && (
              <section className="grid grid-cols-1 gap-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {data.projects?.map((proj, i) => (
                  <div key={i} className="group cursor-pointer">
                    <h3 className="text-3xl font-light text-slate-900 mb-6 group-hover:italic transition-all">
                      {proj.title}
                    </h3>
                    <div className="aspect-[16/9] bg-slate-100 overflow-hidden mb-8 border border-slate-200">
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center text-slate-300 uppercase tracking-widest text-xs font-sans">
                        / Illustration /
                      </div>
                    </div>
                    <p className="font-sans text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{proj.tech}</p>
                    <p className="text-slate-600 leading-loose max-w-2xl text-sm">{proj.description}</p>
                  </div>
                ))}
              </section>
            )}

            {activeSection === 'skills' && (
              <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {Object.entries(data.skills || {}).map(([category, list], i) => 
                  Array.isArray(list) && list.length > 0 && (
                    <div key={i} className="border-b border-slate-100 pb-8 last:border-0">
                      <h3 className="font-sans text-xs text-slate-400 font-bold uppercase tracking-[0.3em] mb-8">{category}</h3>
                      <div className="flex flex-wrap gap-x-12 gap-y-4">
                        {list.map((skill, j) => (
                          <span key={j} className="text-xl font-light text-slate-900">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </section>
            )}

            {activeSection === 'education' && (
              <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {data.education?.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-2xl font-light text-slate-900">{edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}</h3>
                      <span className="font-sans text-xs text-slate-400 font-bold uppercase tracking-widest">{edu.start_year} — {edu.end_year}</span>
                    </div>
                    <p className="text-slate-500 font-sans font-medium uppercase tracking-wider">{edu.institution}</p>
                    {edu.cgpa && <p className="mt-2 text-sm text-slate-400 font-sans italic">Academic Standing: {edu.cgpa}</p>}
                  </div>
                ))}
              </section>
            )}

            {activeSection === 'awards' && (
              <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {data.awards?.map((award, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-2xl font-light text-slate-900">{award.title}</h3>
                      <span className="font-sans text-xs text-slate-400 font-bold uppercase tracking-widest">{award.date}</span>
                    </div>
                    <p className="text-slate-500 font-sans font-medium uppercase tracking-wider">{award.issuer}</p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-slate-300">
          <span>© {new Date().getFullYear()} {data.name} — All Rights Reserved</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900 transition">Design System</a>
            <a href="#" className="hover:text-slate-900 transition">Contact Executive</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
