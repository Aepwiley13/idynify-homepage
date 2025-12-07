import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

const MountainsideICP = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const CORRECT_PASSWORD = 'mountainside2025';

  useEffect(() => {
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
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-y-auto">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Content Container */}
        <div className="min-h-screen flex items-center justify-center p-4 py-12">
          <div className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-2 border-pink-500/30 rounded-3xl shadow-2xl p-8 md:p-10 max-w-2xl w-full">
          <div className="text-center mb-8">
            {/* Mission Control Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-pink-500/30">
              <LucideIcons.Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">MISSION CONTROL</span>
            </div>

            {/* Barry the Space Bear */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="text-8xl animate-bounce" style={{animationDuration: '2s'}}>🐻</div>
                <div className="absolute -top-4 -right-6 text-4xl animate-spin" style={{animationDuration: '3s'}}>🚀</div>
                <div className="absolute -bottom-2 -left-6 text-3xl animate-pulse">✨</div>
                <div className="absolute -top-2 -left-8 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                MISSION BRIEFING
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-3">Your ICP is Ready for Launch 🎯</p>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Barry has analyzed your ideal customer and charted the course. Enter your access code to unlock your personalized go-to-market strategy.
            </p>
          </div>

          {/* Mission Status */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
              <LucideIcons.CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-xs text-green-300 font-semibold">ICP COMPLETE</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
              <LucideIcons.Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-xs text-blue-300 font-semibold">LEADS READY</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
              <LucideIcons.Rocket className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xs text-purple-300 font-semibold">READY TO LAUNCH</p>
            </div>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password-input" className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wide flex items-center gap-2">
                <LucideIcons.Lock className="w-4 h-4" />
                MISSION ACCESS CODE
              </label>
              <input
                type="password"
                id="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-800/50 border-2 border-purple-500/30 rounded-xl focus:border-pink-500 focus:outline-none transition-all text-lg text-white placeholder-slate-500 font-mono backdrop-blur-sm"
                placeholder="Enter access code..."
                autoComplete="off"
              />
              {showError && (
                <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                  <LucideIcons.AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm font-semibold">ACCESS DENIED - Invalid code. Try again!</p>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-bold py-5 px-8 rounded-xl transition-all shadow-lg hover:shadow-pink-500/50 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <LucideIcons.Rocket className="w-6 h-6 group-hover:animate-bounce" />
                INITIATE LAUNCH SEQUENCE
                <LucideIcons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </form>

          {/* What's Inside Preview */}
          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center mb-4 uppercase tracking-wider font-semibold">🎯 MISSION OBJECTIVES UNLOCKED</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <p className="text-2xl mb-1">📊</p>
                <p className="text-xs text-slate-400 font-medium">ICP Analysis</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <p className="text-2xl mb-1">🎯</p>
                <p className="text-xs text-slate-400 font-medium">Target Leads</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <p className="text-2xl mb-1">💬</p>
                <p className="text-xs text-slate-400 font-medium">Messaging</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <p className="text-2xl mb-1">🚀</p>
                <p className="text-xs text-slate-400 font-medium">Action Plan</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
              <LucideIcons.Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Powered by <span className="font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">Barry AI</span></span>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Idynify</h1>
                <p className="text-xs text-slate-400">Ideal Customer Profile Brief</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-300">Live Document</span>
              </div>
              <a href="/" className="text-sm text-slate-300 hover:text-white transition-colors">
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
      <section className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20 sticky top-[73px] z-40">
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
                    ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white'
                    : 'text-slate-300 hover:bg-white/10'
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
              <p className="text-emerald-50">Detected 23 new companies matching your ICP in the last 48 hours. 12 have recent funding announcements. Priority leads updated in Behavioral Indicators section.</p>
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
              <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-green-500/20 transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                    <LucideIcons.CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Perfect Fit Indicators</h4>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
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

              <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-red-500/20 transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
                    <LucideIcons.XCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Anti-Profile (Avoid)</h4>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
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

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8">
              <h4 className="text-xl font-bold text-white mb-4">Key Insight: Mindset Over Firmographics</h4>
              <p className="text-slate-300 mb-6 leading-relaxed">
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

        {/* Firmographic Section */}
        {activeSection === 'firmographic' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Firmographic Profile</h2>
              <p className="text-slate-600">Company characteristics and decision-maker intelligence</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
                <LucideIcons.Users className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-xs uppercase tracking-wide opacity-90 mb-1">Company Size</p>
                <p className="text-3xl font-bold">100-500</p>
                <p className="text-xs opacity-90 mt-1">employees</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
                <LucideIcons.TrendingUp className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-xs uppercase tracking-wide opacity-90 mb-1">Stage</p>
                <p className="text-2xl font-bold">Series A-C</p>
                <p className="text-xs opacity-90 mt-1">or bootstrapped</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
                <LucideIcons.DollarSign className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-xs uppercase tracking-wide opacity-90 mb-1">Budget</p>
                <p className="text-2xl font-bold">$20K-100K+</p>
                <p className="text-xs opacity-90 mt-1">discretionary</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
                <LucideIcons.Zap className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-xs uppercase tracking-wide opacity-90 mb-1">Decision Speed</p>
                <p className="text-3xl font-bold">2-4 wks</p>
                <p className="text-xs opacity-90 mt-1">to close</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LucideIcons.Building2 className="w-6 h-6 text-blue-600" />
                  Primary Industries
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-700">SaaS & Technology</span>
                    <span className="text-sm font-semibold text-blue-600">High Fit</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-700">Professional Services</span>
                    <span className="text-sm font-semibold text-blue-600">High Fit</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-700">Healthcare Tech</span>
                    <span className="text-sm font-semibold text-green-600">Medium Fit</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-700">E-commerce/DTC</span>
                    <span className="text-sm font-semibold text-green-600">Medium Fit</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-700">Manufacturing</span>
                    <span className="text-sm font-semibold text-yellow-600">Low Fit</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LucideIcons.UserCheck className="w-6 h-6 text-purple-600" />
                  Decision Makers
                </h3>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="font-bold text-slate-900 mb-1">Primary: CEO/Founder</p>
                    <p className="text-sm text-slate-600">Final decision maker, culture champion</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-bold text-slate-900 mb-1">Secondary: COO/President</p>
                    <p className="text-sm text-slate-600">Operations leader, team builder</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="font-bold text-slate-900 mb-1">Influencer: Head of People/HR</p>
                    <p className="text-sm text-slate-600">Champions development initiatives</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <LucideIcons.Target className="w-6 h-6 text-blue-600" />
                LinkedIn Signals to Watch For
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Profile Indicators:</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Posts about team culture, leadership philosophy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Shares unconventional business ideas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Celebrates team wins publicly</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Company Page Signs:</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Recent funding announcements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Rapid headcount growth (hiring posts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Job postings for leadership roles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Psychographic Section */}
        {activeSection === 'psychographic' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Psychographic Profile</h2>
              <p className="text-slate-600">Mindset, values, and pain points</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <LucideIcons.Brain className="w-8 h-8 text-purple-600" />
                Top 5 Pain Points (Ranked by Urgency)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    rank: '1',
                    pain: 'Scaling Chaos',
                    description: 'Grew fast, leadership maturity lagging, systems breaking',
                    impact: 'Critical',
                    color: 'red'
                  },
                  {
                    rank: '2',
                    pain: 'Burnout Among Best People',
                    description: 'Top performers carrying too much, risk of losing them',
                    impact: 'High',
                    color: 'orange'
                  },
                  {
                    rank: '3',
                    pain: 'Inconsistent Culture',
                    description: 'Used to feel like family, now feels corporate and disconnected',
                    impact: 'High',
                    color: 'orange'
                  },
                  {
                    rank: '4',
                    pain: 'Leadership Gaps',
                    description: 'First-time managers struggling, no playbook for developing them',
                    impact: 'Medium',
                    color: 'yellow'
                  },
                  {
                    rank: '5',
                    pain: 'Wasted Time on Generic Training',
                    description: 'Tried off-the-shelf solutions, felt like checking a box',
                    impact: 'Medium',
                    color: 'yellow'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-purple-300 transition-all">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0 ${
                        item.color === 'red' ? 'bg-red-100 text-red-700' :
                        item.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.rank}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-slate-900">{item.pain}</h4>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            item.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                            item.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.impact}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LucideIcons.Heart className="w-6 h-6 text-pink-600" />
                  Core Values & Beliefs
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                    <LucideIcons.Check className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">People-First Philosophy</p>
                      <p className="text-sm text-slate-600">Believe great culture = competitive advantage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <LucideIcons.Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Growth Mindset</p>
                      <p className="text-sm text-slate-600">Willing to invest in long-term development</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <LucideIcons.Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Transparency</p>
                      <p className="text-sm text-slate-600">Open about challenges, not saving face</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <LucideIcons.Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Action-Oriented</p>
                      <p className="text-sm text-slate-600">Prefer doing to endless planning</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LucideIcons.Target className="w-6 h-6 text-blue-600" />
                  Goals & Aspirations
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <p className="font-bold text-slate-900 mb-1">Build Sustainable High Performance</p>
                    <p className="text-sm text-slate-600">Not just sprint to IPO, build lasting org</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <p className="font-bold text-slate-900 mb-1">Develop Leaders From Within</p>
                    <p className="text-sm text-slate-600">Grow talent pipeline, reduce external hires</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <p className="font-bold text-slate-900 mb-1">Become Employer of Choice</p>
                    <p className="text-sm text-slate-600">Attract A+ talent through reputation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <LucideIcons.MessageSquare className="w-8 h-8" />
                How They Talk About Their Problems
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-400 mb-3 uppercase tracking-wide">Common Phrases:</p>
                  <ul className="space-y-2 text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">💬</span>
                      <span>"We're growing like crazy but losing our culture"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">💬</span>
                      <span>"My team is burnt out and I don't know how to fix it"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">💬</span>
                      <span>"Generic training feels like a waste of time"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">💬</span>
                      <span>"We need real transformation, not workshops"</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-3 uppercase tracking-wide">Emotional State:</p>
                  <ul className="space-y-2 text-slate-200">
                    <li className="flex items-start gap-2">
                      <LucideIcons.AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>Frustrated with status quo solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Anxious about losing best people</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LucideIcons.AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>Excited about potential but uncertain how</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Behavioral Indicators Section */}
        {activeSection === 'behavioral' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Behavioral Indicators</h2>
              <p className="text-slate-600">Hot buying triggers and real-time signals</p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <LucideIcons.Flame className="w-8 h-8 text-red-600" />
                🔥 HOT Buying Triggers (Act Immediately)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    trigger: 'Recent Funding Round',
                    timing: 'Within 90 days',
                    why: 'Have budget, hiring pressure, need to scale fast',
                    action: 'Reach out within 2 weeks'
                  },
                  {
                    trigger: 'Key Leader Departure',
                    timing: 'Last 30 days',
                    why: 'Gap in leadership, team morale at risk',
                    action: 'Contact CEO directly'
                  },
                  {
                    trigger: 'Rapid Headcount Growth',
                    timing: '30%+ in 6 months',
                    why: 'Culture strain, management overwhelmed',
                    action: 'Angle: "Preserve culture while scaling"'
                  },
                  {
                    trigger: 'Posted About Team Burnout',
                    timing: 'Recent LinkedIn post',
                    why: 'Public admission = urgent pain',
                    action: 'Comment thoughtfully, then DM'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border-2 border-red-200 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <LucideIcons.AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.trigger}</h4>
                        <p className="text-sm text-red-600 font-semibold">{item.timing}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-700"><strong>Why it matters:</strong> {item.why}</p>
                      <p className="text-slate-700 bg-red-50 p-2 rounded"><strong>Action:</strong> {item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <LucideIcons.Search className="w-8 h-8 text-blue-600" />
                Research Behavior Signals
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LucideIcons.Globe className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-slate-900 mb-2">Active Research</p>
                  <p className="text-sm text-slate-600">Googling "leadership development", "team coaching", etc.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LucideIcons.BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-slate-900 mb-2">Content Consumption</p>
                  <p className="text-sm text-slate-600">Downloading guides, attending webinars on culture</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LucideIcons.Users className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-slate-900 mb-2">Peer Conversations</p>
                  <p className="text-sm text-slate-600">Asking other CEOs for referrals in forums</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <LucideIcons.Calendar className="w-8 h-8" />
                Timing Strategy: When to Reach Out
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                    <p className="font-bold text-lg">BEST Times</p>
                  </div>
                  <ul className="space-y-2 ml-11 text-slate-200">
                    <li>• Q1 (January-March): New year planning, fresh budgets</li>
                    <li>• Post-funding: Within 60 days of announcement</li>
                    <li>• Right after key executive hire: New leader wants to make impact</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">⚠</div>
                    <p className="font-bold text-lg">AVOID Times</p>
                  </div>
                  <ul className="space-y-2 ml-11 text-slate-200">
                    <li>• November-December: Holiday chaos, budget freeze</li>
                    <li>• During layoffs or restructuring: Wrong timing</li>
                    <li>• Immediately post-acquisition: Too much uncertainty</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ICP Scoring Section */}
        {activeSection === 'scoring' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">ICP Scoring Framework</h2>
              <p className="text-slate-600">Qualify leads with precision</p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
              <p className="text-slate-700 mb-4 leading-relaxed text-lg">
                Score every lead 0-100. <strong>Focus on 70+.</strong> Leads scoring 85+ are perfect fits—reach out immediately.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-green-500 text-white p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold mb-1">85-100</p>
                  <p className="text-xs font-semibold">Perfect Fit</p>
                  <p className="text-xs opacity-90 mt-1">Drop everything</p>
                </div>
                <div className="bg-blue-500 text-white p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold mb-1">70-84</p>
                  <p className="text-xs font-semibold">Strong Fit</p>
                  <p className="text-xs opacity-90 mt-1">Prioritize high</p>
                </div>
                <div className="bg-yellow-500 text-slate-900 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold mb-1">50-69</p>
                  <p className="text-xs font-semibold">Moderate</p>
                  <p className="text-xs opacity-90 mt-1">Nurture campaign</p>
                </div>
                <div className="bg-red-500 text-white p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold mb-1">0-49</p>
                  <p className="text-xs font-semibold">Poor Fit</p>
                  <p className="text-xs opacity-90 mt-1">Politely decline</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Scoring Criteria & Weights</h3>
              
              <div className="space-y-6">
                {[
                  {
                    category: 'Firmographics (25 points)',
                    color: 'blue',
                    criteria: [
                      { item: 'Company size: 100-500 employees', points: '10 pts' },
                      { item: 'Industry: SaaS/Tech/Professional Services', points: '5 pts' },
                      { item: 'Growth stage: Series A-C or bootstrapped scaling', points: '5 pts' },
                      { item: 'Budget: $20K+ discretionary', points: '5 pts' }
                    ]
                  },
                  {
                    category: 'Psychographics (35 points)',
                    color: 'purple',
                    criteria: [
                      { item: 'Maverick mindset: Non-traditional thinking', points: '15 pts' },
                      { item: 'People-first philosophy evident', points: '10 pts' },
                      { item: 'Willing to experiment/take risks', points: '5 pts' },
                      { item: 'Growth mindset vs. fixed', points: '5 pts' }
                    ]
                  },
                  {
                    category: 'Behavioral Triggers (25 points)',
                    color: 'orange',
                    criteria: [
                      { item: 'Hot trigger present (funding, turnover, etc.)', points: '15 pts' },
                      { item: 'Active research behavior', points: '5 pts' },
                      { item: 'Timing is right (Q1, post-funding)', points: '5 pts' }
                    ]
                  },
                  {
                    category: 'Decision Maker Access (15 points)',
                    color: 'green',
                    criteria: [
                      { item: 'Direct access to CEO/Founder', points: '10 pts' },
                      { item: 'Warm intro available', points: '5 pts' }
                    ]
                  }
                ].map((section, i) => (
                  <div key={i} className={`border-2 rounded-xl p-6 ${
                    section.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                    section.color === 'purple' ? 'border-purple-200 bg-purple-50' :
                    section.color === 'orange' ? 'border-orange-200 bg-orange-50' :
                    'border-green-200 bg-green-50'
                  }`}>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">{section.category}</h4>
                    <div className="space-y-2">
                      {section.criteria.map((crit, j) => (
                        <div key={j} className="flex items-center justify-between bg-white p-3 rounded-lg">
                          <span className="text-slate-700 text-sm">{crit.item}</span>
                          <span className={`font-bold text-sm ${
                            section.color === 'blue' ? 'text-blue-700' :
                            section.color === 'purple' ? 'text-purple-700' :
                            section.color === 'orange' ? 'text-orange-700' :
                            'text-green-700'
                          }`}>{crit.points}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <LucideIcons.Lightbulb className="w-8 h-8" />
                How to Use This Scoring System
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <p className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">📊</span> During Research
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>• Score each lead as you build your list</li>
                    <li>• Focus prospecting time on 70+ scores</li>
                    <li>• Use scores to prioritize daily outreach</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <p className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> In Sales Process
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>• Re-score after discovery call</li>
                    <li>• Flag if score drops below 70</li>
                    <li>• Share scores with team for alignment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messaging Section */}
        {activeSection === 'messaging' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Messaging Guidelines</h2>
              <p className="text-slate-600">What to say and how to say it</p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl mb-8">
              <h3 className="text-2xl font-bold mb-4">Core Value Proposition</h3>
              <p className="text-lg leading-relaxed text-slate-200">
                We help growth-stage companies (100-500 employees) build healthy, high-performing teams by <strong className="text-white">decoding the hidden people dynamics that kill productivity</strong>—so you can scale without sacrificing culture or burning out your best leaders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LucideIcons.CheckCircle className="w-6 h-6 text-green-600" />
                  Language That Resonates
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-slate-900 mb-1">✓ "We decode the hidden dynamics"</p>
                    <p className="text-sm text-slate-600">Not: "We provide training"</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-slate-900 mb-1">✓ "Transform your culture"</p>
                    <p className="text-sm text-slate-600">Not: "Improve employee engagement"</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-slate-900 mb-1">✓ "Scale without sacrifice"</p>
                    <p className="text-sm text-slate-600">Not: "Manage change effectively"</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-slate-900 mb-1">✓ "People are your multiplier"</p>
                    <p className="text-sm text-slate-600">Not: "Invest in your people"</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LucideIcons.XCircle className="w-6 h-6 text-red-600" />
                  Phrases to Avoid
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-semibold text-red-700 mb-1">✗ "Cookie-cutter training"</p>
                    <p className="text-sm text-slate-600">They've tried it, didn't work</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-semibold text-red-700 mb-1">✗ "HR solutions"</p>
                    <p className="text-sm text-slate-600">Sounds tactical, not strategic</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-semibold text-red-700 mb-1">✗ "Compliance" or "Best practices"</p>
                    <p className="text-sm text-slate-600">Boring, corporate speak</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-semibold text-red-700 mb-1">✗ "Industry standard"</p>
                    <p className="text-sm text-slate-600">They want to break the mold</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <LucideIcons.Mail className="w-8 h-8 text-blue-600" />
                Cold Outreach Templates
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-bold text-slate-900">Template 1: Post-Funding Angle</p>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">High Convert</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2">
                    <p><strong>Subject:</strong> Congrats on the Series B – One question</p>
                    <p className="pt-2">Hey [Name],</p>
                    <p>Saw you just raised [amount]. Congrats!</p>
                    <p>Quick question: As you scale from [current] to [goal] people, what's your plan for keeping your culture intact?</p>
                    <p>We help [similar company] decode the hidden people dynamics that kill productivity during hypergrowth.</p>
                    <p>Worth a 15-min call?</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-bold text-slate-900">Template 2: Burnout Angle</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Pain-Focused</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700 space-y-2">
                    <p><strong>Subject:</strong> Preventing burnout at [Company]</p>
                    <p className="pt-2">Hi [Name],</p>
                    <p>I noticed you've added [X] people in the last 6 months. That's awesome growth.</p>
                    <p>But here's the risk: your best people are probably carrying too much.</p>
                    <p>We work with companies like [Similar Co] to build leadership capacity before your A-players burn out.</p>
                    <p>15 minutes to explore?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <LucideIcons.MessageCircle className="w-6 h-6 text-purple-600" />
                Objection Handling Scripts
              </h3>
              <div className="space-y-4">
                {[
                  {
                    objection: '"We don\'t have budget right now"',
                    response: '"I get it. What if we started small – a pilot with your leadership team? Prove ROI before you commit big dollars."'
                  },
                  {
                    objection: '"We tried leadership training before, didn\'t work"',
                    response: '"That makes sense – most programs are one-size-fits-all. We decode YOUR specific team dynamics. What if we showed you how we\'d approach it differently?"'
                  },
                  {
                    objection: '"We need to focus on revenue right now"',
                    response: '"I hear you. But what if your best reps are burning out? Your culture IS your revenue engine. Can we show you the correlation?"'
                  },
                  {
                    objection: '"Send me more info"',
                    response: '"Happy to. But context matters – can we do 10 minutes so I can tailor what I send? I don\'t want to waste your time with generic stuff."'
                  }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-gradient-to-r from-slate-50 to-purple-50 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-900 mb-2 text-sm">Objection: {item.objection}</p>
                    <p className="text-slate-700 text-sm italic">Response: {item.response}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Channels Section */}
        {activeSection === 'channels' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Where to Find Them</h2>
              <p className="text-slate-600">Primary channels and communities</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <LucideIcons.Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">LinkedIn</h3>
                    <p className="text-xs text-blue-600 font-semibold">PRIMARY CHANNEL</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">Where your ICP spends 80% of their professional time</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="font-semibold text-slate-900 mb-1">Sales Navigator</p>
                    <p className="text-slate-600">Filter: 100-500 employees, CEO/Founder, growth signals</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="font-semibold text-slate-900 mb-1">Content Strategy</p>
                    <p className="text-slate-600">Post about scaling culture, comment on their posts</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="font-semibold text-slate-900 mb-1">Direct Outreach</p>
                    <p className="text-slate-600">Personalized InMail, reference their recent posts</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <LucideIcons.Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Warm Referrals</h3>
                    <p className="text-xs text-purple-600 font-semibold">HIGHEST CONVERSION</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">Trust-based introductions from your network</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="font-semibold text-slate-900 mb-1">CEO Peer Groups</p>
                    <p className="text-slate-600">YPO, Vistage, EO – ask for intros</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="font-semibold text-slate-900 mb-1">Strategic Partnerships</p>
                    <p className="text-slate-600">HR consultants, executive coaches, VCs</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <p className="font-semibold text-slate-900 mb-1">Client Referrals</p>
                    <p className="text-slate-600">After successful engagement, ask for 3 intros</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <LucideIcons.MapPin className="w-8 h-8 text-green-600" />
                Where They Gather (Communities & Events)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Online Communities',
                    icon: LucideIcons.Globe,
                    color: 'blue',
                    items: [
                      'SaaStr Community',
                      'First Round Review',
                      'Pavilion (fka Revenue Collective)',
                      'LinkedIn Groups: "Scaling Startups"'
                    ]
                  },
                  {
                    title: 'Industry Events',
                    icon: LucideIcons.Calendar,
                    color: 'purple',
                    items: [
                      'SaaStr Annual',
                      'CEO Summit (various)',
                      'Local tech/startup events',
                      'Industry-specific conferences'
                    ]
                  },
                  {
                    title: 'Content Platforms',
                    icon: LucideIcons.BookOpen,
                    color: 'green',
                    items: [
                      'First Round Review articles',
                      'a16z podcast',
                      'Masters of Scale',
                      'Harvard Business Review'
                    ]
                  }
                ].map((section, i) => (
                  <div key={i} className={`p-6 rounded-xl border-2 ${
                    section.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                    section.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <section.icon className={`w-8 h-8 ${
                        section.color === 'blue' ? 'text-blue-600' :
                        section.color === 'purple' ? 'text-purple-600' :
                        'text-green-600'
                      }`} />
                      <p className="font-bold text-slate-900">{section.title}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className={section.color === 'blue' ? 'text-blue-600' : section.color === 'purple' ? 'text-purple-600' : 'text-green-600'}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <LucideIcons.Target className="w-8 h-8" />
                Channel Priority & Effort Matrix
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <p className="font-bold text-lg mb-4 text-green-400">🔥 HIGH Priority (Start Here)</p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>• LinkedIn Sales Navigator (daily activity)</li>
                    <li>• Warm referrals from existing network</li>
                    <li>• Strategic partner referrals</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <p className="font-bold text-lg mb-4 text-yellow-400">⚡ MEDIUM Priority (Build Over Time)</p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    <li>• Content marketing on LinkedIn</li>
                    <li>• CEO peer group participation</li>
                    <li>• Industry event attendance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Plan Section */}
        {activeSection === 'action' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Action Plan</h2>
              <p className="text-slate-600">Choose your path to fill your pipeline</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Two Options to Activate This ICP</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Now that you have your Ideal Customer Profile, it's time to fill your pipeline with qualified leads. Choose the path that fits your resources, timeline, and goals.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-blue-300 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🛠️</span>
                    </div>
                    <div>
                      <p className="font-bold text-blue-700 text-lg">DIY Approach</p>
                      <p className="text-xs text-slate-600">Build your own pipeline</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Best for teams with time and Sales Navigator expertise. Full control, requires 10-15 hours/week.</p>
                  <div className="space-y-2 text-sm text-slate-700 mb-4">
                    <p><strong>What You'll Do:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Source leads using criteria in this ICP</li>
                      <li>• Score each lead 0-100</li>
                      <li>• Craft personalized outreach</li>
                      <li>• Manage follow-ups & nurture</li>
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold"><strong>Investment:</strong> $200-400/mo (Sales Nav + tools) + your time</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl p-6 hover:shadow-2xl transition-shadow border-2 border-emerald-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Done-For-You Leads</p>
                      <p className="text-xs text-emerald-400 font-semibold">RECOMMENDED</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-200 mb-4">90 qualified leads per month with full profiles, ICP scores, and outreach angles. Focus on closing, not prospecting.</p>
                  <div className="space-y-2 text-sm text-slate-200 mb-4">
                    <p><strong>What You Get:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• 90 pre-qualified leads/month</li>
                      <li>• Each scored 70+ on your ICP</li>
                      <li>• Full contact info & LinkedIn</li>
                      <li>• Personalized outreach angles</li>
                      <li>• Buying trigger analysis</li>
                    </ul>
                  </div>
                  <p className="text-xs text-emerald-400 font-semibold"><strong>Investment:</strong> $297/mo</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-10 text-white text-center shadow-2xl">
              <LucideIcons.Rocket className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-3">Ready to Fill Your Pipeline?</h3>
              <p className="text-emerald-100 mb-8 text-lg">Get 90 qualified leads delivered monthly with full ICP scoring and outreach angles</p>
              
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
                <a href="https://www.idynify.com" className="block w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg">
                  Start Lead Delivery
                </a>
                <a href="https://www.idynify.com" className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-xl border-2 border-white/30 transition-all">
                  Schedule a Call
                </a>
              </div>

              <p className="text-sm text-emerald-100 mt-8">
                First 10 leads delivered within 48 hours • No contracts • Cancel anytime
              </p>
            </div>
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
      </div>
      {/* End Content Wrapper */}

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
