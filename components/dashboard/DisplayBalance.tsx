'use client';

import { Eye, EyeOff, ArrowUpDown, ArrowRightLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';

export default function DisplayBalance({
  totalBalance: initialTotalBalance,
  profitBalance: initialProfitBalance,
}: {
  totalBalance: number;
  profitBalance: number;
}) {
  const { user } = useUser();
  const [showBalance, setShowBalance] = useState(true);
  const [showProfit, setShowProfit] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferStatus, setTransferStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [transferMessage, setTransferMessage] = useState('');
  const [totalBalance, setTotalBalance] = useState(initialTotalBalance);
  const [profitBalance, setProfitBalance] = useState(initialProfitBalance);

  const balanceToDisplay = showProfit ? profitBalance : totalBalance;

  const handleTransferProfit = async () => {
    if (!user?.id || profitBalance <= 0) return;

    setIsTransferring(true);
    setTransferStatus('idle');

    try {
      const response = await fetch('/api/user/transfer-profit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clerkId: user.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setTransferStatus('success');
        setTransferMessage(`Successfully transferred ${formatCurrency(data.transferredAmount)} to main balance!`);
        
        setTotalBalance(data.newMainBalance);
        setProfitBalance(data.newProfitBalance);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } else {
        setTransferStatus('error');
        setTransferMessage(data.error || 'Transfer failed');
      }
    } catch (err) {
      console.error('Transfer error:', err);
      setTransferStatus('error');
      setTransferMessage('Something went wrong');
    } finally {
      setIsTransferring(false);
      
      setTimeout(() => {
        setTransferStatus('idle');
        setTransferMessage('');
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2">
      
      {/* Status Notification */}
      {transferStatus !== 'idle' && (
        <div className={`p-4 rounded-xl border-l-4 shadow-lg ${
          transferStatus === 'success' 
            ? 'bg-green-50 dark:bg-green-900/10 border-l-green-800 text-green-800 dark:text-green-300' 
            : 'bg-red-50 dark:bg-red-900/10 border-l-red-800 text-red-800 dark:text-red-300'
        }`}>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{transferMessage}</span>
          </div>
        </div>
      )}

      {/* Top Section - Header with Security Badge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Header Card */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
                Account Overview
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  #{user?.id?.slice(-8) || '••••••••'}
                </span>
                •
                <span>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </p>
            </div>
            
            {/* Balance Type Toggle */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl shadow-inner">
              <button
                onClick={() => setShowProfit(false)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  !showProfit
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md ring-1 ring-gray-200 dark:ring-gray-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                Primary
              </button>
              <button
                onClick={() => setShowProfit(true)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  showProfit
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md ring-1 ring-gray-200 dark:ring-gray-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                Profit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Balance Section */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        
        {/* Primary Balance Display */}
        <div className="xl:col-span-3 bg-gradient-to-r from-green-400 via-blue-400 to-green-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden w-full max-w-md mx-auto p-6 h-[240px] flex flex-col justify-between relative">
          {/* Card Background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 opacity-80"></div>
          
          {/* Card Header with Logo/Status */}
          <div className="relative flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-green-800 rounded-full animate-pulse"></div>
              {showProfit ? 'Profit Balance' : 'Main Balance'}
            </h2>
            <span className="text-sm text-green-800 dark:text-green-300 font-semibold px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/30">
              USD
            </span>
          </div>

          {/* Card Number (Balance) */}
          <div className="relative text-4xl text-gray-900 font-normal dark:text-white tracking-widest">
            {showBalance ? formatCurrency(balanceToDisplay) : '•••• •••• ••••'}
          </div>

          {/* Card Details (Name, Expiry, etc.) */}
          <div className="relative flex justify-between text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 uppercase text-xs">User Balance</p>
              <p className="text-gray-900 dark:text-white font-medium">Investment Account</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 uppercase text-xs">Last Updated</p>
              <p className="text-gray-900 dark:text-white font-medium">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Card Actions */}
          <div className="relative flex flex-wrap gap-2">
            <button
              onClick={() => setShowBalance(prev => !prev)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg font-medium transition-all duration-200 hover:shadow-md text-sm"
            >
              {showBalance ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show
                </>
              )}
            </button>

            <button
              onClick={() => setShowProfit(prev => !prev)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-lg font-medium transition-all duration-200 hover:shadow-md text-sm"
            >
              <ArrowUpDown className="w-4 h-4" />
              {showProfit ? 'Primary' : 'Profit'}
            </button>

            {showProfit && profitBalance > 0 && (
              <button
                onClick={handleTransferProfit}
                disabled={isTransferring}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-800 hover:bg-green-900 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
              >
                <ArrowRightLeft className={`w-4 h-4 ${isTransferring ? 'animate-pulse' : ''}`} />
                {isTransferring ? 'Processing...' : 'Transfer'}
              </button>
            )}
          </div>
      </div>

        {/* Side Panel - Balance Summary */}
        <div className="xl:col-span-2 space-y-6">

          {/* Combined Total Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Portfolio Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Combined Total
                </span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white font-mono">
                  {showBalance ? formatCurrency(totalBalance + profitBalance) : '••••••••'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-semibold text-green-800 dark:text-green-300">
                    {showBalance ? formatCurrency(totalBalance) : '••••••'}
                  </div>
                  <div className="text-green-600 dark:text-green-400 text-xs">Primary</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="font-semibold text-blue-800 dark:text-blue-300">
                    {showBalance ? formatCurrency(profitBalance) : '••••••'}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 text-xs">Profit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}