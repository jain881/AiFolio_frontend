import React, { useState, useEffect } from 'react';
import { Upload, Sparkles, FileText, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import MainPage from './Portfolio/MainPage';

export default function LandingPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await fetch('http://localhost:5000/upload-cv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        const data = await response.json();
        setResponseData(data);

        setTimeout(() => {
          setUploadSuccess(false);
          setFile(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const gradientX = (mousePosition.x / window.innerWidth) * 100;
  const gradientY = (mousePosition.y / window.innerHeight) * 100;

  return (
    <>
      {
        !isUploading && responseData ? (
          <MainPage responseData={responseData} />
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

            {/* Background animation */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(139, 92, 246, 0.3), transparent 50%)`
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-purple-400 opacity-20"
                  style={{
                    width: Math.random() * 6 + 2 + 'px',
                    height: Math.random() * 6 + 2 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                    animationDelay: Math.random() * 5 + 's'
                  }}
                />
              ))}
            </div>

            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-40px) translateX(-10px); }
                75% { transform: translateY(-20px) translateX(10px); }
              }
              @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
                50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
              }
              .pulse-glow {
                animation: pulse-glow 2s ease-in-out infinite;
              }
            `}</style>

            <div className="relative z-10 container mx-auto px-4 py-12">
              {/* Header */}
              <div className="text-center mb-16 pt-8">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 text-sm font-medium">AI-Powered Analysis</span>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                  Transform Your
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Career Journey
                  </span>
                </h1>

                <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
                  Upload your CV and let our advanced AI analyze, optimize, and unlock your professional potential in seconds
                </p>
              </div>

              {/* Upload Card */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                  <form onSubmit={handleSubmit}>

                    {/* Upload zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                        isDragging
                          ? 'border-purple-400 bg-purple-500/20 scale-105'
                          : 'border-purple-300/50 bg-white/5 hover:bg-white/10'
                      } ${uploadSuccess ? 'pulse-glow border-green-400' : ''}`}
                    >
                      <input
                        type="file"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="cv-upload"
                      />

                      <label htmlFor="cv-upload" className="cursor-pointer block text-center">
                        <div className="flex justify-center mb-6">
                          {uploadSuccess ? (
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                              <CheckCircle className="w-10 h-10 text-green-400" />
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center transition-transform hover:scale-110">
                              <Upload className="w-10 h-10 text-purple-400" />
                            </div>
                          )}
                        </div>

                        {file ? (
                          <div className="mb-4">
                            <div className="inline-flex items-center gap-3 bg-purple-500/20 rounded-xl px-6 py-3 border border-purple-400/30">
                              <FileText className="w-5 h-5 text-purple-400" />
                              <span className="text-white font-medium">{file.name}</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-2xl font-semibold text-white mb-2">
                              Drop your CV here
                            </p>
                            <p className="text-purple-200 mb-4">
                              or click to browse from your device
                            </p>
                          </>
                        )}

                        <p className="text-sm text-purple-300">
                          Supports PDF, DOC, DOCX • Max 10MB
                        </p>
                      </label>
                    </div>

                    {file && (
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg shadow-purple-500/50"
                      >
                        {isUploading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            Analyze My CV
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    )}
                  </form>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  {[
                    { icon: Sparkles, title: 'AI Analysis', desc: 'Deep learning algorithms review every detail' },
                    { icon: Zap, title: 'Instant Results', desc: 'Get comprehensive feedback in seconds' },
                    { icon: CheckCircle, title: 'Secure & Private', desc: 'Your data is encrypted and protected' }
                  ].map((feature, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <feature.icon className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-purple-200 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
