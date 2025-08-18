'use client';

import { Bot, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Bot {
  id: number;
  name: string;
  description?: string;
  investment_range?: string;
  capital_back?: string;
  return_type?: string;
  number_of_periods?: string;
  profit_withdraw?: string;
  holiday_note?: string;
  is_active?: boolean;
  days?: number;
  return_percentage?: number;
}

export default function BotListSection() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBots() {
      try {
        const response = await fetch('/api/bots');
        if (!response.ok) {
          throw new Error('Failed to fetch bots');
        }
        const data = await response.json();
        setBots(data);
        setLoading(false);
      } catch (err) {
        setError(`${err} Error fetching bot data`);
        setLoading(false);
      }
    }
    fetchBots();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Container */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <Bot className="text-cyan-600 dark:text-cyan-300" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Investment Bots
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {bots.length} active trading bots available
                </p>
              </div>
            </div>

            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="flex items-center justify-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
            >
              {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
        </div>

        {/* Collapsible Bot Grid */}
        {expanded && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {bots.map((bot, index) => (
                <div
                  key={bot.id}
                  className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Bot Card Header */}
                  <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            index === 0
                              ? 'bg-green-500'
                              : index === 1
                              ? 'bg-blue-500'
                              : 'bg-purple-500'
                          } animate-pulse`}
                        ></div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {bot.name}
                          </h4>
                          <div
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              index === 0
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                                : index === 1
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            }`}
                          >
                            {bot.description || `${bot.days} Days ${bot.return_percentage}%`}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          bot.is_active
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {bot.is_active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>

                  {/* Bot Details */}
                  <div className="p-5 space-y-4">
                    {/* Investment Range */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Investment Range
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white font-mono">
                        {bot.investment_range || 'N/A'}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="space-y-1">
                        <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                          Capital Back
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {bot.capital_back || 'N/A'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                          Periods
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {bot.number_of_periods || 'N/A'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                          Return Type
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {bot.return_type || 'N/A'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                          Withdraw
                        </span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {bot.profit_withdraw || 'N/A'}
                        </p>
                      </div>
                      {bot.days && (
                        <div className="space-y-1">
                          <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                            Duration
                          </span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {bot.days} Days
                          </p>
                        </div>
                      )}
                      {bot.return_percentage && (
                        <div className="space-y-1">
                          <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                            Return %
                          </span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {bot.return_percentage}%
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Holiday Note */}
                    {bot.holiday_note && (
                      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
                        <p className="text-xs text-yellow-800 dark:text-yellow-300 flex items-center gap-1">
                          <span className="w-1 h-1 bg-yellow-600 rounded-full"></span>
                          {bot.holiday_note}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Footer */}
                  <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                   <Link href='dashboard/invest'>
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        index === 0
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : index === 1
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      } transform hover:scale-105 active:scale-95`}
                    >
                      Invest
                    </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              All bots are currently active and ready for investment
            </span>
            <span className="text-gray-500 text-xs dark:text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}