'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

export default function WithdrawMoneyPage() {
  const { user } = useUser();
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [profitBalance, setProfitBalance] = useState(0);
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [amount, setAmount] = useState('');
  const [balanceType, setBalanceType] = useState<'balance' | 'profit_balance'>('balance');
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const withdrawalAmount = parseFloat(amount) || 0;
  const charges = withdrawalAmount * 0.005;
  const youWillReceive = withdrawalAmount - charges;
  const selectedBalance = balanceType === 'balance' ? balance : profitBalance;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      try {
        const userRes = await fetch(`/api/user/balance?clerkId=${user.id}`);
        const userData = await userRes.json();
        setBalance(Number(userData.balance) || 0);
        setProfitBalance(Number(userData.profit_balance) || 0);
        
        const kycRes = await fetch(`/api/user/kyc-status?clerkId=${user.id}`);
        const kycData = await kycRes.json();
        setIsKycVerified(kycData.isVerified);

        const pendingRes = await fetch(`/api/user/pending-withdrawals?clerkId=${user.id}`);
        const pendingData = await pendingRes.json();
        setHasPendingRequest(pendingData.hasPending);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !amount || !walletAddress || !network) return;

    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount <= 0) {
      setErrorMessage('Please enter a valid amount');
      return;
    }

    if (withdrawAmount > selectedBalance) {
      setErrorMessage(`Insufficient funds. Available: $${selectedBalance.toFixed(2)}`);
      return;
    }

    if (!isKycVerified) {
      setErrorMessage('KYC verification required to withdraw funds');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const requestData = {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        amount: withdrawAmount.toString(),
        balanceType: balanceType,
        walletAddress: walletAddress,
        network: network
      };

      const res = await fetch('/api/withdraw-money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
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
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
          Withdraw Money from Wallet
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Withdraw funds from your main or profit balance
        </p>
      </div>

      {/* Status Messages */}
      {!isKycVerified && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-6 mb-2">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
            <span>❌ KYC verification required to withdraw funds. Please complete your KYC verification first.</span>
          </div>
        </div>
      )}
      {hasPendingRequest && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
            <span>⚠️ You already have a pending withdrawal request. Please wait for admin approval.</span>
          </div>
        </div>
      )}
      {submitStatus === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
            <Check className="w-5 h-5" />
            <span>Withdrawal request submitted successfully! Redirecting to dashboard...</span>
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
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Main Balance</div>
            <div className="text-lg font-mono text-green-800 dark:text-green-300">${Number(balance).toFixed(2)}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Profit Balance</div>
            <div className="text-lg font-mono text-blue-800 dark:text-blue-300">${Number(profitBalance).toFixed(2)}</div>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Withdraw From *</label>
          <select
            value={balanceType}
            onChange={(e) => setBalanceType(e.target.value as 'balance' | 'profit_balance')}
            className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
            disabled={hasPendingRequest || !isKycVerified}
          >
            <option value="balance">Main Balance (${Number(balance).toFixed(2)})</option>
            <option value="profit_balance">Profit Balance (${Number(profitBalance).toFixed(2)})</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Enter Amount to Withdraw *</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-gray-700 px-4 py-2 outline-none text-gray-900 dark:text-white text-sm"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              max={selectedBalance}
              required
              disabled={hasPendingRequest || !isKycVerified}
            />
            <span className="bg-green-800 text-white px-3 flex items-center text-sm">USD</span>
          </div>
          {selectedBalance > 0 && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Available: ${selectedBalance.toFixed(2)}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Crypto Wallet Address *</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
            placeholder="Enter your crypto wallet address"
            required
            disabled={hasPendingRequest || !isKycVerified}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Network *</label>
          <input
            type="text"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
            placeholder="e.g., Bitcoin, Ethereum, BSC, Polygon"
            required
            disabled={hasPendingRequest || !isKycVerified}
          />
        </div>

        {withdrawalAmount > 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Withdrawal Summary</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Withdrawal Amount:</span>
                <span className="text-gray-900 dark:text-white">${withdrawalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Charges (0.5%):</span>
                <span className="text-red-800 dark:text-red-300">-${charges.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-1 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-600 dark:text-gray-400">You&apos;ll Receive:</span>
                  <span className="text-green-800 dark:text-green-300">${youWillReceive.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Important Notes</h3>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• KYC verification is required to withdraw funds</li>
            <li>• A 0.5% charge applies to all withdrawals</li>
            <li>• Double-check your wallet address and network before submitting</li>
            <li>• Admin approval is required before funds are processed</li>
            <li>• Processing time: 1-24 hours</li>
            <li>• Contact support if you have any issues</li>
          </ul>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="submit"
            disabled={isSubmitting || hasPendingRequest || !isKycVerified || withdrawalAmount <= 0 || withdrawalAmount > selectedBalance}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Check className="w-4 h-4" />
            {isSubmitting ? 'Processing...' : 'Submit Withdrawal'}
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