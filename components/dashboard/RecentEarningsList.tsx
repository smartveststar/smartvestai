'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, Clock, DollarSign, Filter } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

//eslint-disable-next-line
export default function RecentEarningsList({ earnings }: { earnings: any[] }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'earnings', label: 'Earnings Only' },
    { value: 'deposits', label: 'Deposits' },
    { value: 'withdrawals', label: 'Withdrawals' },
    { value: 'positive', label: 'Positive Only' },
  ];

  // Filter and categorize earnings
  const processedEarnings = earnings.map(earning => {
    // Debug: log the actual earning type
    console.log('Earning type:', earning.type, 'Full earning:', earning);
    
    // Since the type is already converted to display labels, we need to check against those
    const isPositive = [
      'Daily Return', 
      'Deposit', 
      'Profit Transfer', 
      'Referral', 
      'Profit Completion', 
      'Capital Return', 
      'Bonus'
    ].includes(earning.type);
    
    // The typeLabel is already set in the dashboard, so we just use the type
    const typeLabel = earning.type;

    return {
      ...earning,
      isPositive,
      typeLabel,
      category: earning.type
    };
  });

  // Apply filters
  const filteredEarnings = processedEarnings.filter(earning => {
    switch (selectedFilter) {
      case 'earnings':
        return ['Daily Return', 'Referral', 'Profit Completion', 'Profit Transfer', 'Bonus'].includes(earning.type);
      case 'deposits':
        return ['Deposit'].includes(earning.type);
      case 'withdrawals':
        return ['Withdrawal'].includes(earning.type);
      case 'positive':
        return earning.isPositive;
      default:
        return true; // 'all'
    }
  });

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
        <div className="flex items-center justify-between mb-4">
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
            <button className="flex flex-1 whitespace-nowrap items-center text-sm justify-center gap-3 px-4 bg-green-600 dark:bg-green-700 py-3 text-white dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl font-medium transition-all duration-200 hover:shadow-md">
              <ArrowUpRight className="w-4 h-4" />
              View All
            </button>
          </Link>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            Showing {filteredEarnings.length} of {earnings.length} transactions
          </span>
        </div>
      </div>

      {/* Earnings List */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        
        {filteredEarnings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-600 dark:text-gray-400">
            <Filter className="w-8 h-8 mb-4 text-gray-400" />
            <p className="text-lg font-medium">No transactions match your filter</p>
            <p className="text-sm text-center">Try selecting a different filter option.</p>
          </div>
        ) : (
          <>
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
              {filteredEarnings.map((earning, index) => (
                <div
                  key={index}
                  className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    
                    {/* Transaction Info */}
                    <div className="flex items-center gap-3">
                      <div className={'w-10 h-10'}>
                        {earning.isPositive ? (
                          <TrendingUp className="w-4 h-4 text-green-800 dark:text-green-300" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-800 dark:text-red-300" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium text-sm">
                          {earning.typeLabel}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {earning.isPositive ? 'Credit' : 'Debit'}
                        </p>
                      </div>
                    </div>

                        {/* Date Info */}
                    <div className="text-center">
                      <div className="flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs font-medium">
                            {new Date(earning.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(earning.date).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className={`text-sm font-light font-mono ${
                        earning.isPositive 
                          ? 'text-green-800 dark:text-green-300' 
                          : 'text-red-800 dark:text-red-300'
                      }`}>
                        {earning.isPositive ? '+' : '-'}{formatCurrency(earning.amount)}
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
                  Showing {filteredEarnings.length} filtered transaction{filteredEarnings.length !== 1 ? 's' : ''}
                </p>
                <Link href="/dashboard/transactions">
                  <button className="text-xs text-green-800 dark:text-green-300 hover:text-green-900 dark:hover:text-green-200 font-medium transition-colors duration-200">
                    View complete history →
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}