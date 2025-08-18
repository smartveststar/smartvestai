'use client';

import React, { useEffect, useState } from 'react';
import { Bot, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface InvestmentBot {
  id: number;
  name: string;
  description: string;
  investment_range: string;
  capital_back: string;
  return_type: string;
  number_of_periods: string;
  profit_withdraw: string;
  holiday_note: string;
  is_active: boolean;
}

export default function InvestBotsPage() {
  const [bots, setBots] = useState<InvestmentBot[]>([]);
  const [selectedBot, setSelectedBot] = useState<InvestmentBot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bots')
      .then(res => res.json())
      .then(data => {
        setBots(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 text-gray-900 dark:text-white text-lg">
          Loading bots...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2 p-2">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
              Investment Bots
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI-powered trading bots for automated returns
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
          <div className="w-2 h-2 bg-green-800 rounded-full animate-pulse"></div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-800 dark:text-green-300">
            <span>{bots.length}</span>
            <span>Available</span>
          </div>
        </div>

        </div>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Bot Header */}
            <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50"
              onClick={() => setSelectedBot(selectedBot?.id === bot.id ? null : bot)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {bot.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    #{bot.id}
                  </span>
                  {selectedBot?.id === bot.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bot.description}
              </p>
            </div>

            {/* Bot Details */}
            {selectedBot?.id === bot.id && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Investment</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{bot.investment_range}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Capital Back</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{bot.capital_back}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Return Type</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{bot.return_type}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Number of Periods</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{bot.number_of_periods}</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Profit Withdraw</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{bot.profit_withdraw}</div>
                </div>
                <p className="text-yellow-400 text-sm italic text-center">{bot.holiday_note}</p>
                <Link
                  href={`/dashboard/invest/${bot.id}`}
                  className="flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <Bot className="w-4 h-4" />
                  Invest Now
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}