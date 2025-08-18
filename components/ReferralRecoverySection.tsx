import React from 'react';
import { Users, Shield, CheckCircle, Bot, Lock, Eye, BarChart3, Award, Target } from 'lucide-react';

export default function SmartVestReferralRecoverySection() {
  return (
    <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
      {/* Professional Partnership Program */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-slate-700/50 shadow-2xl shadow-slate-900/30 mb-12 sm:mb-16">
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-600/40 border border-teal-500/30">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">Partnership Rewards Program</h3>
          <p className="text-emerald-300 text-xl sm:text-2xl font-semibold">Professional Network Growth Incentives</p>
        </div>

        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
          <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed">
            At SmartVest AI, we recognize the value of professional networks in expanding sophisticated investment opportunities. Our Partnership Rewards Program provides structured compensation for qualified referrals to our institutional-grade platform.
          </p>
          
          <div className="mb-6 sm:mb-8">
            <p className="text-white text-lg sm:text-xl font-semibold mb-6">Professional Tier Structure:</p>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-4 sm:space-x-6 p-6 bg-slate-700/30 rounded-2xl border border-teal-500/30">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <div>
                  <p className="text-teal-300 font-semibold text-base sm:text-lg mb-2">Primary Partnership Level</p>
                  <p className="text-slate-200 text-base sm:text-lg">Earn 5% commission on direct referral investments</p>
                  <p className="text-slate-400 text-sm mt-1">Professional network development reward</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 sm:space-x-6 p-6 bg-slate-700/30 rounded-2xl border border-teal-500/30">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-lg">II</span>
                </div>
                <div>
                  <p className="text-teal-300 font-semibold text-base sm:text-lg mb-2">Secondary Network Level</p>
                  <p className="text-slate-200 text-base sm:text-lg">Earn 3% from secondary network investments</p>
                  <p className="text-slate-400 text-sm mt-1">Extended network growth compensation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 sm:space-x-6 p-6 bg-slate-700/30 rounded-2xl border border-teal-500/30">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-lg">III</span>
                </div>
                <div>
                  <p className="text-teal-300 font-semibold text-base sm:text-lg mb-2">Tertiary Network Level</p>
                  <p className="text-slate-200 text-base sm:text-lg">Earn 2% from tertiary network investments</p>
                  <p className="text-slate-400 text-sm mt-1">Long-term network value recognition</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed">
            This structured approach ensures sustainable growth while rewarding our partners for expanding access to sophisticated AI-driven investment solutions. All commissions are processed through our secure, transparent payment system.
          </p>
        </div>
      </div>

      {/* Portfolio Recovery Services */}
      <div className="bg-gradient-to-br from-slate-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl p-8 sm:p-10 border border-slate-700/50 shadow-2xl shadow-slate-900/30">
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-600/40 border border-emerald-500/30">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">Portfolio Recovery Services</h3>
          <p className="text-emerald-300 text-lg sm:text-xl">Powered by SmartVest Premier Recovery Engine</p>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/50 shadow-lg mb-8">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/7A3LiBdMD-8?controls=1&modestbranding=1&rel=0"
            title="SmartVest AI Portfolio Recovery Process"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
          <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed">
            SmartVest AI recognizes the challenges investors face with underperforming or inaccessible investments. Our Portfolio Recovery Services leverage advanced AI algorithms and institutional-grade recovery protocols to systematically rehabilitate compromised investment positions.
          </p>

          <div className="mb-8 sm:mb-10">
            <div className="flex items-center space-x-4 mb-6 sm:mb-8">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
              <h4 className="text-2xl sm:text-3xl font-bold text-white">Recovery Protocol Framework</h4>
            </div>
            <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
              Our systematic approach employs institutional-grade methodologies for portfolio rehabilitation through structured monthly recovery distributions:
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className="p-6 sm:p-8 bg-slate-700/30 rounded-2xl border border-emerald-500/30">
                <h5 className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-4">1. Portfolio Assessment & Documentation</h5>
                <p className="text-slate-200 text-base sm:text-lg">
                  Comprehensive evaluation of investment positions with full documentation requirements. Our AI systems analyze portfolio composition and establish recovery parameters through our Premier Recovery Engine.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-slate-700/30 rounded-2xl border border-emerald-500/30">
                <h5 className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-4">2. Premier Engine Integration</h5>
                <p className="text-slate-200 text-base sm:text-lg">
                  Portfolio positions are integrated into our SmartVest Premier Recovery Engine, utilizing blockchain technology for transparent tracking and automated distribution processing with real-time performance monitoring.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-slate-700/30 rounded-2xl border border-emerald-500/30">
                <h5 className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-4">3. Structured Recovery Distributions (8% Monthly)</h5>
                <p className="text-slate-200 text-base sm:text-lg">
                  Monthly distributions of 8% of assessed portfolio value through our Premier Recovery Engine. This conservative approach ensures sustainable recovery while maintaining portfolio integrity throughout the rehabilitation process.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-slate-700/30 rounded-2xl border border-emerald-500/30">
                <h5 className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-4">4. Institutional-Grade Monitoring</h5>
                <p className="text-slate-200 text-base sm:text-lg">
                  Continuous monitoring through our secure client portal with comprehensive reporting, performance analytics, and milestone tracking powered by our Premier Recovery Engine&apos;s advanced algorithms.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-slate-700/30 rounded-2xl border border-emerald-500/30">
                <h5 className="text-xl sm:text-2xl font-semibold text-emerald-300 mb-4">5. Complete Portfolio Rehabilitation</h5>
                <p className="text-slate-200 text-base sm:text-lg">
                  Our commitment extends until full portfolio value recovery is achieved. The Premier Recovery Engine maintains active rehabilitation protocols until 100% of assessed portfolio value has been systematically restored.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-600/50 pt-8 sm:pt-10 mb-8 sm:mb-10">
            <div className="flex items-center space-x-4 mb-6 sm:mb-8">
              <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400" />
              <h4 className="text-2xl sm:text-3xl font-bold text-white">Premier Recovery Engine Advantages</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-teal-500/30">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400 mx-auto mb-4" />
                <h5 className="text-lg sm:text-xl font-semibold text-teal-300 mb-3">Institutional Security</h5>
                <p className="text-slate-400 text-base">Bank-grade security protocols with encrypted transaction processing</p>
              </div>
              
              <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-teal-500/30">
                <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400 mx-auto mb-4" />
                <h5 className="text-lg sm:text-xl font-semibold text-teal-300 mb-3">AI-Optimized Recovery</h5>
                <p className="text-slate-400 text-base">Machine learning algorithms optimize recovery timelines and efficiency</p>
              </div>
              
              <div className="text-center p-6 bg-slate-700/30 rounded-2xl border border-teal-500/30">
                <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400 mx-auto mb-4" />
                <h5 className="text-lg sm:text-xl font-semibold text-teal-300 mb-3">Comprehensive Reporting</h5>
                <p className="text-slate-400 text-base">Real-time portfolio rehabilitation tracking and milestone reporting</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6">Initiate Portfolio Recovery</h4>
            <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
              If your investment portfolio requires professional rehabilitation services, SmartVest AI&apos;s Premier Recovery Engine provides institutional-grade solutions. Our systematic approach has successfully restored portfolio value for hundreds of clients through structured 8% monthly distributions until complete recovery achievement.
            </p>
            
            {/* Professional Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="text-base">Institutional Grade Recovery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span className="text-base">Systematic Value Restoration</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-base">Regulatory Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}