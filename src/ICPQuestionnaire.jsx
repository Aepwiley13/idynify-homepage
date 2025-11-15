import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ICPQuestionnaire = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (!token || !userData) {
        navigate('/login');
        return;
      }
      
      setUser(JSON.parse(userData));
      setLoading(false);
    };

    checkAuth();

    // Listen for Typeform completion
    const handleMessage = (event) => {
      // Typeform sends postMessage when form is submitted
      if (event.data && event.data.type === 'form-submit') {
        console.log('Typeform submitted!');
        // Redirect to dashboard or success page
        setTimeout(() => {
          navigate('/dashboard?icp-submitted=true');
        }, 2000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-purple-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                🐻 ICP Mission Briefing
              </h1>
              <p className="text-purple-300 text-sm">Time to identify your ideal customer</p>
            </div>
          </div>
          <div className="text-purple-300 text-sm">
            👤 {user?.name || user?.email}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-purple-500/30 p-8 mb-6 shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="text-6xl">🎯</div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to Mission Control 🚀
              </h2>
              <p className="text-purple-200 mb-4 text-lg leading-relaxed">
                Barry AI is ready to analyze your ideal customer profile. This comprehensive 
                questionnaire will help us understand your business, your customers, and create 
                a world-class ICP that transforms your pipeline.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-400/30">
                  <div className="text-2xl mb-2">⏱️</div>
                  <div className="text-white font-semibold">15-20 Minutes</div>
                  <div className="text-purple-300 text-sm">Completion time</div>
                </div>
                <div className="bg-pink-500/20 rounded-lg p-4 border border-pink-400/30">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-white font-semibold">79 Questions</div>
                  <div className="text-purple-300 text-sm">Comprehensive analysis</div>
                </div>
                <div className="bg-cyan-500/20 rounded-lg p-4 border border-cyan-400/30">
                  <div className="text-2xl mb-2">🎁</div>
                  <div className="text-white font-semibold">48 Hours</div>
                  <div className="text-purple-300 text-sm">Delivery time</div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div className="flex-1">
                    <div className="text-yellow-200 font-semibold mb-1">Pro Tip</div>
                    <p className="text-yellow-100 text-sm">
                      Take your time and be as specific as possible. The more detail you provide, 
                      the better Barry can build your ICP. You can save and come back anytime!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-purple-200">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>✅</span> What You'll Get:
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm">Executive Summary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm">Firmographic Profile</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="text-sm">Psychographic Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="text-sm">Behavioral Signals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm">ICP Scoring Framework (0-100)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm">Messaging Guidelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm">Channel Strategy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="text-sm">Action Plan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typeform Embedded */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/30 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <span>🐻</span>
                <span>Barry's ICP Discovery Questionnaire</span>
              </h3>
              <div className="text-white/80 text-sm">
                Save your progress anytime
              </div>
            </div>
          </div>
          
          {/* Typeform Iframe */}
          <div className="relative" style={{ height: '80vh', minHeight: '600px' }}>
            <iframe
              src="https://form.typeform.com/to/K2Wh2A2W#email={user?.email}&name={user?.name}&user_id={user?.id}"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="ICP Discovery Questionnaire"
              allow="camera; microphone; autoplay; encrypted-media;"
            />
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-purple-300 mb-2">
            Need help? Have questions?
          </p>
          <a 
            href="mailto:support@idynify.com" 
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            📧 support@idynify.com
          </a>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-purple-400 text-sm">
        <p>🔒 Your data is secure and encrypted. We never share your information.</p>
      </div>
    </div>
  );
};

export default ICPQuestionnaire;
