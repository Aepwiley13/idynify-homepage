import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ICPQuestionnaireSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown redirect to dashboard
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-purple-500/30 p-12 text-center shadow-2xl">
          {/* Animated Success Icon */}
          <div className="mb-8 animate-bounce">
            <div className="text-8xl mb-4">🎉</div>
            <div className="text-6xl">🐻</div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold text-white mb-4">
            Mission Data Received!
          </h1>
          
          <p className="text-xl text-purple-200 mb-8">
            Barry AI is processing your responses...
          </p>

          {/* What Happens Next */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 mb-8 border border-purple-400/30">
            <h2 className="text-white font-semibold text-lg mb-4 flex items-center justify-center gap-2">
              <span>🚀</span>
              <span>What Happens Next:</span>
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">Barry Analyzes</div>
                  <div className="text-purple-300 text-sm">
                    AI processes your 79 responses (24-48 hours)
                  </div>
                </div>
                <div className="text-2xl">✅</div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">ICP Gets Built</div>
                  <div className="text-purple-300 text-sm">
                    Custom 8-section profile created just for you
                  </div>
                </div>
                <div className="text-2xl">📊</div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">You Get Notified</div>
                  <div className="text-purple-300 text-sm">
                    Email with password-protected link to your ICP
                  </div>
                </div>
                <div className="text-2xl">📧</div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">Start Filling Pipeline</div>
                  <div className="text-purple-300 text-sm">
                    Use your ICP to identify and close better-fit deals
                  </div>
                </div>
                <div className="text-2xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Expected Delivery */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="text-2xl">⏰</div>
              <div className="text-yellow-200">
                <span className="font-semibold">Expected Delivery:</span> Within 48 hours
              </div>
            </div>
          </div>

          {/* What You'll Receive */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">
              📦 Your Complete ICP Package Includes:
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20">
                <div className="text-purple-300">✅ Executive Summary</div>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20">
                <div className="text-purple-300">✅ Firmographics</div>
              </div>
              <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-400/20">
                <div className="text-pink-300">✅ Psychographics</div>
              </div>
              <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-400/20">
                <div className="text-pink-300">✅ Behavioral Signals</div>
              </div>
              <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-400/20">
                <div className="text-cyan-300">✅ ICP Scoring (0-100)</div>
              </div>
              <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-400/20">
                <div className="text-cyan-300">✅ Messaging Guidelines</div>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20">
                <div className="text-purple-300">✅ Channel Strategy</div>
              </div>
              <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-400/20">
                <div className="text-pink-300">✅ Action Plan</div>
              </div>
            </div>
          </div>

          {/* Redirect Info */}
          <div className="text-purple-300 mb-6">
            Redirecting to dashboard in <span className="text-white font-bold text-xl">{countdown}</span> seconds...
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              Go to Dashboard Now
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-purple-300 mb-2">
            Questions about your ICP?
          </p>
          <a 
            href="mailto:support@idynify.com" 
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            📧 support@idynify.com
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6">
          <div className="text-center mb-4">
            <div className="text-purple-300 text-sm mb-2">While you wait...</div>
            <h3 className="text-white font-semibold">
              What Others Are Saying 💬
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/20">
              <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-purple-200 text-sm italic mb-2">
                "The ICP scoring framework alone was worth 10x the price. 
                Our close rate went from 8% to 23%."
              </p>
              <div className="text-purple-400 text-xs">- Mike, VP Sales</div>
            </div>
            <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-400/20">
              <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-pink-200 text-sm italic mb-2">
                "Before Idynify, we wasted 60% of our time on bad-fit leads. 
                We closed 3 deals in the first month - 40x ROI!"
              </p>
              <div className="text-pink-400 text-xs">- Sarah, CEO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPQuestionnaireSuccess;
