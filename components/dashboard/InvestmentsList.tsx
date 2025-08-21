// components/dashboard/InvestmentsList.tsx
import { Clock, TrendingUp, ArrowUpRight, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Investment = {
  id: number;
  amount: number;
  bot: string;
  createdAt: string;
  botDays: number;
  botReturnPercentage: number;
};

type InvestmentsListProps = {
  investments: Investment[];
};

type InvestmentProgress = {
  progress: number;
  daysRemaining: number;
  dailyReturn: number;
};

export default function InvestmentsList({ investments }: InvestmentsListProps) {
  const [investmentProgress, setInvestmentProgress] = useState<Record<number, InvestmentProgress>>({});

  useEffect(() => {
    if (investments.length === 0) return;

    const calculateProgress = () => {
      const progressData: Record<number, InvestmentProgress> = {};

      investments.forEach((investment) => {
        // Parse the created_at date (format: "2025-03-04 14:38:23")
        const startDate = new Date(investment.createdAt.replace(' ', 'T'));
        const now = new Date();
        
        // Calculate days passed
        const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Calculate progress percentage
        const progressPercentage = Math.min((daysPassed / investment.botDays) * 100, 100);
        
        // Calculate days remaining
        const remaining = Math.max(investment.botDays - daysPassed, 0);
        
        // Calculate daily return (total return / total days * investment amount)
        const dailyReturnAmount = (investment.botReturnPercentage / 100 / investment.botDays) * investment.amount;
        
        progressData[investment.id] = {
          progress: Math.round(progressPercentage),
          daysRemaining: remaining,
          dailyReturn: dailyReturnAmount,
        };
      });

      setInvestmentProgress(progressData);
    };

    // Calculate immediately
    calculateProgress();
    
    // Update every minute to keep it real-time
    const interval = setInterval(calculateProgress, 60000);
    
    return () => clearInterval(interval);
  }, [investments]);

  if (investments.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-2">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">
              No Active Investments
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-8 max-w-md mx-auto">
              Start your investment journey today and begin earning consistent daily returns with our automated trading bots
            </p>
            <Link href="/dashboard/invest">
              <button className="flex items-center justify-center gap-3 px-8 py-3 text-white bg-green-800 hover:bg-green-900 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mx-auto">
                <DollarSign className="w-4 h-4" />
                Start Investing
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
              Active Investments
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor your investment performance and daily returns
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
            <div className="w-2 h-2 bg-green-800 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800 dark:text-green-300">
              {investments.length} Active
            </span>
          </div>
        </div>
      </div>

      {/* Investments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {investments.map((investment) => {
          const progress = investmentProgress[investment.id];
          const totalReturn = (investment.botReturnPercentage / 100) * investment.amount;
          const earnedSoFar = (progress?.progress || 0) / 100 * totalReturn;
          
          return (
            <div key={investment.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
              
              {/* Investment Header */}
              <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {investment.bot}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    #{investment.id}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Started {new Date(investment.createdAt.replace(' ', 'T')).toLocaleDateString()}
                </p>
              </div>

              {/* Investment Details */}
              <div className="p-6">
                
                {/* Amount and Returns Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-light text-gray-900 dark:text-white font-mono mb-1">
                      {formatCurrency(investment.amount)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Invested
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-2xl font-light text-green-800 dark:text-green-300 font-mono mb-1">
                      +{formatCurrency(progress?.dailyReturn || 0)}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">
                      Daily Return
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Investment Progress
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {progress?.progress || 0}%
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-green-600 to-green-800 rounded-full h-3 transition-all duration-500 ease-out shadow-sm"
                      style={{ width: `${progress?.progress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {progress?.daysRemaining || 0} days remaining
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {formatCurrency(earnedSoFar)} earned
                    </span>
                  </div>
                </div>

                {/* Expected Return Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Expected Total Return
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                      {formatCurrency(totalReturn)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Investment Button */}
      <div className="mt-6">
        <Link href="/dashboard/invest">
          <button className="w-full flex items-center justify-center gap-3 px-6 py-4 text-white bg-green-600 dark:bg-green-600 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-2xl font-medium ">
            <TrendingUp className="w-5 h-5" />
            Start New Investment
          </button>
        </Link>
      </div>
    </div>
  );
}