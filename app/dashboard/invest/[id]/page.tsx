'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CryptoPaymentDetails from '@/components/CryptoPaymentDetails';
import { ArrowLeft, Check } from 'lucide-react';

export default function BotInvestPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = useUser();
  const router = useRouter();
  //eslint-disable-next-line
  const [bot, setBot] = useState<any>(null);
  const [userBalance, setUserBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [proof, setProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = React.use(params);

  useEffect(() => {
    const fetchBot = async () => {
      const res = await fetch(`/api/bots/${id}`);
      const data = await res.json();
      setBot(data);
    };
    fetchBot();
  }, [id]);

  useEffect(() => {
    const getBalance = async () => {
      if (!user?.id) return;
      const userRes = await fetch(`/api/user/balance?clerkId=${user.id}`);
      const userData = await userRes.json();
      setUserBalance(userData.balance || 0);
    };
    getBalance();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !amount || !selectedWallet) return;

    if (selectedWallet === 'gateway' && !proof) {
      setErrorMessage('Upload payment proof for Direct Gateway');
      return;
    }

    const investAmount = parseFloat(amount);
    if (selectedWallet === 'main' && investAmount > userBalance) {
      setErrorMessage('Insufficient balance in main wallet');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('clerkId', user.id);
      formData.append('schemaId', bot.id.toString());
      formData.append('wallet', selectedWallet);
      formData.append('amount', amount);
      if (proof) formData.append('proof', proof);

      const res = await fetch('/api/investments', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Investment failed');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!bot || !user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 text-gray-900 dark:text-white text-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2 p-2">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
          Review and Confirm Investment
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Complete your investment details for {bot.name}
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
            <Check className="w-5 h-5" />
            <span>Investment submitted successfully! Redirecting to dashboard...</span>
          </div>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
            <span>❌ {errorMessage}</span>
          </div>
        </div>
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Bot Type</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{bot.name}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Investment Range</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{bot.investment_range}</div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Description</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{bot.description}</div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Enter Amount *</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-gray-700 px-4 py-2 outline-none text-gray-900 dark:text-white text-sm"
              required
            />
            <span className="bg-green-800 text-white px-3 flex items-center text-sm">USD</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Select Wallet *</label>
          <select
            className="bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl w-full border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="main">Main Wallet (Balance: ${userBalance})</option>
            <option value="gateway">Direct Gateway</option>
          </select>
        </div>

        {selectedWallet === 'gateway' && (
          <>
            <CryptoPaymentDetails selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Upload Payment Proof *</label>
              <input
                type="file"
                onChange={(e) => setProof(e.target.files?.[0] || null)}
                accept="image/*"
                className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
                required
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Capital Back</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{bot.capital_back}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Return Type</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{bot.return_type}</div>
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Check className="w-4 h-4" />
            {isSubmitting ? 'Processing...' : 'Invest Now'}
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl font-medium bg-white dark:bg-gray-800"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}