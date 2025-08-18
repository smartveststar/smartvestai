'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, TrendingUp, ArrowRight, Bot, DollarSign, BarChart3, Shield, Target, Clock, Award } from 'lucide-react';
import InstallButton from './InstallButton';

export default function SmartVestOnboarding() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 opacity-15 sm:opacity-20">
        <div className="absolute top-8 left-2 w-28 h-28 sm:w-36 sm:h-36 lg:w-52 lg:h-52 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-16 right-2 w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 left-4 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-16 right-6 w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-5 sm:opacity-8">
        <div className="h-full w-full bg-gradient-to-br from-transparent via-emerald-500/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(148,163,184,0.2)_25%,rgba(148,163,184,0.2)_26%,transparent_27%,transparent_74%,rgba(148,163,184,0.2)_75%,rgba(148,163,184,0.2)_76%,transparent_77%,transparent)] bg-[length:70px_70px] sm:bg-[length:90px_90px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(148,163,184,0.2)_25%,rgba(148,163,184,0.2)_26%,transparent_27%,transparent_74%,rgba(148,163,184,0.2)_75%,rgba(148,163,184,0.2)_76%,transparent_77%,transparent)] bg-[length:70px_70px] sm:bg-[length:90px_90px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-4 py-6 sm:py-8 text-center">
        {/* Professional Welcome Section */}
        <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center space-x-3 sm:space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-800 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 border border-emerald-500/20">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
          </div>
          <div className="text-left">
            <InstallButton />
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight">Welcome Back</h1>
            <p className="text-emerald-300 text-sm sm:text-base lg:text-lg font-medium">Your portfolio awaits optimization</p>
          </div>
        </div>

        {/* Sophisticated Headline */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-14 px-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
            Your Investment
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent block drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
              Command Center
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-200 leading-relaxed mb-6 sm:mb-8 lg:mb-10">
            Monitor portfolio performance, access AI-driven insights, and optimize your wealth-building strategy through our sophisticated investment platform.
          </p>
        </div>

        {/* Premium Dashboard Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-8 sm:mb-10 lg:mb-14 w-full px-2">
          <div className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl shadow-emerald-900/20">
            <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Portfolio Value</h3>
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">$24,389.75</div>
            <div className="text-emerald-400 text-sm sm:text-base font-medium">+18.3% quarterly growth</div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl shadow-emerald-900/20">
            <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">AI Insights</h3>
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">12 Active</div>
            <div className="text-teal-400 text-sm sm:text-base font-medium">High-probability signals</div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700/50 shadow-2xl shadow-emerald-900/20 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Active Solutions</h3>
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">2 Running</div>
            <div className="text-slate-400 text-sm sm:text-base font-medium">Optimizing returns</div>
          </div>
        </div>

        {/* Professional Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-14 w-full px-2">
          <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-700/50 text-center">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-emerald-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">$150</div>
            <div className="text-xs sm:text-sm text-slate-400">Min Investment</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-700/50 text-center">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">8-12%</div>
            <div className="text-xs sm:text-sm text-slate-400">Annual ROI</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-700/50 text-center">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-emerald-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">24/7</div>
            <div className="text-xs sm:text-sm text-slate-400">AI Monitoring</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-lg rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-700/50 text-center">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-slate-400 mx-auto mb-2 sm:mb-3" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">SEC</div>
            <div className="text-xs sm:text-sm text-slate-400">Compliant</div>
          </div>
        </div>

        {/* Available Investment Solutions */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-10 lg:mb-14 w-full px-2">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">Your Investment Solutions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 shadow-lg shadow-emerald-500/10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-emerald-400 font-semibold px-2 py-1 bg-emerald-500/20 rounded-lg border border-emerald-500/30">ACTIVE</span>
              </div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">SmartVest Professional</h4>
              <p className="text-xs sm:text-sm text-slate-400 mb-3">Intelligent Portfolio Management</p>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-emerald-400 font-medium">$150 min</span>
                <span className="text-teal-400 font-medium">8-12% annual</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 shadow-lg shadow-slate-500/10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-slate-700 to-gray-800 rounded-xl flex items-center justify-center border border-slate-600/30">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-slate-500 font-medium px-2 py-1 bg-slate-600/20 rounded-lg border border-slate-600/30">AVAILABLE</span>
              </div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">SmartVest Elite</h4>
              <p className="text-xs sm:text-sm text-slate-400 mb-3">Advanced Quantitative Trading</p>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-slate-400 font-medium">$15,000 min</span>
                <span className="text-slate-300 font-medium">18-25% annual</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/70 to-gray-900/70 backdrop-blur-lg rounded-2xl p-4 sm:p-5 lg:p-6 border border-slate-700/50 shadow-lg shadow-amber-500/10 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center border border-amber-500/30">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-xs sm:text-sm text-slate-500 font-medium px-2 py-1 bg-slate-600/20 rounded-lg border border-slate-600/30">AVAILABLE</span>
              </div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2">SmartVest Premier</h4>
              <p className="text-xs sm:text-sm text-slate-400 mb-3">Wealth Optimization + Recovery</p>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-amber-400 font-medium">$2,500 min</span>
                <span className="text-orange-400 font-medium">25-35% total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional CTA Button */}
        <Link href="/dashboard" className="w-full max-w-sm sm:max-w-none sm:w-auto">
          <button className="group relative bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-4 sm:py-5 px-8 sm:px-10 rounded-xl lg:rounded-2xl text-base sm:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-600/40 flex items-center justify-center space-x-3 w-full sm:w-auto border border-emerald-500/30">
            <span>Access Investment Dashboard</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        {/* Professional Trust Badge */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center space-x-4 text-slate-400">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span className="text-sm">Institutional Grade</span>
          </div>
          <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">SEC Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}