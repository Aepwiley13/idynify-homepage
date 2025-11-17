import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

export default function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const token = searchParams.get('token');

  // Validate token on page load
  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    if (!token) {
      setError('No signup token provided. Please use the link from your approval email.');
      setLoading(false);
      return;
    }

    try {
      // Find the request with this token
      const requestsRef = collection(db, 'requests');
      const q = query(
        requestsRef,
        where('signupToken', '==', token),
        where('status', '==', 'approved'),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Invalid or expired signup token. Please request a new invitation.');
        setLoading(false);
        return;
      }

      const requestDoc = querySnapshot.docs[0];
      const data = requestDoc.data();

      // Check if already used
      if (data.accountCreated) {
        setError('This signup link has already been used. Please use the login page.');
        setLoading(false);
        return;
      }

      setRequestData({ id: requestDoc.id, ...data });
      setTokenValid(true);
      setLoading(false);
    } catch (err) {
      console.error('Token validation error:', err);
      setError('Error validating signup token. Please try again or contact support.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);

    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        requestData.email,
        formData.password
      );

      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: requestData.email,
        fullName: requestData.fullName,
        company: requestData.company,
        phone: requestData.phone,
        industry: requestData.industry,
        createdAt: new Date().toISOString(),
        tier: 'tier1', // Default to basic tier
        status: 'active',
        icpCompleted: false
      });

      // Mark request as account created
      await updateDoc(doc(db, 'requests', requestData.id), {
        accountCreated: true,
        accountCreatedAt: new Date().toISOString(),
        userId: user.uid
      });

      // Success! Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please use the login page.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('Error creating account. Please try again or contact support.');
      }
      
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🐻</div>
          <p className="text-cyan-400 text-xl font-mono">Validating clearance...</p>
        </div>
      </div>
    );
  }

  // Error screen
  if (!tokenValid) {
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
        <div className="relative z-10 max-w-2xl w-full bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-red-500/30">
          <div className="text-8xl mb-6">🚫</div>
          <h1 className="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            ACCESS DENIED
          </h1>
          <p className="text-2xl text-red-400 mb-4 font-bold tracking-wider">
            [INVALID CLEARANCE CODE]
          </p>
          <p className="text-xl text-white/80 mb-8">
            {error}
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/request" 
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all"
            >
              Request Access
            </a>
            <a 
              href="/login" 
              className="inline-block bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Signup form
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
        {['[AUTHENTICATED]', '[ENCRYPTING...]', '[SECURE:OK]', '[BARRY:READY]', '[MISSION:GO]'].map((code, i) => (
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
          <span>CLEARANCE: APPROVED</span>
        </div>
        <div>MISSION: ACCOUNT CREATION</div>
        <div>STATUS: AWAITING CREDENTIALS</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6" style={{ animation: 'floatBear 6s ease-in-out infinite' }}>🐻</div>
            <div className="inline-block bg-gradient-to-r from-green-400 to-cyan-500 text-black px-6 py-2 rounded-full font-black text-sm mb-6">
              ✅ CLEARANCE APPROVED
            </div>
            <h1 className="text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
              CREATE YOUR<br/>MISSION ACCOUNT
            </h1>
            <p className="text-2xl text-cyan-300 font-bold mb-2">
              Welcome to Mission Control, {requestData.fullName}
            </p>
            <p className="text-lg text-white/70">
              🚀 Set your password to begin your journey
            </p>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8 backdrop-blur">
            <h3 className="text-cyan-400 font-bold text-lg mb-3">👤 CREW MEMBER PROFILE</h3>
            <div className="space-y-2 text-white/80">
              <p><span className="text-cyan-400 font-mono">NAME:</span> {requestData.fullName}</p>
              <p><span className="text-cyan-400 font-mono">EMAIL:</span> {requestData.email}</p>
              <p><span className="text-cyan-400 font-mono">COMPANY:</span> {requestData.company}</p>
              <p><span className="text-cyan-400 font-mono">SECTOR:</span> {requestData.industry}</p>
            </div>
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
                  Create Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="Min 8 characters"
                />
                <p className="text-cyan-500/60 text-xs mt-2 font-mono">
                  Use a strong password with letters, numbers, and symbols
                </p>
              </div>

              <div>
                <label className="block text-cyan-400 text-sm font-mono font-bold mb-2 uppercase tracking-wider">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-6 py-4 bg-cyan-950/50 backdrop-blur border-2 border-cyan-500/30 rounded-xl text-lg text-white placeholder-cyan-700 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 transition-all font-mono"
                  placeholder="Re-enter password"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                  <p className="text-red-300 font-mono text-sm">⚠️ {error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white px-8 py-6 rounded-xl text-2xl font-black hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-cyan-500/50 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {submitting ? (
                    <>
                      <span className="inline-block animate-spin">⚙️</span>
                      INITIALIZING...
                    </>
                  ) : (
                    <>
                      🚀 CREATE ACCOUNT
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <p className="text-cyan-500/60 text-center text-sm mt-4 font-mono">
                🔒 256-BIT ENCRYPTION • YOUR DATA IS SECURE
              </p>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm font-mono">
              Already have an account?{' '}
              <a href="/login" className="text-cyan-400 hover:text-cyan-300 underline">
                Login here
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
      `}</style>
    </div>
  );
}
