// components/dashboard/RecentEarningsList.tsx
import { TrendingUp, ArrowUpRight, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

//eslint-disable-next-line
export default function RecentEarningsList({ earnings }: { earnings: any[] }) {
  if (earnings.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-2">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">
              No Recent Earnings
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-8 max-w-md mx-auto">
              Your earnings and transactions will appear here once you start investing
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
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight flex items-center gap-3">
              <div className="w-3 h-3 bg-green-800 rounded-full animate-pulse"></div>
              Recent Earnings
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your latest transactions and investment returns
            </p>
          </div>
          <Link href="/dashboard/transactions">
            <button className="flex items-center text-sm justify-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl font-medium transition-all duration-200 hover:shadow-md">
              <ArrowUpRight className="w-4 h-4" />
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* Earnings List */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        
        {/* List Header */}
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="grid grid-cols-3 gap-4 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            <span>Transaction</span>
            <span className="text-center">Date</span>
            <span className="text-right">Amount</span>
          </div>
        </div>

        {/* Earnings Items */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {earnings.map((earning, index) => (
            <div
              key={index}
              className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
            >
              <div className="grid grid-cols-3 gap-4 items-center">
                
                {/* Transaction Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <TrendingUp className="w-4 h-4 text-green-800 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium text-sm">
                      {earning.type}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Investment Return
                    </p>
                  </div>
                </div>

                {/* Date Info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      {earning.date}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <div className="text-lg font-light text-green-800 dark:text-green-300 font-mono">
                    +{formatCurrency(earning.amount)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Showing {earnings.length} recent transaction{earnings.length !== 1 ? 's' : ''}
            </p>
            <Link href="/dashboard/transactions">
              <button className="text-xs text-green-800 dark:text-green-300 hover:text-green-900 dark:hover:text-green-200 font-medium transition-colors duration-200">
                View complete history →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}