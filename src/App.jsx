// ============================================
// FILE 1: src/App.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { Rocket, Target, Zap, TrendingUp, CheckCircle, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export default function IdynifyHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">🐻</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-wider italic bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                IDYNIFY
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-slate-300 hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('pricing')} className="text-slate-300 hover:text-white transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-white transition-colors">Contact</button>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all">
                Get Started
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button onClick={() => scrollToSection('how-it-works')} className="block text-slate-300 hover:text-white transition-colors w-full text-left">How It Works</button>
              <button onClick={() => scrollToSection('pricing')} className="block text-slate-300 hover:text-white transition-colors w-full text-left">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="block text-slate-300 hover:text-white transition-colors w-full text-left">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="text-9xl animate-bounce">🐻</div>
              <div className="absolute -top-6 -right-6 text-5xl" style={{animation: 'float 3s ease-in-out infinite'}}>🚀</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-slate-800/80 backdrop-blur-sm border border-pink-500/30 rounded-full text-xs text-pink-400 font-semibold whitespace-nowrap">
                MISSION CONTROL READY
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Launch Your AI Sales Agent<br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Solve Your Sales Mystery
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto">
              AI-powered lead generation for B2B Companies
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-slate-400 text-sm">
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">SaaS</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Professional Services</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Agencies</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Recruiters</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Consultants</span>
            </div>

            <p className="text-slate-400 mb-8 text-sm">
              Built for: <span className="text-pink-400">Account Executives</span> • <span className="text-purple-400">SDRs</span> • <span className="text-cyan-400">Founders</span> • <span className="text-pink-400">Marketers</span> • <span className="text-purple-400">GTM Leaders</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105">
                Build Your ICP Now
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all">
                Schedule Discovery Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Sales Mission: Choose Your Path</h2>
            <p className="text-xl text-slate-300">Three tiers. One goal: Fill your pipeline with perfect-fit leads.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {step: '01', icon: Target, title: 'Define Your Mission', price: '$500-$1,500 one-time'},
              {step: '02', icon: TrendingUp, title: 'Get Your Leads', price: '$100-$300/month'},
              {step: '03', icon: Zap, title: 'Autopilot Engaged', price: '$500-$1,500/month'}
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all">
                <div className="text-6xl font-bold text-pink-500/20 mb-4">{item.step}</div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="text-lg font-bold text-white">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-6xl mb-8">🚀</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Launch?</h2>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Launch Sequence</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-pink-500 focus:outline-none" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-pink-500 focus:outline-none" />
              <button className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-xl font-bold hover:shadow-2xl transition-all">
                Build My ICP Brief
                <Sparkles className="inline-block ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🐻</span>
            </div>
            <span className="text-white font-bold text-xl">IDYNIFY</span>
          </div>
          <p className="text-slate-400 text-sm">© 2025 Idynify. Mission Control for B2B Sales</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}

// ============================================
// FILE 2: src/main.jsx
// ============================================
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

// ============================================
// FILE 3: src/index.css
// ============================================
// @import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/dist/tailwind.min.css');

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// ============================================
// FILE 4: package.json (root)
// ============================================
// {
//   "name": "idynify-homepage",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "preview": "vite preview"
//   },
//   "dependencies": {
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "lucide-react": "^0.263.1"
//   },
//   "devDependencies": {
//     "@vitejs/plugin-react": "^4.3.9",
//     "vite": "^5.0.8"
//   }
// }

// ============================================
// FILE 5: index.html (root)
// ============================================
// <!doctype html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Idynify - AI Sales Agent</title>
//   </head>
//   <body>
//     <div id="root"></div>
//     <script type="module" src="/src/main.jsx"></script>
//   </body>
// </html>

// ============================================
// FILE 6: vite.config.js (root)
// ============================================
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })
