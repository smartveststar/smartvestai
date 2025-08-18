'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CryptoPaymentDetails from '@/components/CryptoPaymentDetails';
import { ArrowLeft, Check } from 'lucide-react';

export default function AddMoneyPage() {
  const { user } = useUser();
  const router = useRouter();
  const [userBalance, setUserBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [proof, setProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      const userRes = await fetch(`/api/user/balance?clerkId=${user.id}`);
      const userData = await userRes.json();
      setUserBalance(Number(userData.balance) || 0);
      const pendingRes = await fetch(`/api/user/pending-add-money?clerkId=${user.id}`);
      const pendingData = await pendingRes.json();
      setHasPendingRequest(pendingData.hasPending);
    };
    fetchUserData();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !amount || !proof) return;

    const addAmount = parseFloat(amount);
    if (addAmount <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('clerkId', user.id);
      formData.append('amount', amount);
      formData.append('proof', proof);

      const res = await fetch('/api/add-money', {
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
        setErrorMessage(data.error || 'Request failed');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
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
          Add Money to Wallet
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fund your account to start investing with our AI-powered trading bots
        </p>
      </div>

      {/* Status Messages */}
      {hasPendingRequest && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
            <span>⚠️ You already have a pending add money request. Please wait for admin approval.</span>
          </div>
        </div>
      )}
      {submitStatus === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
            <Check className="w-5 h-5" />
            <span>Add money request submitted successfully! Redirecting to dashboard...</span>
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
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Current Balance</div>
          <div className="text-lg font-mono text-green-800 dark:text-green-300">${Number(userBalance).toFixed(2)}</div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Enter Amount to Add *</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-gray-700 px-4 py-2 outline-none text-gray-900 dark:text-white text-sm"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
              disabled={hasPendingRequest}
            />
            <span className="bg-green-800 text-white px-3 flex items-center text-sm">USD</span>
          </div>
        </div>

        <CryptoPaymentDetails selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Upload Payment Proof *</label>
          <input
            type="file"
            onChange={(e) => setProof(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
            required
            disabled={hasPendingRequest}
          />
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Upload a screenshot or photo of your payment confirmation
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Important Notes</h3>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Make sure the payment proof clearly shows the transaction details</li>
            <li>• Admin approval is required before funds are added to your balance</li>
            <li>• Processing time: 1-24 hours</li>
            <li>• Contact support if you have any issues</li>
          </ul>
        </div>

        <div className="flex justify-between gap-4 mt-6">
        <button
            type="submit"
            disabled={isSubmitting || hasPendingRequest}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Check className="w-4 h-4" />
            {isSubmitting ? 'Processing...' : 'Submit Request'}
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