import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  ChevronRight,
  Send,
  Calendar,
  Palette,
  Download,
} from "lucide-react";
import axios from "axios";

function MainPage({ responseData }) {
  const { extracted: data,cvUploaded:cvData } = responseData || {};
  const [activeSection, setActiveSection] = useState("about");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState("rainbow");
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const themes = {
    none: { name: "No Theme", colors: ["#6B7280"], default: "#6B7280" },
    rainbow: {
      name: "Rainbow",
      colors: [
        "#8B5CF6",
        "#3B82F6",
        "#06B6D4",
        "#10B981",
        "#F59E0B",
        "#EF4444",
      ],
    },
    ocean: {
      name: "Ocean",
      colors: ["#0EA5E9", "#06B6D4", "#3B82F6", "#6366F1"],
    },
    sunset: {
      name: "Sunset",
      colors: ["#F97316", "#EF4444", "#EC4899", "#8B5CF6"],
    },
    forest: {
      name: "Forest",
      colors: ["#10B981", "#059669", "#14B8A6", "#06B6D4"],
    },
    purple: {
      name: "Purple Dream",
      colors: ["#8B5CF6", "#A855F7", "#C026D3", "#E879F9"],
    },
    fire: {
      name: "Fire",
      colors: ["#DC2626", "#EA580C", "#F59E0B", "#FBBF24"],
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Create new particles
      const colors = themes[theme].colors;
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;
        particle.size *= 0.98;
        particle.vy += 0.1; // Gravity

        if (particle.life > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle =
            particle.color +
            Math.floor(particle.life * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();

          // Glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };
    if (theme != "none") {
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [theme]);

  const getGradientColor = () => {
    if (theme === "none") {
      console.log("tee", theme);
      return themes[theme].default;
    }
    if (theme === "rainbow") {
      const hue = (scrollProgress * 3.6) % 360;
      return `hsl(${hue}, 70%, 50%)`;
    }
    const colors = themes[theme].colors;
    const index =
      Math.floor((scrollProgress / 100) * colors.length) % colors.length;
    return colors[index];
  };

  const profileData = {
    name: data?.name || "No Name Found",
    title: data?.position || "No Title Found",
    experience: data?.experience_years
      ? `${data.experience_years}  Years Experience`
      : "",
    email: data?.contact?.email || "No Email Found",
    phone: data?.contact?.phone || "No Phone Found",
    location: data?.contact?.location || "No Location Found",
    github: data?.github || "",
    linkedin: data?.linkedin || "",
    resumeUrl: "Vyakhya_Mishra_Backend_Developer.pdf",
    summary: data?.professional_summary || "No professional summary found.",
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
        title: job.role,
        period: `${job.start_date} - ${job.end_date || "Present"}`,
        highlights: job.description
          ? job.description
              .split(". ")
              .map((point) => point.trim())
              .filter((point) => point)
          : [],
      }))
    : [];

  const projects = data?.projects?.length
    ? data.projects.map((project) => ({
        title: project.title,
        tech: project.tech || "Tech Stack N/A",
        description: project.description || "No description available.",
        gradient: "from-purple-600 to-blue-600",
      }))
    : [];
  const blogPosts = [
    {
      title: "Building Scalable Microservices with Node.js",
      date: "Nov 20, 2024",
      excerpt:
        "Explore best practices for designing and implementing microservices architecture using Node.js, Docker, and AWS for high-performance backend systems.",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      title: "JWT Authentication: Security Best Practices",
      date: "Nov 15, 2024",
      excerpt:
        "Deep dive into implementing secure JWT authentication with role-based access control, token refresh strategies, and common security pitfalls to avoid.",
      gradient: "from-pink-600 to-purple-600",
    },
    {
      title: "PostgreSQL Performance Optimization",
      date: "Nov 10, 2024",
      excerpt:
        "Learn advanced PostgreSQL optimization techniques including indexing strategies, query optimization, and connection pooling for high-traffic applications.",
      gradient: "from-blue-600 to-cyan-600",
    },
  ];

  const awards = data?.awards?.length
    ? data.awards.map((award) => ({
        title: award.title,
        company: award.company,
        date: award.date,
      }))
    : [];
console.log(cvData,"cv uploaded");
  return (
    <div className="App">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 relative">
        {/* Cursor Trail Canvas */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50"
          style={{ mixBlendMode: "screen" }}
        />

        {/* Theme Selector Button */}
        <button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${getGradientColor()}, ${getGradientColor()}cc)`,
          }}
        >
          <Palette className="w-6 h-6 text-white" />
        </button>

        {/* Theme Selector Panel */}
        {showThemeSelector && (
          <div className="fixed bottom-24 right-8 z-40 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl animate-slideUp">
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: getGradientColor() }}
            >
              Choose Theme
            </h3>
            <div className="space-y-2">
              {Object.entries(themes).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setShowThemeSelector(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                    theme === key
                      ? "bg-gray-700"
                      : "bg-gray-700/30 hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {value.colors.slice(0, 4).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{value.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${scrollProgress}%`,
              background: `linear-gradient(90deg, ${getGradientColor()}, ${getGradientColor()}cc)`,
            }}
          />
        </div>

        <div className="flex">
          {/* Sidebar Profile Card */}
          <aside className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 p-8 flex flex-col sticky top-0 h-screen">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-6">
                <div
                  className="w-40 h-40 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${getGradientColor()}, ${getGradientColor()}50)`,
                    boxShadow: `0 0 60px ${getGradientColor()}50`,
                  }}
                >
                  <img
                    src="https://www.toukoum.fr/_next/image?url=%2Flanding-memojis.png&w=3840&q=75"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-3xl"
                    // style={{
                    //   objectPosition: "center -33%", // Adjust to move face up/down
                    //   transform: "scale(2.3)", // Zoom in to show only face
                    // }}
                  />
                </div>

                <div
                  className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-gray-800 animate-pulse"
                  style={{ backgroundColor: getGradientColor() }}
                ></div>
              </div>
              {/* <a
                href={cvData?.downloadLink}
                download={cvData?.originalName}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${getGradientColor()}, ${getGradientColor()}cc)`,
                  boxShadow: `0 8px 32px ${getGradientColor()}40`,
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Download
                  className="w-6 h-6 text-white relative z-10 group-hover:animate-bounce"
                  strokeWidth={2.5}
                />
                <span className="text-white relative z-10 tracking-wide">
                  Download Resume
                </span>
              </a> */}
              <h1 className="text-2xl font-bold text-center mb-2">
                {profileData.name}
              </h1>
              <p className="text-gray-400 text-center">{profileData.title}</p>
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${getGradientColor()}20, ${getGradientColor()}10)`,
                  border: `1px solid ${getGradientColor()}30`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: getGradientColor() }}
                ></div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#ffffff" }}
                >
                  {profileData.experience}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all hover:scale-105">
                <Mail
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: getGradientColor() }}
                />
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-400 mb-1">EMAIL</p>
                  <p className="text-sm break-all">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all hover:scale-105">
                <Phone
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: getGradientColor() }}
                />
                <div>
                  <p className="text-xs text-gray-400 mb-1">PHONE</p>
                  <p className="text-sm">{profileData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all hover:scale-105">
                <MapPin
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: getGradientColor() }}
                />
                <div>
                  <p className="text-xs text-gray-400 mb-1">LOCATION</p>
                  <p className="text-sm">{profileData.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-auto">
                {
profileData.linkedin && (
<a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Linkedin className="w-5 h-5" />
              </a>
)
                }
                {
profileData.github && (
     <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Github className="w-5 h-5" />
              </a>
)
                }
              
             
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Navigation Header */}
            <nav className="bg-gray-800/30 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">
                <div
                  className="text-2xl font-bold tracking-wider"
                  style={{ color: getGradientColor() }}
                >
                  {activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1)}
                </div>
                <ul className="flex items-center gap-2">
                  {["About", "Resume", "Portfolio"].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => setActiveSection(item.toLowerCase())}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                          activeSection === item.toLowerCase()
                            ? "text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/30"
                        }`}
                        style={
                          activeSection === item.toLowerCase()
                            ? {
                                backgroundColor: `${getGradientColor()}30`,
                                color: getGradientColor(),
                                borderBottom: `2px solid ${getGradientColor()}`,
                              }
                            : {}
                        }
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="max-w-7xl mx-auto px-12 py-16">
              {/* About Section */}
              {activeSection === "about" && (
                <div className="space-y-12 animate-fadeIn">
                  <div>
                    <h2 className="text-5xl font-bold mb-4">About Me</h2>
                    <div
                      className="w-20 h-1.5 rounded-full mb-8 shadow-lg"
                      style={{
                        backgroundColor: getGradientColor(),
                        boxShadow: `0 0 20px ${getGradientColor()}`,
                      }}
                    ></div>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                      {profileData.summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                      <Code
                        className="w-8 h-8"
                        style={{ color: getGradientColor() }}
                      />
                      Technical Skills
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {Object.entries(skills).map(
                        ([category, items]) =>
                          items.length > 0 && (
                            <div
                              key={category}
                              className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all hover:scale-105"
                            >
                              <h4
                                className="font-semibold mb-4 text-lg"
                                style={{ color: getGradientColor() }}
                              >
                                {category}
                              </h4>

                              <div className="flex flex-wrap gap-2">
                                {items.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-gray-700/50 rounded-full text-sm hover:bg-gray-700 transition"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  {awards.length > 0 && (
                    <div>
                      <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Award
                          className="w-8 h-8"
                          style={{ color: getGradientColor() }}
                        />
                        Awards & Recognition
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        {awards.map((award, idx) => (
                          <div
                            key={idx}
                            className="p-6 rounded-2xl border transition-all hover:scale-105"
                            style={{
                              background: `linear-gradient(135deg, ${getGradientColor()}20, transparent)`,
                              borderColor: `${getGradientColor()}30`,
                              boxShadow: `0 0 30px ${getGradientColor()}10`,
                            }}
                          >
                            <h4 className="font-semibold mb-2 text-lg">
                              {award.title}
                            </h4>
                            <p className="text-gray-400">{award.company}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Resume Section */}
              {activeSection === "resume" && (
                <div className="space-y-12 animate-fadeIn">
                  <div>
                    <h2 className="text-5xl font-bold mb-4">Resume</h2>
                    <div
                      className="w-20 h-1.5 rounded-full mb-8 shadow-lg"
                      style={{
                        backgroundColor: getGradientColor(),
                        boxShadow: `0 0 20px ${getGradientColor()}`,
                      }}
                    ></div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                      <GraduationCap
                        className="w-8 h-8"
                        style={{ color: getGradientColor() }}
                      />
                      Education
                    </h3>
                    <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
                      <h4 className="text-2xl font-semibold mb-2">
                        Bachelor of Engineering (B.E.)
                      </h4>
                      <p
                        className="text-lg mb-2"
                        style={{ color: getGradientColor() }}
                      >
                        Computer Science and Engineering
                      </p>
                      <p className="text-gray-400">
                        2011 - 2015 • CGPA: 7.8/10
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                      <Briefcase
                        className="w-8 h-8"
                        style={{ color: getGradientColor() }}
                      />
                      Professional Experience
                    </h3>
                    <div className="space-y-6">
                      {experience.map((job, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all hover:scale-105"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h4 className="text-2xl font-semibold mb-2">
                                {job.title}
                              </h4>
                              <p
                                className="text-lg"
                                style={{ color: getGradientColor() }}
                              >
                                {job.company}
                              </p>
                            </div>
                            <span className="text-gray-400 bg-gray-700/50 px-4 py-2 rounded-lg">
                              {job.period}
                            </span>
                          </div>
                          <ul className="space-y-3">
                            {job.highlights.map((highlight, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-300"
                              >
                                <ChevronRight
                                  className="w-5 h-5 flex-shrink-0 mt-1"
                                  style={{ color: getGradientColor() }}
                                />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio Section */}
              {activeSection === "portfolio" && (
                <div className="space-y-12 animate-fadeIn">
                  <div>
                    <h2 className="text-5xl font-bold mb-4">Portfolio</h2>
                    <div
                      className="w-20 h-1.5 rounded-full mb-8 shadow-lg"
                      style={{
                        backgroundColor: getGradientColor(),
                        boxShadow: `0 0 20px ${getGradientColor()}`,
                      }}
                    ></div>
                    <p className="text-gray-400 text-lg mb-8">
                      Showcasing key projects demonstrating expertise in backend
                      development, microservices.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all hover:scale-105 group"
                      >
                        <div
                          className={`h-56 bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                          <h3 className="text-4xl font-bold text-white z-10">
                            {project.title}
                          </h3>
                        </div>
                        <div className="p-8">
                          <p
                            className="text-sm mb-4 font-mono"
                            style={{ color: getGradientColor() }}
                          >
                            {project.tech}
                          </p>
                          <p className="text-gray-300 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Section
            {activeSection === 'blog' && (
              <div className="space-y-12 animate-fadeIn">
                <div>
                  <h2 className="text-5xl font-bold mb-4">Blog</h2>
                  <div className="w-20 h-1.5 rounded-full mb-8 shadow-lg" style={{ 
                    backgroundColor: getGradientColor(),
                    boxShadow: `0 0 20px ${getGradientColor()}`
                  }}></div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {blogPosts.map((post, idx) => (
                    <div key={idx} className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all hover:scale-105 group cursor-pointer">
                      <div className={`h-72 bg-gradient-to-br ${post.gradient} p-10 flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>
                        <div className="text-center z-10">
                          <Code className="w-20 h-20 text-white mx-auto mb-6" />
                          <h3 className="text-3xl font-bold text-white leading-tight">{post.title}</h3>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-2 text-gray-400 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{post.date}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{post.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

              {/* Contact Section */}
              {activeSection === "contact" && (
                <div className="space-y-12 animate-fadeIn max-w-4xl">
                  <div>
                    <h2 className="text-5xl font-bold mb-4">Contact</h2>
                    <div
                      className="w-20 h-1.5 rounded-full mb-8 shadow-lg"
                      style={{
                        backgroundColor: getGradientColor(),
                        boxShadow: `0 0 20px ${getGradientColor()}`,
                      }}
                    ></div>
                    <p className="text-gray-400 text-lg mb-8">
                      Feel free to reach out for collaborations, opportunities,
                      or just to connect!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all hover:scale-105">
                      <Mail
                        className="w-10 h-10 mb-4"
                        style={{ color: getGradientColor() }}
                      />
                      <h4 className="font-semibold text-lg mb-3">Email</h4>
                      <a
                        href={`mailto:${profileData.email}`}
                        className="text-gray-400 hover:text-white transition break-all"
                      >
                        {profileData.email}
                      </a>
                    </div>

                    <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-all hover:scale-105">
                      <Phone
                        className="w-10 h-10 mb-4"
                        style={{ color: getGradientColor() }}
                      />
                      <h4 className="font-semibold text-lg mb-3">Phone</h4>
                      <a
                        href={`tel:${profileData.phone}`}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {profileData.phone}
                      </a>
                    </div>
                  </div>

                  {/* <div className="bg-gray-800/40 backdrop-blur-sm p-10 rounded-2xl border border-gray-700/50">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-3">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-gray-500 transition"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">
                          Your Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-gray-500 transition"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-3">
                          Message
                        </label>
                        <textarea
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-gray-500 transition resize-none"
                          placeholder="Your message here..."
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg shadow-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${getGradientColor()}, ${getGradientColor()}cc)`,
                          boxShadow: `0 0 40px ${getGradientColor()}40`,
                        }}
                      >
                        <Send className="w-5 h-5" />
                        Send Message
                      </button>

                      {formStatus && (
                        <div
                          className="text-center font-medium p-4 rounded-xl"
                          style={{
                            backgroundColor: `${getGradientColor()}20`,
                            color: getGradientColor(),
                          }}
                        >
                          {formStatus}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </main>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}

export default MainPage;
