"use client"

import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Share2, Copy, Loader2, Receipt, CheckCircle, Plus } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { ReferralData} from '@/types/type';
import { formatCurrency } from '@/lib/utils';
import { formatDateTime } from '@/lib/utils';
import { copyToClipboard } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ReferralsScreen() {
  const { user } = useUser();
  const router = useRouter();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'referrals' | 'earnings'>('referrals');
  const [isGenerating, setIsGenerating] = useState(false);

  const getDefaultReferralData = (): ReferralData => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://trustchaininvestai.com';
    
    return {
      totalEarned: 0,
      totalReferrals: 0,
      referralCode: 'Loading...',
      referralLink: `${baseUrl}/sign-up?ref=loading`,
      recentReferrals: [],
      referralTransactions: [],
    };
  };

  const currentData = referralData || getDefaultReferralData();

  const fetchReferralStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/referral/stats`, {
        method: 'POST',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setReferralData(result.data);
      } else {
        setError('Failed to load referral data');
      }
    } catch (err) {
      setError('Failed to load referral data');
      console.error('Referral fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchReferralStats();
  }, [user]);

  const handleGenerateReferralCode = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/referral/generate', {
        method: 'POST',
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchReferralStats();
        alert('Referral code generated successfully!');
      } else {
        alert(result.error || 'Failed to generate referral code');
      }
    } catch (error) {
      console.error('Generate referral error:', error);
      alert('Failed to generate referral code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (currentData.referralLink.includes('loading') || currentData.referralLink.includes('NOCODE')) {
      alert('Referral link not ready yet');
      return;
    }
    const success = await copyToClipboard(currentData.referralLink);
    alert(success ? 'Referral link copied to clipboard' : 'Failed to copy referral link');
  };

  const handleCopyCode = async () => {
    if (currentData.referralCode === 'Loading...' || currentData.referralCode === 'No referral code found') {
      alert('Referral code not ready yet');
      return;
    }
    const success = await copyToClipboard(currentData.referralCode);
    alert(success ? 'Referral code copied to clipboard' : 'Failed to copy referral code');
  };

  const handleShare = async () => {
    if (currentData.referralCode === 'Loading...' || currentData.referralCode === 'No referral code found') {
      alert('Referral data not ready yet');
      return;
    }
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join AI Investment Platform',
          text: `Use my referral code: ${currentData.referralCode}`,
          url: currentData.referralLink,
        });
      } else {
        await copyToClipboard(`Use my referral code: ${currentData.referralCode} or ${currentData.referralLink}`);
        alert('Referral message copied to clipboard');
      }
    } catch {
      alert('Failed to share referral link');
    }
  };

  const handleViewAll = () => {
    router.push('/dashboard/all-screen');
  };

  const showGenerateButton = () => {
    return !isLoading && 
           (currentData.referralCode === 'No referral code found' || 
            currentData.referralCode === 'NOCODE' ||
            currentData.referralLink.includes('NOCODE'));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 text-gray-900 dark:text-white text-lg">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2 p-2">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
          Referrals
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Earn rewards by inviting friends to join the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center">
              <Loader2 className="animate-spin text-green-800 dark:text-green-300" size={20} />
            </div>
          )}
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-800 dark:text-green-300" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Total Earned</span>
          </div>
          <p className="text-2xl font-bold text-green-800 dark:text-green-300">{formatCurrency(currentData.totalEarned)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-center">
              <Loader2 className="animate-spin text-blue-800 dark:text-blue-300" size={20} />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-800 dark:text-blue-300" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Referrals</span>
          </div>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{currentData.totalReferrals}</p>
        </div>
      </div>

      {/* Generate Referral Code Button */}
      {showGenerateButton() && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Referral Code Yet</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Generate your unique referral code to start earning rewards.</p>
          <button
            onClick={handleGenerateReferralCode}
            disabled={isGenerating}
            className="flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mx-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Generate Referral Code
              </>
            )}
          </button>
        </div>
      )}

      {/* Referral Code & Link */}
      {!showGenerateButton() && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Referral Code</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    Loading...
                  </span>
                ) : (
                  currentData.referralCode
                )}
              </p>
              <button 
                onClick={handleCopyCode} 
                disabled={isLoading || currentData.referralCode === 'Loading...' || currentData.referralCode === 'No referral code found'}
                className="bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all duration-300"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Referral Link</p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate mr-2">
                {isLoading ? 'Loading referral link...' : currentData.referralLink}
              </p>
              <button 
                onClick={handleCopyLink} 
                disabled={isLoading || currentData.referralLink.includes('loading') || currentData.referralLink.includes('NOCODE')}
                className="bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all duration-300"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleShare}
            disabled={isLoading || currentData.referralCode === 'Loading...' || currentData.referralCode === 'No referral code found'}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            Share Referral Link
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-1">
        <div className="flex">
          <button
            onClick={() => setActiveTab('referrals')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'referrals'
                ? 'bg-green-800 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Recent Referrals
            {!isLoading && currentData.totalReferrals > 5 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewAll();
                }}
                className="ml-2 text-xs bg-green-800 hover:bg-green-900 text-white px-2 py-1 rounded transition-all duration-300"
              >
                View All ({currentData.totalReferrals})
              </button>
            )}
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'earnings'
                ? 'bg-green-800 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Receipt className="w-4 h-4 inline mr-2" />
            Earnings History
            {!isLoading && currentData.referralTransactions.length >= 10 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewAll();
                }}
                className="ml-2 text-xs bg-green-800 hover:bg-green-900 text-white px-2 py-1 rounded transition-all duration-300"
              >
                View All
              </button>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center p-8 text-gray-900 dark:text-white">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span>Loading {activeTab === 'referrals' ? 'referral history' : 'earnings history'}...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-8 text-red-800 dark:text-red-300">
            <span>Failed to load data</span>
          </div>
        ) : activeTab === 'referrals' ? (
          currentData.recentReferrals.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-gray-600 dark:text-gray-400">
              <Users className="w-8 h-8 mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No referrals yet</p>
              <p className="text-sm text-center">Share your referral link to start earning rewards!</p>
            </div>
          ) : (
            currentData.recentReferrals.map((referral, index) => (
              <div
                key={referral.id}
                className={`flex items-center p-4 ${
                  index < currentData.recentReferrals.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <div className="w-10 h-10 bg-blue-800 dark:bg-blue-300 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white dark:text-gray-900 font-bold">{referral.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{referral.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Joined {formatDateTime(referral.joinedAt)}</p>
                </div>
              </div>
            ))
          )
        ) : (
          currentData.referralTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-gray-600 dark:text-gray-400">
              <Receipt className="w-8 h-8 mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No earnings yet</p>
              <p className="text-sm text-center">Start referring friends to earn rewards!</p>
            </div>
          ) : (
            currentData.referralTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`flex items-center p-4 ${
                  index < currentData.referralTransactions.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <div className="w-10 h-10 bg-green-800 dark:bg-green-300 rounded-full flex items-center justify-center mr-4">
                  <DollarSign className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300">+{formatCurrency(transaction.amount)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.description}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{formatDateTime(transaction.createdAt)}</p>
                    </div>
                    <div className="flex items-center text-green-800 dark:text-green-300">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs capitalize">{transaction.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}