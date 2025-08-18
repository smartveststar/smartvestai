// components/PWAOnboarding.tsx
'use client'

import { useRouter } from 'next/navigation'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Script from 'next/script'
import { Bot, Shield, BarChart3, Zap, TrendingUp, Lock, Award, Target } from 'lucide-react'

export default function PWAOnboarding() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/sign-up')
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 relative overflow-hidden">
      {/* Smartsupp Live Chat Script */}
      <Script
        id="smartsupp-chat"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = 'bc2353ae9bf12c5f80748245026c8f47818a0af4';
            window.smartsupp = function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            };
            window.smartsupp(document);
          `
        }}
      />

      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Main Hero Section */}
        <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-slate-700/50 shadow-2xl shadow-slate-900/30 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Enhanced AI Visual Element */}
            <div className="mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-600/40 border border-cyan-500/30">
                <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>

            {/* Enhanced Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Trust Chain
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text neon-glow">
                Invest AI
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-slate-300 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto">
              Empowering your financial future with intelligent blockchain investments and AI-driven insights through institutional-grade technology.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4 mb-12">
              <SignedOut>
                <button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 neon-button text-lg"
                >
                  Get Started
                </button>
              </SignedOut>

              <SignedIn>
                <button
                  onClick={handleDashboard}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 neon-button text-lg"
                >
                  Access Dashboard
                </button>
              </SignedIn>
            </div>

            {/* Professional Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span className="text-base">AI-Powered Technology</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span className="text-base">Blockchain Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-cyan-400" />
                <span className="text-base">Intelligent Investments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-slate-700/50 shadow-2xl shadow-slate-900/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Intelligent Investment Platform</h2>
            <p className="text-slate-300 text-lg sm:text-xl">Experience the future of blockchain investing with our AI-driven technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-cyan-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-600/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">AI-Driven Analysis</h3>
              <p className="text-slate-400 text-base">Advanced machine learning algorithms analyze market trends and optimize investment strategies in real-time.</p>
            </div>
            
            <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-cyan-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-600/30">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Blockchain Security</h3>
              <p className="text-slate-400 text-base">Institutional-grade security protocols with encrypted transaction processing and decentralized verification.</p>
            </div>
            
            <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-cyan-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-600/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Smart Portfolio</h3>
              <p className="text-slate-400 text-base">Automated portfolio management with intelligent diversification and risk optimization strategies.</p>
            </div>
          </div>

          <div className="border-t border-slate-600/50 pt-8">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Transform Your Investment Strategy?</h3>
              <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of investors who trust our AI-powered platform to maximize their blockchain investment returns through intelligent automation and advanced analytics.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Instant Setup</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Real-time Analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Bank-Grade Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        .neon-glow {
          text-shadow: 
            0 0 10px rgba(34, 211, 238, 0.7),
            0 0 20px rgba(34, 211, 238, 0.5),
            0 0 30px rgba(34, 211, 238, 0.3);
        }
        
        .neon-button {
          box-shadow: 
            0 0 20px rgba(6, 182, 212, 0.3),
            0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .neon-button:hover {
          box-shadow: 
            0 0 30px rgba(6, 182, 212, 0.5),
            0 6px 20px rgba(0, 0, 0, 0.4);
        }

        /* Smartsupp chat widget position override */
        :global(#smartsupp-widget-container),
        :global(.smartsupp-widget),
        :global([id*="smartsupp"]) {
          top: 20px !important;
          bottom: auto !important;
          right: 20px !important;
        }
      `}</style>

      {/* Fallback for users with JavaScript disabled */}
      <noscript>
        <div style={{position: 'fixed', top: '20px', right: '20px', zIndex: 9999}}>
          Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
        </div>
      </noscript>
    </div>
  )
}