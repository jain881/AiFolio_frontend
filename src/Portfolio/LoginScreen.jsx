import React from 'react';
import { Sparkles, Layout, ShieldCheck, Zap } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 transform rotate-3 mb-4">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight uppercase">AiFolio</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Unlock the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Power of AI</span>
          </h1>
          
          <p className="text-purple-200 mb-10 leading-relaxed">
            Please sign in to continue with your CV analysis and generate your professional portfolio.
          </p>

          <button
            onClick={onLogin}
            className="w-full bg-white hover:bg-purple-50 text-slate-900 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl"
          >
            <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="w-6 h-6"
            />
            Continue with Google
          </button>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <Sparkles className="w-5 h-5 text-purple-400 mb-2 mx-auto" />
              <p className="text-xs text-purple-200 font-medium whitespace-nowrap">AI Optimized</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <Zap className="w-5 h-5 text-pink-400 mb-2 mx-auto" />
              <p className="text-xs text-purple-200 font-medium whitespace-nowrap">Instant Result</p>
            </div>
          </div>

          <p className="mt-10 text-xs text-purple-300/60">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
