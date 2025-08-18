'use client';

import { Bot, Plus, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function QuickActionButtons() {
  const actions = [
    { 
      href: '/dashboard/add-money', 
      icon: Plus, 
      label: 'Add money',
      description: 'Fund your account',
      color: 'green'
    },
    { 
      href: '/dashboard/invest', 
      icon: Bot, 
      label: 'Invest Now',
      description: 'Start trading bots',
      color: 'blue'
    },
    { 
      href: '/dashboard/withdraw', 
      icon: Wallet, 
      label: 'Withdraw',
      description: 'Cash out funds',
      color: 'purple'
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          hover: 'group-hover:bg-green-100 dark:group-hover:bg-green-900/30',
          icon: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800/30'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          hover: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30',
          icon: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800/30'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          hover: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30',
          icon: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-800/30'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          hover: 'group-hover:bg-gray-100 dark:group-hover:bg-gray-700',
          icon: 'text-gray-600 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-700'
        };
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Quick Actions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Manage your account with these essential links
        </p>
      </div>

      {/* Actions Horizontal Scroll */}
      <div className="flex flex-row gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
        {actions.map(({ href, icon: Icon, label, description, color }) => {
          const colors = getColorClasses(color);
          
          return (
            <Link 
              key={href} 
              href={href} 
              className="group min-w-[280px] flex-shrink-0 snap-center"
            >
              <div className={`
                relative bg-white dark:bg-gray-800 border ${colors.border} 
                rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 
                transform hover:scale-105 active:scale-95 p-8 h-full
              `}>
                
                {/* Icon Section */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`
                    w-20 h-20 ${colors.bg} ${colors.hover} 
                    rounded-full flex items-center justify-center 
                    transition-all duration-300 border-2 ${colors.border}
                  `}>
                    <Icon size={32} className={`${colors.icon} transition-all duration-300`} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {label}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                </div>

                {/* Action Indicator */}
                <div className="mt-6 flex items-center justify-center">
                  <div className={`
                    px-6 py-3 ${colors.bg} ${colors.hover} 
                    rounded-full text-base font-semibold ${colors.icon} 
                    transition-all duration-300 border ${colors.border}
                  `}>
                    Get Started
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className={`
                  absolute inset-0 ${colors.bg} rounded-3xl opacity-0 
                  group-hover:opacity-5 transition-opacity duration-300
                `}></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}