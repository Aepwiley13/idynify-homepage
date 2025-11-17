import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Request() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(target.getHours() + 24);
      const diff = target - now;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'requests'), {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
        createdAtTimestamp: Date.now(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Transmission failed. Please try again or contact Mission Control: aaron@idynify.com');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's'
              }}
            />
          ))}
        </div>
        <div className="relative z-10 max-w-2xl w-full bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-cyan-500/30">
          <div className="text-8xl mb-6 animate-bounce">🐻✨</div>
          <h1 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            APPLICATION RECEIVED
          </h1>
          <p className="text-2xl text-cyan-400 mb-4 font-bold tracking-wider">
            [ACCESS PENDING]
          </p>
          <p className="text-xl text-white/80 mb-8">
            Mission Control is reviewing your application. You will receive clearance status within 24 hours.
          </p>
          <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-xl p-6 mb-8">
            <p className="text-cyan-300 text-lg font-mono">
              📡 CHECK YOUR EMAIL FOR UPDATES
            </p>
          </div>
          <a href="/" className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
            ← RETURN TO BASE
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['[ANALYZING...]', '[ICP:LOCKED]', '[LEAD:QUALIFIED]', '[DATA:ENCRYPTED]', '[MISSION:ACTIVE]', '[BARRY:ONLINE]'].map((code, i) => (
          <div
            key={i}
            className="absolute text-cyan-400/30 font-mono text-xs"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatCode ${15 + i * 3}s linear infinite`,
              animationDelay: `${i * 2}s`
            }}
          >
            {code}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-cyan-900/20 to-transparent">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="cyan" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute top-6 left-6 text-cyan-400 font-mono text-xs space-y-1 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>SYSTEM ONLINE</span>
        </div>
        <div>MISSION: CREW SELECTION</div>
        <div>STATUS: ACCEPTING APPLICATIONS</div>
      </div>

      <div className="absolute top-6 right-6 text-cyan-400 font-mono text-xs text-right z-20">
        <div>LAUNCH WINDOW</div>
        <div className="text-2xl font-bold text-pink-400 tabular-nums">T-{countdown}</div>
      </div>

      <div className="absolute bottom-6 left-6 w-24 h-24 border-2 border-cyan-500/30 rounded-full z-20">
        <div className="absolute inset-0 rounded-full" style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, cyan 90deg, transparent 90deg)',
          animation: 'spin 4s linear infinite',
          opacity: 0.3
        }}></div>
        <div className="absolute inset-4 border border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-8 border border-cyan-500/20 rounded-full"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6" style={{ animation: 'floatBear 6s ease-in-out infinite' }}>🐻</div>
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-black text-sm mb-6 animate-pulse">
              🚀 LIMITED SEATS AVAILABLE
            </div>
            <h1 className="text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
              EARLY CREW MEMBER<br/>APPLICATION
            </h1>
            <p className="text-2xl text-cyan-300 font-bold mb-2">
              Join Barry AI Data Exploration Mission
            </p>
            <p className="text-lg text-white/70">
              ⚡ Launch Week Access • 🌌 First 100 Explorers Only
            </p>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8 backdrop-blur">
            <h3 className="text-cyan-400 font-bold text-lg mb-3">📋 MISSION BRIEFING</h3>
            <p className="text-white/80 leading-relaxed">
              You are applying to join an exclusive crew of early adopters exploring the future of AI-powered customer intelligence. 
              Barry will analyze complex data sets, constantly learn and improve, helping you discover your ideal customers in uncharted territory.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-cyan-500/30">
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-l-4 border-cyan-400 px-6 py-3 rounded mb-8">
              <p className="text-cyan-300 font-mono text-sm">
                🔐 CLEARANCE LEVEL: RESTRICTED • CREW SELECTION IN PROGRESS
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('fullName', { required: 'Name required for crew manifest' })}
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="ASTRONAUT NAME"
                />
                {errors.fullName && (
                  <p className="text-yellow-400 text-sm mt-2 font-mono">⚠️ {errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Company Name *
                </label>
                <input
                  type="text"
                  {...register('company', { required: 'Company name required' })}
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="MISSION SPONSOR"
                />
                {errors.company && (
                  <p className="text-yellow-400 text-sm mt-2 font-mono">⚠️ {errors.company.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email required for mission updates',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid transmission format'
                    }
                  })}
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="COMM CHANNEL"
                />
                {errors.email && (
                  <p className="text-yellow-400 text-sm mt-2 font-mono">⚠️ {errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Cell Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone required for mission alerts',
                    pattern: {
                      value: /^[\d\s\-\+\(\)]+$/,
                      message: 'Invalid signal format'
                    }
                  })}
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="EMERGENCY CONTACT"
                />
                {errors.phone && (
                  <p className="text-yellow-400 text-sm mt-2 font-mono">⚠️ {errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Industry Sector *
                </label>
                <select
                  {...register('industry', { required: 'Sector classification required' })}
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                >
                  <option value="">SELECT SECTOR...</option>
                  <option value="saas">Technology and SaaS</option>
                  <option value="software">Software Development</option>
                  <option value="consulting">Consulting and Professional Services</option>
                  <option value="marketing">Marketing and Advertising</option>
                  <option value="agency">Creative Agency</option>
                  <option value="fintech">Financial Services and FinTech</option>
                  <option value="healthcare">Healthcare and Medical</option>
                  <option value="biotech">Biotech and Life Sciences</option>
                  <option value="ecommerce">E-commerce and Retail</option>
                  <option value="manufacturing">Manufacturing and Industrial</option>
                  <option value="realestate">Real Estate and Property</option>
                  <option value="construction">Construction and Engineering</option>
                  <option value="legal">Legal Services</option>
                  <option value="accounting">Accounting and Finance</option>
                  <option value="hr">HR and Recruiting</option>
                  <option value="education">Education and EdTech</option>
                  <option value="nonprofit">Non-Profit and Social Impact</option>
                  <option value="hospitality">Hospitality and Travel</option>
                  <option value="logistics">Logistics and Supply Chain</option>
                  <option value="insurance">Insurance</option>
                  <option value="automotive">Automotive</option>
                  <option value="energy">Energy and Utilities</option>
                  <option value="entertainment">Entertainment and Media</option>
                  <option value="other">Other Sector</option>
                </select>
                {errors.industry && (
                  <p className="text-yellow-400 text-sm mt-2 font-mono">⚠️ {errors.industry.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white px-8 py-6 rounded-xl text-2xl font-black hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-cyan-500/50 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin">⚙️</span>
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      🚀 SUBMIT APPLICATION
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <p className="text-cyan-500/60 text-center text-sm mt-4 font-mono">
                🔒 ENCRYPTED TRANSMISSION • YOUR DATA IS SECURE
              </p>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-cyan-400/70 text-sm font-mono mb-4 uppercase tracking-wider">Mission Status</p>
            <div className="flex justify-center items-center gap-4 text-cyan-500/50 text-xs font-mono flex-wrap">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                RAPID CLEARANCE
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                AI-POWERED
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                LAUNCH WEEK
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes floatBear {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatCode {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}