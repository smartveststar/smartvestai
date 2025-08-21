'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getUserData } from '@/lib/actions/GetUserData';
import { getUserTransactions } from '@/lib/actions/getUserTransactions';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

export default function TransactionsPage() {
  const { user: clerkUser } = useUser();
  //eslint-disable-next-line
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!clerkUser?.id) return;

      try {
        const userData = await getUserData(clerkUser.id);
        if (!userData) return;

        const txns = await getUserTransactions(userData.id);
        setTransactions(txns);
      } catch (err) {
        console.error('Error loading transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [clerkUser?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 text-gray-900 dark:text-white text-lg">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          Loading transactions...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2 p-2">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
          All Transactions
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          View your transaction history
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-600 dark:text-gray-400">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm text-center">Your transaction history will appear here once you start making transactions.</p>
          </div>
        ) : (
          transactions.map((txn, index) => {
            const isPositive = ['interest','deposit','transfer', 'referral_bonus', 'profit_completion', 'capital_return', 'manual_deposit'].includes(txn.type);
            const typeLabel =
              txn.type === 'interest' ? 'Daily Return' :
              txn.type === 'referral_bonus' ? 'Referral Bonus' :
              txn.type === 'profit_completion' ? 'Profit Completion' :
              txn.type === 'capital_return' ? 'Capital Return' :
              txn.type === 'manual_deposit' ? 'Deposit' :
              txn.type === 'withdraw' || txn.type === 'withdrawal' ? 'Withdrawal' :
              txn.type === 'investment' ? 'Investment' :
              txn.type === 'refund' ? 'Refund' :
              txn.type === 'deposit' ? 'Deposit' :
              txn.type === 'transfer' ? 'Profit transfer' :
              'Transaction';

            return (
              <div
                key={index}
                className={`flex items-center p-4 ${
                  index < transactions.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <div className={`w-10 h-10 ${isPositive ? 'bg-green-800 dark:bg-green-300' : 'bg-red-800 dark:bg-red-300'} rounded-full flex items-center justify-center mr-4`}>
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5 text-white dark:text-gray-900" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-white dark:text-gray-900" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{typeLabel}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(txn.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className={`font-semibold text-lg ${isPositive ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                  {isPositive ? '+' : '-'}{formatCurrency(txn.amount)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}