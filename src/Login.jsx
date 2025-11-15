import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './lib/firebase';

export default function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Successfully logged in - Firebase handles the auth state
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      
      // User-friendly error messages
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Need access? Request it first.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('Login failed. Please try again or contact support.');
      }
      
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated stars background */}
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

      {/* Floating code */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['[AUTHENTICATING...]', '[SECURE:OK]', '[BARRY:ONLINE]', '[MISSION:READY]', '[ACCESS:GRANTED]'].map((code, i) => (
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

      {/* Grid overlay */}
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

      {/* Status indicators */}
      <div className="absolute top-6 left-6 text-cyan-400 font-mono text-xs space-y-1 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>SYSTEM ONLINE</span>
        </div>
        <div>MISSION: CREW ACCESS</div>
        <div>STATUS: AUTHENTICATION READY</div>
      </div>

      {/* Rotating radar */}
      <div className="absolute bottom-6 left-6 w-24 h-24 border-2 border-cyan-500/30 rounded-full z-20">
        <div className="absolute inset-0 rounded-full" style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, cyan 90deg, transparent 90deg)',
          animation: 'spin 4s linear infinite',
          opacity: 0.3
        }}></div>
        <div className="absolute inset-4 border border-cyan-500/20 rounded-full"></div>
        <div className="absolute inset-8 border border-cyan-500/20 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-12 px-4 flex items-center justify-center min-h-screen">
        <div className="max-w-xl w-full">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6" style={{ animation: 'floatBear 6s ease-in-out infinite' }}>🐻</div>
            <h1 className="text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
              MISSION CONTROL<br/>ACCESS
            </h1>
            <p className="text-2xl text-cyan-300 font-bold mb-2">
              Welcome Back, Crew Member
            </p>
            <p className="text-lg text-white/70">
              🔐 Enter your credentials to continue
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-cyan-500/30">
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-l-4 border-cyan-400 px-6 py-3 rounded mb-8">
              <p className="text-cyan-300 font-mono text-sm">
                🔐 SECURE AUTHENTICATION PROTOCOL
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="crew@mission.space"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                  <p className="text-red-300 font-mono text-sm">⚠️ {error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white px-8 py-6 rounded-xl text-2xl font-black hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-cyan-500/50 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin">⚙️</span>
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      🚀 ENTER MISSION CONTROL
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <p className="text-cyan-500/60 text-center text-sm mt-4 font-mono">
                🔒 256-BIT ENCRYPTION • YOUR DATA IS SECURE
              </p>
            </form>

            <div className="mt-8 pt-8 border-t border-cyan-500/20">
              <p className="text-center text-white/60 text-sm font-mono mb-4">
                Don't have access yet?
              </p>
              <a 
                href="/request" 
                className="block w-full bg-white/5 border-2 border-cyan-500/30 text-cyan-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-cyan-400/50 transition-all text-center"
              >
                📝 Request Access
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm font-mono">
              Forgot your password?{' '}
              <a href="mailto:support@idynify.com" className="text-cyan-400 hover:text-cyan-300 underline">
                Contact Support
              </a>
            </p>
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
