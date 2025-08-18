'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Brain, TrendingUp, Shield, DollarSign, Bot, Download, Play, CheckCircle, Lock, Award, BarChart3, Users } from 'lucide-react';
import ReferralRecoverySection from './ReferralRecoverySection';
import InstallButton from './InstallButton';

export default function SmartVestLanding() {
  const [activeBot, setActiveBot] = useState('professional');

  const bots = {
    professional: {
      name: 'SmartVest Professional',
      tagline: 'Intelligent Portfolio Management',
      minInvestment: '$150',
      returns: '8-12% Annually',
      period: 'Annual',
      color: 'from-emerald-600 to-teal-700',
      description: 'A sophisticated AI-driven portfolio management solution designed for consistent, long-term wealth building. Built on institutional-grade algorithms and comprehensive market analysis.',
      features: [
        'Professional entry point – Starting at $150',
        'Diversified portfolio management across multiple asset classes',
        '8-12% annual returns with risk-adjusted strategies',
        'Backed by SmartVest AI\'s commitment to excellence'
      ]
    },
    elite: {
      name: 'SmartVest Elite',
      tagline: 'Advanced Quantitative Trading',
      minInvestment: '$15,000',
      returns: '18-25% Annually',
      period: 'Annual',
      color: 'from-slate-700 to-gray-800',
      description: 'Advanced quantitative trading system utilizing machine learning algorithms for high-frequency market opportunities. Designed for sophisticated investors seeking premium returns.',
      features: [
        'Institutional-grade quantitative strategies',
        '18-25% annual ROI through advanced algorithms',
        'Real-time market analysis and execution',
        'Exclusive access to premium investment tools'
      ]
    },
    premier: {
      name: 'SmartVest Premier',
      tagline: 'Wealth Optimization + Recovery',
      minInvestment: '$2,500',
      returns: '25-35% Total',
      period: '18 Months',
      color: 'from-amber-600 to-orange-700',
      description: 'Comprehensive wealth optimization platform with integrated portfolio recovery services. Engineered for maximum capital efficiency and strategic asset rehabilitation.',
      features: [
        '25-35% total returns over 18-month cycles',
        'Portfolio Recovery Program – Optimize underperforming assets',
        'Comprehensive wealth management suite',
        'Up to 45% total optimization potential'
      ]
    }
  };

  const currentBot = bots[activeBot as keyof typeof bots];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
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

      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-20 w-56 h-56 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Professional Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_24%,rgba(148,163,184,0.3)_25%,rgba(148,163,184,0.3)_26%,transparent_27%,transparent_74%,rgba(148,163,184,0.3)_75%,rgba(148,163,184,0.3)_76%,transparent_77%,transparent)] bg-[length:80px_80px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(148,163,184,0.3)_25%,rgba(148,163,184,0.3)_26%,transparent_27%,transparent_74%,rgba(148,163,184,0.3)_75%,rgba(148,163,184,0.3)_76%,transparent_77%,transparent)] bg-[length:80px_80px]"></div>
      </div>

      <div className="relative z-10 px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="relative">
              <div className="w-18 h-18 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 border border-emerald-500/20">
                <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-400/50">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">SmartVest</h1>
              <p className="text-emerald-400 text-lg sm:text-xl lg:text-2xl font-medium tracking-wide">AI</p>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            Institutional-Grade
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent block">
              AI Investment
            </span>
            <span className="text-slate-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">Solutions</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-10 sm:mb-12">
            Experience sophisticated artificial intelligence-driven investment strategies. From professional portfolio management to elite quantitative trading—powered by institutional-grade technology.
          </p>
          
          {/* Professional CTA Button */}
          <div className="mb-12 sm:mb-16 flex justify-center">
            <Link href="/sign-up">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-600/40 hover:shadow-xl hover:shadow-emerald-600/50 transform hover:scale-105 text-lg sm:text-xl border border-emerald-500/30">
                Begin Investment Journey
              </button>
            </Link>
          </div>

          {/* Hero Image Section */}
          <div className="relative max-w-6xl mx-auto mb-16 sm:mb-20">
            <InstallButton />
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-emerald-900/20 bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm">
              <Image 
                src="/Trustchain.png"
                alt="Three AI investment specialists representing SmartVest's portfolio management systems"
                width={1400}
                height={700}
                className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="grid grid-cols-3 gap-3 sm:gap-6">
                  <div className="text-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xl rounded-xl border border-emerald-500/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-700 to-gray-800 rounded-lg mx-auto mb-2 flex items-center justify-center border border-slate-600/30">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 font-medium">Elite Trading</p>
                    <p className="text-xs text-slate-400">$15,000 Premium</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xl rounded-xl border border-amber-500/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg mx-auto mb-2 flex items-center justify-center border border-amber-500/30">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <p className="text-sm sm:text-base text-amber-200 font-medium">Premier Suite</p>
                    <p className="text-xs text-slate-400">$2,500 Optimization</p>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xl rounded-xl border border-emerald-500/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg mx-auto mb-2 flex items-center justify-center border border-emerald-500/30">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <p className="text-sm sm:text-base text-emerald-200 font-medium">Professional</p>
                    <p className="text-xs text-slate-400">$150 Start</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Solution Selection */}
        <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="flex flex-col gap-8 sm:gap-10 mb-10 sm:mb-12">
            {/* Solution Selector */}
            <div className="w-full">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Select Your Investment Solution</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                {Object.entries(bots).map(([key, bot]) => (
                  <button
                    key={key}
                    onClick={() => setActiveBot(key)}
                    className={`text-left p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${
                      activeBot === key
                        ? 'border-emerald-500 bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-lg shadow-xl shadow-emerald-500/20'
                        : 'border-slate-600/50 bg-slate-800/50 backdrop-blur-lg hover:border-emerald-500/50 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-tight">{bot.name}</h4>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${bot.color} rounded-xl flex items-center justify-center shadow-lg border border-white/20`}>
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    </div>
                    <p className="text-emerald-300 text-sm sm:text-base mb-4">{bot.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold text-base sm:text-lg">{bot.minInvestment}</span>
                      <span className="text-teal-400 font-bold text-base sm:text-lg">{bot.returns}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Solution Details */}
            <div className="w-full">
              <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-slate-700/50 shadow-2xl shadow-slate-900/30">
                <div className="flex items-center space-x-4 sm:space-x-6 mb-8">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${currentBot.color} rounded-2xl flex items-center justify-center shadow-xl border border-white/20`}>
                    <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{currentBot.name}</h3>
                    <p className="text-emerald-300 text-base sm:text-lg lg:text-xl">{currentBot.tagline}</p>
                  </div>
                </div>

                <p className="text-slate-200 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 leading-relaxed">
                  {currentBot.description}
                </p>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                  <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-slate-600/50">
                    <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mx-auto mb-3" />
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{currentBot.minInvestment}</div>
                    <div className="text-sm sm:text-base text-slate-400">Minimum Investment</div>
                  </div>
                  <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-slate-600/50">
                    <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400 mx-auto mb-3" />
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{currentBot.returns}</div>
                    <div className="text-sm sm:text-base text-slate-400">Projected Returns</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4 mb-8 sm:mb-10">
                  {currentBot.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-200 text-base sm:text-lg">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Investment CTA */}
                <div className="text-center">
                  <Link href="/sign-up">
                    <button className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-600/40 hover:shadow-xl hover:shadow-emerald-600/50 transform hover:scale-105 border border-emerald-500/30">
                      Access {currentBot.name}
                    </button>
                  </Link>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        {/* Educational Resources Section */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-slate-700/50 shadow-2xl shadow-slate-900/30">
            <div className="text-center mb-8 sm:mb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-600/40 border border-amber-500/30">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">Investment Education Center</h3>
              <p className="text-slate-200 text-base sm:text-lg lg:text-xl">Master AI-driven investment strategies with our comprehensive educational resources</p>
            </div>
            
            <div className="space-y-8">
              {/* Primary Educational Video */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/50 shadow-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/fFKcpmBDKVM?controls=1&modestbranding=1&rel=0"
                  title="SmartVest AI Investment Strategy Guide"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Additional Educational Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <iframe
                  className="w-full aspect-video rounded-xl border border-slate-700/50"
                  src="https://www.youtube.com/embed/OHP86kxF3xY?controls=1&modestbranding=1&rel=0"
                  title="Advanced Portfolio Management Techniques"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <iframe
                  className="w-full aspect-video rounded-xl border border-slate-700/50"
                  src="https://www.youtube.com/embed/JbcfSXZ8H3Q?controls=1&modestbranding=1&rel=0"
                  title="Quantitative Trading Fundamentals"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <iframe
                  className="w-full aspect-video rounded-xl border border-slate-700/50"
                  src="https://www.youtube.com/embed/XRK4CvRVIcs?controls=1&modestbranding=1&rel=0"
                  title="Risk Management and Optimization"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        {/* Investment Guide Download */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-slate-700/50 shadow-2xl shadow-slate-900/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6 mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl shadow-teal-600/40 border border-teal-500/30">
                    <Download className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Professional Investment Guide</h3>
                    <p className="text-slate-200 text-base sm:text-lg">Comprehensive AI Investment Strategy Documentation</p>
                  </div>
                </div>
                <p className="text-slate-400 text-base max-w-lg">
                  Download our detailed guide covering all investment solutions, risk management protocols, and advanced portfolio optimization strategies.
                </p>
              </div>
              <a
                href="/api/download-guide"
                className="bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-600/40 flex items-center space-x-3 border border-teal-500/30"
              >
                <Download className="w-6 h-6" />
                <span>Download Guide</span>
              </a>
            </div>
          </div>
        </div>

        {/* Portfolio Recovery Section */}
        <ReferralRecoverySection />

        {/* Trust & Credibility Indicators */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="text-center p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">Regulatory Compliance</h4>
              <p className="text-sm sm:text-base text-slate-400">Full adherence to financial regulations</p>
            </div>
            <div className="text-center p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">Institutional Security</h4>
              <p className="text-sm sm:text-base text-slate-400">Bank-grade security protocols</p>
            </div>
            <div className="text-center p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">Verified Results</h4>
              <p className="text-sm sm:text-base text-slate-400">75,000+ successful investors</p>
            </div>
            <div className="text-center p-6 sm:p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">AI Excellence</h4>
              <p className="text-sm sm:text-base text-slate-400">Award-winning technology platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Fixed CTA */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Link href="/sign-up">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-600/40 hover:shadow-xl hover:shadow-emerald-600/50 transform hover:scale-105 flex items-center space-x-2 border border-emerald-500/30">
            <span>Start Investing</span>
          </button>
        </Link>
      </div>

      {/* Accessibility Fallback */}
      <noscript>
        <div style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999}}>
          Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
        </div>
      </noscript>
    </div>
  );
}