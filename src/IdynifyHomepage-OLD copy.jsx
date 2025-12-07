import React, { useState } from 'react';
import { ArrowRight, Target, Zap, Users, CheckCircle, Star } from 'lucide-react';

const Homepage = () => {
  // Points to your /request page
  const REQUEST_PAGE_URL = '/request';
  
  const handleGetStarted = () => {
    window.location.href = REQUEST_PAGE_URL;
  };

  const handleContactTier = (tier) => {
    window.location.href = `mailto:support@idynify.com?subject=Interested in ${tier}&body=Hi! I'm interested in learning more about ${tier}.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-4xl">🐻</span>
            <span className="text-2xl font-bold text-white">Idynify</span>
          </div>
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
              🚀 AI-Powered Customer Intelligence
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Stop Wasting Time on
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text"> Bad-Fit Leads</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Get a custom Ideal Customer Profile (ICP) in 48 hours. Know exactly who to target, what to say, and where to find them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              Build Your ICP Now
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 text-white text-lg font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              See How It Works
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-400" />
              <span>15-min setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-400" />
              <span>48-hour delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10-20x</div>
              <div className="text-gray-400">ROI on Investment</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">70-95%</div>
              <div className="text-gray-400">Cheaper than Consultants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">48hrs</div>
              <div className="text-gray-400">Custom ICP Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🎯 How It Works
            </h2>
            <p className="text-xl text-gray-300">
              From questionnaire to qualified leads in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                icon: '📋',
                title: 'Fill Questionnaire',
                description: '15-minute questionnaire about your business and ideal customer',
              },
              {
                step: '2',
                icon: '🐻',
                title: 'Barry Analyzes',
                description: 'Our AI analyzes your responses and identifies patterns',
              },
              {
                step: '3',
                icon: '📊',
                title: 'Get Custom ICP',
                description: '8-section ICP delivered to your private dashboard in 48 hours',
              },
              {
                step: '4',
                icon: '🚀',
                title: 'Fill Pipeline',
                description: 'Use scoring framework and messaging templates to close deals',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-purple-400 font-bold mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all"
            >
              Start Your ICP Now →
            </button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What's Inside Your ICP
            </h2>
            <p className="text-xl text-gray-300">
              8 comprehensive sections covering everything you need to know
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Executive Summary',
                description: 'Who to target at-a-glance with perfect-fit indicators and anti-profile',
                icon: <Target className="text-purple-400" size={24} />,
              },
              {
                title: 'Firmographics',
                description: 'Company size, stage, budget, industries, and decision makers',
                icon: <Users className="text-pink-400" size={24} />,
              },
              {
                title: 'Psychographics',
                description: 'Top 5 pain points, core values, goals, and language they use',
                icon: '🧠',
              },
              {
                title: 'Behavioral Signals',
                description: 'Hot buying triggers, research patterns, and timing strategy',
                icon: '🎯',
              },
              {
                title: 'ICP Scoring (0-100)',
                description: 'Weighted qualification framework to prioritize your best leads',
                icon: '📊',
              },
              {
                title: 'Messaging Guidelines',
                description: 'Value proposition, cold email templates, and objection handling',
                icon: '💬',
              },
              {
                title: 'Channel Strategy',
                description: 'Where to find them, communities, events, and LinkedIn tactics',
                icon: '🔍',
              },
              {
                title: 'Action Plan',
                description: 'DIY roadmap or done-for-you options with clear next steps',
                icon: <Zap className="text-yellow-400" size={24} />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{typeof item.icon === 'string' ? item.icon : item.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Mission
            </h2>
            <p className="text-xl text-gray-300">
              From DIY to full autopilot - we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="text-center mb-6">
                <div className="text-purple-400 font-semibold mb-2">TIER 1</div>
                <h3 className="text-2xl font-bold text-white mb-4">ICP Brief</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">$49.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-sm">Perfect for DIY prospectors</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Custom ICP in 48 hours',
                  '8 comprehensive sections',
                  'Scoring framework (0-100)',
                  'Messaging templates',
                  'Channel strategy',
                  'Password-protected dashboard',
                  'Biweekly updates',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleGetStarted}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started →
              </button>

              <p className="text-center text-gray-500 text-xs mt-4">Cancel anytime</p>
            </div>

            {/* Tier 2 */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border-2 border-purple-500 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              
              <div className="text-center mb-6">
                <div className="text-purple-400 font-semibold mb-2">TIER 2</div>
                <h3 className="text-2xl font-bold text-white mb-4">Lead Delivery</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">$99.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-sm">We find the leads for you</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Tier 1',
                  '90 scored leads per month',
                  'LinkedIn profiles with emails',
                  'Pre-qualified using your ICP',
                  'Organized by score (70-100)',
                  'Ready for outreach',
                  'Saves 15-20 hours/month',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleContactTier('Tier 2 - Lead Delivery')}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all"
              >
                Contact Us →
              </button>

              <p className="text-center text-gray-500 text-xs mt-4">Limited spots available</p>
            </div>

            {/* Tier 3 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="text-center mb-6">
                <div className="text-purple-400 font-semibold mb-2">TIER 3</div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Autopilot</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">$149.99</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-400 text-sm">We do it all for you</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Tier 2',
                  'AI-powered personalized outreach',
                  'Multi-channel sequences',
                  'Meeting booking automation',
                  'CRM integration',
                  'Weekly performance reports',
                  'Replaces $3K/mo SDR',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleContactTier('Tier 3 - AI Autopilot')}
                className="w-full py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                Contact Us →
              </button>

              <p className="text-center text-gray-500 text-xs mt-4">Custom onboarding included</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Not sure which tier? Start with Tier 1 and upgrade anytime.</p>
            <button
              onClick={handleGetStarted}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              See detailed comparison →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What People Will Say
            </h2>
            <p className="text-gray-400">(Coming soon from real customers!)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Before Idynify, we were wasting 60% of our time on bad-fit leads. Barry helped us focus on companies that actually convert. We closed 3 deals in the first month - ROI was 40x.",
                author: "Sarah",
                title: "CEO at SaaS Startup",
              },
              {
                quote: "The ICP scoring framework alone was worth 10x the price. We now know exactly who to target and our close rate went from 8% to 23%.",
                author: "Mike",
                title: "VP Sales at B2B Agency",
              },
              {
                quote: "I tried to build our ICP myself for weeks. Barry did it in 48 hours and it was better than anything I could have made.",
                author: "Jessica",
                title: "Founder at Consulting Firm",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Idynify vs. Alternatives?
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-gray-400 font-semibold"></th>
                  <th className="p-4 text-center text-purple-400 font-bold">Idynify</th>
                  <th className="p-4 text-center text-gray-400 font-semibold">Consultants</th>
                  <th className="p-4 text-center text-gray-400 font-semibold">DIY</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-gray-300">Price</td>
                  <td className="p-4 text-center text-white font-semibold">$49-149/mo</td>
                  <td className="p-4 text-center text-gray-400">$5K-50K</td>
                  <td className="p-4 text-center text-gray-400">Free</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-gray-300">Delivery Time</td>
                  <td className="p-4 text-center text-white font-semibold">48 hours</td>
                  <td className="p-4 text-center text-gray-400">2-4 weeks</td>
                  <td className="p-4 text-center text-gray-400">40+ hours</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-gray-300">Updates</td>
                  <td className="p-4 text-center text-white font-semibold">Biweekly</td>
                  <td className="p-4 text-center text-gray-400">Never</td>
                  <td className="p-4 text-center text-gray-400">Manual</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-gray-300">Lead Delivery</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="text-green-400 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center text-gray-400">❌</td>
                  <td className="p-4 text-center text-gray-400">❌</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">AI-Powered</td>
                  <td className="p-4 text-center">
                    <CheckCircle className="text-green-400 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center text-gray-400">❌</td>
                  <td className="p-4 text-center text-gray-400">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Stop Wasting Time on Bad Leads?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get your custom ICP in 48 hours. Know exactly who to target and how to reach them.
            </p>
            <button
              onClick={handleGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-3"
            >
              Build Your ICP Now
              <ArrowRight size={24} />
            </button>
            <p className="text-gray-400 mt-6">
              ✅ 15-minute setup • ✅ Cancel anytime • ✅ Money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🐻</span>
                <span className="text-xl font-bold text-white">Idynify</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered customer intelligence to help B2B companies fill their pipeline.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#how-it-works" className="hover:text-purple-400">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-purple-400">Pricing</a></li>
                <li><button onClick={handleGetStarted} className="hover:text-purple-400">Get Started</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="mailto:support@idynify.com" className="hover:text-purple-400">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400">About</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">LinkedIn</a></li>
                <li><a href="#" className="hover:text-purple-400">Twitter</a></li>
                <li><a href="mailto:support@idynify.com" className="hover:text-purple-400">support@idynify.com</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Idynify. Built with 🐻 by Barry AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
