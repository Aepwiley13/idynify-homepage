import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
        
        setLoading(false);

        // Check if just submitted ICP
        if (searchParams.get('icp-submitted') === 'true') {
          setShowSuccess(true);
          
          // Update Firestore to mark ICP as submitted
          try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
              icpStarted: true,
              icpSubmitted: true,
              icpSubmittedAt: new Date()
            });
          } catch (error) {
            console.error('Error updating ICP status:', error);
          }
          
          // Auto-hide success message after 10 seconds
          setTimeout(() => setShowSuccess(false), 10000);
        }
      } else {
        // Not logged in, redirect to login
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, searchParams]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleStartICP = () => {
    navigate('/icp-questionnaire');
  };

  const handleViewICP = () => {
    // Navigate to their custom ICP page (similar to Mountainside)
    navigate(`/${userData.company.toLowerCase().replace(/\s+/g, '-')}-icp`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🐻</div>
          <p className="text-cyan-400 text-xl font-mono">Loading Mission Control...</p>
        </div>
      </div>
    );
  }

  const icpStatus = userData?.icpCompleted ? 'completed' : userData?.icpStarted ? 'in-progress' : 'not-started';

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
        {['[ICP:BUILDING]', '[BARRY:READY]', '[MISSION:ACTIVE]', '[DATA:SECURE]', '[LEADS:PENDING]'].map((code, i) => (
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

      {/* Header */}
      <header className="relative z-20 backdrop-blur-md bg-slate-900/80 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🐻</div>
              <div>
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  MISSION CONTROL
                </h1>
                <p className="text-xs text-cyan-400 font-mono">Idynify Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg border border-slate-700 hover:border-cyan-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* SUCCESS BANNER - NEW! */}
        {showSuccess && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-2xl p-6 mb-8 shadow-2xl backdrop-blur-xl animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="text-6xl animate-bounce">🎉</div>
                <div className="flex-1">
                  <div className="text-white font-black text-2xl mb-2">
                    ICP Questionnaire Submitted Successfully!
                  </div>
                  <div className="text-green-200 mb-3 text-lg">
                    Barry AI is processing your 79 responses. You'll receive your custom ICP within 48 hours.
                  </div>
                  <div className="flex items-center gap-2 text-green-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono">Watch your email for the notification</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="text-white/70 hover:text-white text-3xl transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6" style={{ animation: 'floatBear 6s ease-in-out infinite' }}>🐻</div>
          <h2 className="text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Welcome, {userData?.fullName?.split(' ')[0] || 'Crew Member'}!
          </h2>
          <p className="text-2xl text-cyan-300 font-bold mb-2">
            Ready to discover your ideal customers?
          </p>
          <p className="text-lg text-white/70">
            🚀 Let's build your ICP and start filling your pipeline
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="text-cyan-400 text-xs font-mono font-bold uppercase">Your Account</p>
                <p className="text-white font-bold text-lg">{userData?.tier || 'Tier 1'}</p>
              </div>
            </div>
            <div className="space-y-1 text-sm text-white/70">
              <p>{userData?.company}</p>
              <p>{userData?.industry}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-purple-400 text-xs font-mono font-bold uppercase">ICP Status</p>
                <p className="text-white font-bold text-lg">
                  {icpStatus === 'completed' ? 'Complete' : 
                   icpStatus === 'in-progress' ? 'In Progress' : 
                   'Not Started'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                icpStatus === 'completed' ? 'bg-green-400' :
                icpStatus === 'in-progress' ? 'bg-yellow-400' :
                'bg-red-400'
              }`}></div>
              <p className="text-sm text-white/70">
                {icpStatus === 'completed' ? 'Ready to view' :
                 icpStatus === 'in-progress' ? 'Continue building' :
                 'Ready to start'}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-green-400 text-xs font-mono font-bold uppercase">Leads</p>
                <p className="text-white font-bold text-lg">0 Qualified</p>
              </div>
            </div>
            <p className="text-sm text-white/70">Complete ICP to unlock</p>
          </div>
        </div>

        {/* Main Action Section */}
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-cyan-500/30 p-12 mb-8">
          {icpStatus === 'not-started' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-500/30">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-semibold text-yellow-300">STEP 1: BUILD YOUR ICP</span>
              </div>
              
              <h3 className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Let's Discover Your Ideal Customer
              </h3>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Barry AI will guide you through a 15-20 minute questionnaire to build your custom ICP. 
                We'll analyze your answers and create a complete profile of who to target.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <h4 className="text-cyan-400 font-bold text-lg mb-4">What You'll Get:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="text-white font-semibold">Complete ICP Profile</p>
                      <p className="text-sm text-white/60">Firmographics, psychographics, behaviors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-white font-semibold">ICP Scoring System</p>
                      <p className="text-sm text-white/60">0-100 qualification framework</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-white font-semibold">Messaging Guidelines</p>
                      <p className="text-sm text-white/60">What to say & how to say it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <p className="text-white font-semibold">Action Plan</p>
                      <p className="text-sm text-white/60">Step-by-step execution strategy</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartICP}
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-xl text-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-cyan-500/50 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  🚀 BUILD MY ICP NOW
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <p className="text-cyan-500/60 text-sm mt-4 font-mono">
                ⏱️ Takes 15-20 minutes • 💾 Save progress anytime
              </p>
            </div>
          )}

          {icpStatus === 'in-progress' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-500/30">
                <span className="text-2xl">⏳</span>
                <span className="text-sm font-semibold text-yellow-300">IN PROGRESS</span>
              </div>
              
              <h3 className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Continue Building Your ICP
              </h3>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                You're making progress! Continue where you left off to complete your ICP profile.
              </p>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" style={{width: '45%'}}></div>
                </div>
                <p className="text-sm text-white/70">45% Complete • ~10 minutes remaining</p>
              </div>

              <button
                onClick={handleStartICP}
                className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 text-white px-12 py-6 rounded-xl text-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-yellow-500/50 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  ⏭️ CONTINUE ICP
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          )}

          {icpStatus === 'completed' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400/20 to-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-green-500/30">
                <span className="text-2xl">✅</span>
                <span className="text-sm font-semibold text-green-300">ICP COMPLETE</span>
              </div>
              
              <h3 className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                Your ICP is Ready!
              </h3>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Barry AI has analyzed your responses and created your custom Ideal Customer Profile. 
                Time to start filling your pipeline! 🎯
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <p className="text-3xl mb-2">8</p>
                  <p className="text-sm text-white/70">Sections Complete</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-3xl mb-2">100</p>
                  <p className="text-sm text-white/70">ICP Scoring System</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                  <p className="text-3xl mb-2">Ready</p>
                  <p className="text-sm text-white/70">To Launch</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleViewICP}
                  className="relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white px-12 py-6 rounded-xl text-2xl font-black hover:scale-105 transition-all shadow-2xl shadow-green-500/50 group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    👁️ VIEW MY ICP
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <button
                  className="bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  🚀 Start Lead Delivery
                </button>
              </div>
            </div>
          )}
        </div>

        {/* What's Next Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="text-4xl mb-3">📋</div>
            <h4 className="text-xl font-bold text-white mb-2">Step 1: Build ICP</h4>
            <p className="text-sm text-white/60 mb-4">
              Complete the questionnaire to understand who your ideal customers are
            </p>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
              icpStatus === 'completed' ? 'bg-green-500/20 text-green-400' :
              icpStatus === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-slate-700 text-slate-400'
            }`}>
              {icpStatus === 'completed' ? '✅ Complete' :
               icpStatus === 'in-progress' ? '⏳ In Progress' :
               '⭕ Not Started'}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 opacity-50">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="text-xl font-bold text-white mb-2">Step 2: Get Leads</h4>
            <p className="text-sm text-white/60 mb-4">
              Receive 90 qualified leads per month matching your ICP
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-400">
              🔒 Locked
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 opacity-50">
            <div className="text-4xl mb-3">💬</div>
            <h4 className="text-xl font-bold text-white mb-2">Step 3: AI Outreach</h4>
            <p className="text-sm text-white/60 mb-4">
              Let Barry AI handle personalized outreach to your leads
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-400">
              🔒 Locked
            </div>
          </div>
        </div>
      </main>

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
