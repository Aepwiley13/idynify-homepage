  <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('how-it-works')} className="text-slate-300 hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollToSection('pricing')} className="text-slate-300 hover:text-white transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-white transition-colors">Contact</button>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button onClick={() => scrollToSection('how-it-works')} className="block text-slate-300 hover:text-white transition-colors w-full text-left">How It Works</button>
              <button onClick={() => scrollToSection('pricing')} className="block text-slate-300 hover:text-white transition-colors w-full text-left">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="block text-slate-300 hover:text-white transition-colors w-full text-left">Contact</button>
              <button onClick={() => scrollToSection('contact')} className="block px-6 py-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-lg font-semibold text-center w-full">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -top-48 -left-48"></div>
          <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -bottom-48 -right-48"></div>
          <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
          {/* Space Bear Hero */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="text-9xl animate-bounce">🐻</div>
              <div className="absolute -top-6 -right-6 text-5xl" style={{animation: 'float 3s ease-in-out infinite'}}>🚀</div>
              <div className="absolute -bottom-4 -left-4 text-3xl animate-pulse">✨</div>
              {/* Mission Control Badge */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-slate-800/80 backdrop-blur-sm border border-pink-500/30 rounded-full text-xs text-pink-400 font-semibold whitespace-nowrap">
                MISSION CONTROL READY
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Launch Your AI Sales Agent<br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Solve Your Sales Mystery
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto">
              AI-powered lead generation for B2B Companies
            </p>
            
            {/* Industries */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-slate-400 text-sm">
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">SaaS</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Professional Services</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Agencies</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Recruiters</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Consultants</span>
              <span className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">Tech Vendors</span>
            </div>

            {/* Roles */}
            <p className="text-slate-400 mb-8 text-sm">
              Built for: <span className="text-pink-400">Account Executives</span> • <span className="text-purple-400">SDRs</span> • <span className="text-cyan-400">Founders</span> • <span className="text-pink-400">Marketers</span> • <span className="text-purple-400">GTM Leaders</span> • <span className="text-cyan-400">Sales Ops</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105">
                Build Your ICP Now
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all">
                Schedule Discovery Call
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>ICP-Matched Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>AI-Powered Outreach</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Save 80% of Your Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Sales Mission: Choose Your Path</h2>
            <p className="text-xl text-slate-300">Three tiers. One goal: Fill your pipeline with perfect-fit leads.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Target,
                title: 'Define Your Mission',
                subtitle: 'ICP Brief',
                description: 'Get crystal clear on who to target. Your AI agent needs mission parameters before launch.',
                options: [
                  'Complete ICP analysis',
                  'Scoring framework (0-100)',
                  'Then choose your path:'
                ],
                paths: [
                  '→ DIY: Upload to your tools',
                  '→ OR: Let us source leads (Tier 2)'
                ],
                color: 'pink',
                price: 'Starting at $49.99/month'
              },
              {
                step: '02',
                icon: TrendingUp,
                title: 'Get Your Leads',
                subtitle: 'Lead Delivery (Optional)',
                description: 'We handle the manual, time-sucking work of finding ICP-matched leads for you.',
                options: [
                  '90 leads/month (3/day)',
                  'Complete profiles & scores',
                  'Then choose your path:'
                ],
                paths: [
                  '→ DIY: You do outreach',
                  '→ OR: Autopilot outreach (Tier 3)'
                ],
                color: 'purple',
                price: 'Starting at $99.99/month'
              },
              {
                step: '03',
                icon: Zap,
                title: 'Autopilot Engaged',
                subtitle: 'AI Outreach (Optional)',
                description: 'Your AI agent warms leads while you sleep. You only engage when they respond.',
                options: [
                  'Multi-channel outreach',
                  'A/B testing & optimization',
                  'Result:'
                ],
                paths: [
                  '→ 80% time saved',
                  '→ You focus on closing only'
                ],
                color: 'cyan',
                price: 'Starting at $149.99/month'
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all transform hover:scale-105 h-full">
                  <div className="text-6xl font-bold text-pink-500/20 mb-4">{item.step}</div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color === 'pink' ? 'from-pink-500 to-pink-600' : item.color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-cyan-500 to-cyan-600'} rounded-xl flex items-center justify-center mb-6`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{item.subtitle}</p>
                  <p className="text-slate-300 leading-relaxed mb-4">{item.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {item.options.map((opt, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`bg-gradient-to-r ${item.color === 'pink' ? 'from-pink-900/30' : item.color === 'purple' ? 'from-purple-900/30' : 'from-cyan-900/30'} to-slate-900/30 p-3 rounded-lg border ${item.color === 'pink' ? 'border-pink-500/30' : item.color === 'purple' ? 'border-purple-500/30' : 'border-cyan-500/30'}`}>
                    {item.paths.map((path, j) => (
                      <div key={j} className="text-xs text-slate-300 mb-1 last:mb-0">{path}</div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="text-lg font-bold text-white">{item.price}</div>
                  </div>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-pink-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Mission Level</h2>
            <p className="text-xl text-slate-300">Start with clarity, scale with automation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: 'Tier 1',
                name: 'ICP Brief',
                price: '$49.99',
                period: '/month',
                priceStart: 'Starting at',
                description: 'Define your mission parameters',
                priceDetail: 'Custom pricing available for businesses',
                landingPage: '/icp-brief', // Future landing page URL
                features: [
                  'Complete ICP analysis & scoring',
                  'Messaging guidelines & positioning',
                  'Where to find them (channels)',
                  'Buyer trigger identification',
                  'Anti-profile (who to avoid)',
                  'DIY or upgrade to Tier 2'
                ],
                cta: 'Define Your Mission',
                popular: false,
                gradient: 'from-pink-500 to-pink-600'
              },
              {
                tier: 'Tier 2',
                name: 'Lead Delivery',
                price: '$99.99',
                period: '/month',
                priceStart: 'Starting at',
                description: 'We source leads on your behalf',
                priceDetail: 'Custom pricing available for businesses',
                landingPage: '/lead-delivery', // Future landing page URL
                features: [
                  '90 leads per month (3/day)',
                  'Complete lead profiles & contact info',
                  'ICP score for each lead',
                  'Personalized outreach angles',
                  'Buying trigger analysis',
                  'DIY outreach or upgrade to Tier 3'
                ],
                cta: 'Get Leads Delivered',
                popular: false,
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                tier: 'Tier 3',
                name: 'AI Outreach',
                price: '$149.99',
                period: '/month',
                priceStart: 'Starting at',
                description: 'Full autopilot - save 80% of your time',
                priceDetail: 'Custom pricing available for businesses',
                landingPage: '/ai-outreach', // Future landing page URL
                features: [
                  'AI handles all outreach for you',
                  'Multi-channel (email, SMS, LinkedIn)',
                  'A/B testing & optimization',
                  'Response notifications',
                  'CRM integration ready',
                  'Calling scripts when leads respond'
                ],
                cta: 'Engage Autopilot',
                popular: true,
                gradient: 'from-cyan-500 to-cyan-600'
              }
            ].map((tier, i) => (
              <div key={i} className={`relative ${tier.popular ? 'md:-mt-8 md:mb-8' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-sm font-bold rounded-full z-10 shadow-lg">
                    ⭐ MOST POPULAR
                  </div>
                )}
                <button 
                  onClick={() => {
                    // Will navigate to landing pages when created
                    // For now, scroll to contact
                    scrollToSection('contact');
                  }}
                  className={`w-full bg-slate-800/50 backdrop-blur-sm border-2 ${tier.popular ? 'border-pink-500' : 'border-slate-700'} rounded-2xl p-8 hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/20 transition-all h-full flex flex-col text-left transform hover:scale-105 cursor-pointer`}
                >
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-slate-400 mb-2">{tier.tier}</div>
                    <h3 className="text-3xl font-bold text-white mb-2">{tier.name}</h3>
                    {tier.priceStart && (
                      <div className="text-xs text-slate-400 mb-1">{tier.priceStart}</div>
                    )}
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-slate-400 text-sm">{tier.period}</span>
                    </div>
                    {tier.priceDetail && (
                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">{tier.priceDetail}</p>
                    )}
                    <p className="text-slate-300">{tier.description}</p>
                  </div>

                  <div className="flex-grow mb-8">
                    <div className="space-y-3">
                      {tier.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`px-6 py-4 bg-gradient-to-r ${tier.gradient} text-white rounded-xl font-bold text-center flex items-center justify-center gap-2 group-hover:shadow-xl transition-all`}>
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">Mission Success Metrics</h3>
              <p className="text-slate-300">What to expect when your AI agent launches</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-2">85+</div>
                <div className="text-slate-300">ICP Score = Perfect Fit</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">90</div>
                <div className="text-slate-300">Leads Delivered Monthly</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">80%</div>
                <div className="text-slate-300">Time Saved with Autopilot</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-6xl mb-8">🚀</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Launch Your AI Sales Agent?</h2>
          <p className="text-xl text-slate-300 mb-4">
            Start with an ICP Brief to define your mission parameters.
          </p>
          <p className="text-lg text-slate-400 mb-12">
            Then choose your path: DIY, Lead Delivery, or Full Autopilot
          </p>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Launch Sequence</h3>
            <p className="text-sm text-slate-400 mb-6">Tell us about your sales mission and we'll help you succeed</p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-pink-500 focus:outline-none transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-pink-500 focus:outline-none transition-colors"
              />
              <input 
                type="text" 
                placeholder="Company Name" 
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-pink-500 focus:outline-none transition-colors"
              />
              <textarea 
                placeholder="Tell us about your ideal customer and sales challenges..." 
                rows={4}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-pink-500 focus:outline-none resize-none transition-colors"
              ></textarea>
              
              <div className="flex flex-col gap-3">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all transform hover:scale-105">
                  Build My ICP Brief
                  <Sparkles className="inline-block ml-2 w-5 h-5" />
                </button>
                <button className="w-full px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/20 hover:bg-white/20 transition-all">
                  Schedule Discovery Call
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              🚀 Mission Control responds within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🐻</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-wider italic">IDYNIFY</span>
                <p className="text-xs text-slate-400">Mission Control for B2B Sales</p>
              </div>
            </div>
            <div className="text-slate-400 text-sm text-center">
              <p>© 2025 Idynify. All rights reserved.</p>
              <p className="text-xs mt-1">Your AI Sales Agent Awaits 🚀</p>
            </div>
            <div className="flex gap-6 text-slate-400 text-sm">
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Terms</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for float animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}
