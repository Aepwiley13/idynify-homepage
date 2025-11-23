import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import * as LucideIcons from 'lucide-react';

const UserICPView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [icpData, setIcpData] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (!userDoc.exists()) {
          setError('User data not found');
          setLoading(false);
          return;
        }

        const userData = userDoc.data();
        setUser(userData);

        if (!userData.generatedICP) {
          setError('ICP not yet generated. Please complete the questionnaire first.');
          setLoading(false);
          return;
        }

        setIcpData(userData.generatedICP);
        setLoading(false);
      } catch (err) {
        console.error('Error loading ICP:', err);
        setError('Failed to load your ICP. Please try again.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🐻</div>
          <p className="text-cyan-400 text-xl font-mono">Loading your ICP...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Error Loading ICP</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!icpData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">ICP Not Ready</h2>
          <p className="text-slate-600 mb-6">Your ICP hasn't been generated yet. Please complete the questionnaire first.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"></div>
      </div>

      {/* Content */}
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
                  <span className="text-xs font-semibold text-emerald-300">Your Custom ICP</span>
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <LucideIcons.Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Powered by Barry AI</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">{user?.company || 'Your Company'}</h1>
              <p className="text-xl text-slate-300 mb-6">Ideal Customer Profile & Go-To-Market Strategy</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>79 Questions Analyzed</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>8 Sections Complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Generated by Claude AI</span>
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
          
          {/* Executive Summary */}
          {activeSection === 'overview' && icpData.executiveSummary && (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Executive Summary</h2>
                <p className="text-slate-400">Your ideal customer at a glance</p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Your Ideal Customer At a Glance</h3>
                <p className="text-slate-700 leading-relaxed">
                  {icpData.executiveSummary.idealCustomerGlance}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <LucideIcons.CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Perfect Fit Indicators</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {icpData.executiveSummary.perfectFitIndicators?.map((indicator, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <LucideIcons.XCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Anti-Profile (Avoid)</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {icpData.executiveSummary.antiProfile?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {icpData.executiveSummary.keyInsight && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8">
                  <h4 className="text-xl font-bold text-white mb-4">Key Insight</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {icpData.executiveSummary.keyInsight}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Placeholder for other sections - we'll add these based on the data structure */}
          {activeSection !== 'overview' && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Section Coming Soon</h3>
              <p className="text-slate-600">This section is being rendered from your custom ICP data.</p>
              <pre className="mt-4 text-left bg-slate-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                {JSON.stringify(icpData[activeSection] || {}, null, 2)}
              </pre>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LucideIcons.Sparkles className="w-5 h-5" />
              <p className="font-bold text-lg">Powered by Barry AI</p>
            </div>
            <p className="text-slate-400 text-sm">Your ICP improves with machine learning</p>
          </div>
        </footer>
      </div>

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

export default UserICPView;