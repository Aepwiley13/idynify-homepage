import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

const MountainsideICP = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const CORRECT_PASSWORD = 'mountainside2025';

  useEffect(() => {
    // Check if already unlocked in session
    const unlocked = sessionStorage.getItem('icpUnlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      sessionStorage.setItem('icpUnlocked', 'true');
      setShowError(false);
    } else {
      setShowError(true);
      setPassword('');
    }
  };

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <LucideIcons.Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Access Required</h1>
            <p className="text-slate-600">Enter your password to view the ICP Brief</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password-input" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-800 focus:outline-none transition-colors text-lg"
                placeholder="Enter password"
                autoComplete="off"
              />
              {showError && (
                <p className="text-red-500 text-sm mt-2">Incorrect password. Please try again.</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Access Content
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500 mb-2">Powered by</p>
            <p className="text-lg font-bold text-slate-900">Idynify</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Idynify</h1>
                <p className="text-xs text-slate-500">Ideal Customer Profile Brief</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-700">Live Document</span>
              </div>
              <a href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <LucideIcons.Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by Barry AI</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Mountainside Mentoring</h1>
            <p className="text-xl text-slate-300 mb-6">Ideal Customer Profile & Go-To-Market Strategy</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <LucideIcons.CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>847 Companies Analyzed</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideIcons.CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>94.3% Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideIcons.CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Updated 2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-1 py-2">
            {[
              { id: 'overview', name: 'Executive Summary' },
              { id: 'firmographic', name: 'Firmographics' },
              { id: 'psychographic', name: 'Psychographics' },
              { id: 'behavioral', name: 'Behavioral Signals' },
              { id: 'scoring', name: 'ICP Scoring' },
              { id: 'messaging', name: 'Messaging' },
              { id: 'channels', name: 'Channels' },
              { id: 'action', name: 'Action Plan' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => showSection(section.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Barry AI Alert */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <LucideIcons.Zap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg mb-1">Barry AI Latest Update</p>
              <p className="text-emerald-50">Detected 23 new companies matching your ICP in the last 48 hours. 12 have recent funding announcements.</p>
            </div>
          </div>
        </div>

        {/* Executive Summary Section */}
        {activeSection === 'overview' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Executive Summary</h2>
              <p className="text-slate-600">Your ideal customer at a glance</p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Your Ideal Customer At a Glance</h3>
              <p className="text-slate-700 mb-3 leading-relaxed">
                Mountainside Mentoring's ideal clients are <strong>growth-stage companies (100-500 employees)</strong> led by <strong>maverick leaders</strong> who believe culture and leadership development are strategic multipliers, not HR perks.
              </p>
              <p className="text-slate-700 leading-relaxed">
                These organizations are experiencing rapid growth that has outpaced leadership maturity and they are ready to invest in transformative solutions—not cookie-cutter corporate training.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <LucideIcons.CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Perfect Fit Indicators</h4>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Maverick leaders who break stereotypes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Believe people are their greatest differentiator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Pass credit down to their teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Urgency to act NOW (fire or narrow opportunity)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span>Willing to experiment with unorthodox solutions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-red-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <LucideIcons.XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Anti-Profile (Avoid)</h4>
                </div>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Large bureaucratic enterprises seeking compliance training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Leaders who say "we'll fix culture after we make money"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Organizations that prioritize control over curiosity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Companies where status quo is fine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>Private equity firms disconnected from operations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Key Insight: Mindset Over Firmographics</h4>
              <p className="text-slate-700 mb-6 leading-relaxed">
                After analyzing successful vs unsuccessful engagements, Mountainside discovered that <strong>mindset matters more than company size or industry</strong>. The best clients share four core characteristics:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-emerald-200 hover:shadow-md transition-shadow">
                  <LucideIcons.Award className="w-10 h-10 text-emerald-600 mb-3" />
                  <p className="font-bold text-slate-900 mb-1">Mavericks</p>
                  <p className="text-xs text-slate-600">Break the mold, willing to do what it takes</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200 hover:shadow-md transition-shadow">
                  <LucideIcons.Rocket className="w-10 h-10 text-blue-600 mb-3" />
                  <p className="font-bold text-slate-900 mb-1">Energetic</p>
                  <p className="text-xs text-slate-600">Purpose-driven, results-oriented</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200 hover:shadow-md transition-shadow">
                  <LucideIcons.Lightbulb className="w-10 h-10 text-purple-600 mb-3" />
                  <p className="font-bold text-slate-900 mb-1">Early Adopters</p>
                  <p className="text-xs text-slate-600">Willing to experiment within budget</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border-2 border-orange-200 hover:shadow-md transition-shadow">
                  <LucideIcons.Flame className="w-10 h-10 text-orange-600 mb-3" />
                  <p className="font-bold text-slate-900 mb-1">Urgent</p>
                  <p className="text-xs text-slate-600">Fire is burning—act NOW</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Sections - Placeholder */}
        {activeSection !== 'overview' && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl animate-fadeIn">
            <LucideIcons.FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 font-medium mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
            </p>
            <p className="text-sm text-slate-500">Complete analysis available in full document</p>
          </div>
        )}

        {/* CTA for Action Plan */}
        {activeSection === 'action' && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-10 text-white text-center shadow-2xl animate-fadeIn">
            <LucideIcons.Rocket className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-3">Ready to Fill Your Pipeline?</h3>
            <p className="text-emerald-100 mb-8 text-lg">Get 90 qualified leads delivered monthly</p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-sm text-emerald-100 mb-1">Your Time</p>
                <p className="text-4xl font-bold mb-1">2-3 hrs</p>
                <p className="text-sm text-emerald-100">per week</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-sm text-emerald-100 mb-1">Investment</p>
                <p className="text-4xl font-bold mb-1">$297</p>
                <p className="text-sm text-emerald-100">per month</p>
              </div>
            </div>

            <div className="space-y-4 max-w-xl mx-auto">
              <a 
                href="/lead-delivery" 
                className="block w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
              >
                Start Lead Delivery
              </a>
              <a 
                href="/contact" 
                className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-xl border-2 border-white/30 transition-all"
              >
                Schedule a Call
              </a>
            </div>

            <p className="text-sm text-emerald-100 mt-8">
              First 10 leads within 48 hours • No contracts • Cancel anytime
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LucideIcons.Sparkles className="w-5 h-5" />
                <p className="font-bold text-lg">Powered by Barry AI</p>
              </div>
              <p className="text-slate-400 text-sm">Your ICP improves daily with machine learning</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm mb-1">Questions?</p>
              <a href="mailto:support@idynify.com" className="text-white font-semibold hover:text-emerald-400 transition-colors">
                support@idynify.com
              </a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            <p>© 2025 Idynify. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </div>
  );
};

export default MountainsideICP;
