'use client';

import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

interface CryptoCurrency {
  id: number;
  name: string;
  wallet_address: string;
  qr_code_image: string | null;
}

interface Props {
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
}

export default function CryptoPaymentDetails({ selectedCoin, setSelectedCoin }: Props) {
  const [copied, setCopied] = useState(false);
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch('/api/crypto-currencies');
        if (!response.ok) {
          throw new Error('Failed to fetch cryptocurrencies');
        }
        const data = await response.json();
        setCryptos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const handleCopy = () => {
    const selectedCrypto = cryptos.find(crypto => crypto.name === selectedCoin);
    if (selectedCrypto) {
      navigator.clipboard.writeText(selectedCrypto.wallet_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const selectedCrypto = cryptos.find(crypto => crypto.name === selectedCoin);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <p className="text-gray-900 dark:text-gray-300 text-sm">Loading cryptocurrencies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <p className="text-red-800 dark:text-red-300 text-sm">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 space-y-6">
      <div>
        <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
          Select Crypto *
        </label>
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm"
        >
          <option value="">-- Select --</option>
          {cryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.name}>
              {crypto.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCoin && selectedCrypto && (
        <>
          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Wallet Address
            </label>
            <div className="flex items-center gap-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
              <code className="flex-1 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-white break-all">
                {selectedCrypto.wallet_address}
              </code>
              <button
                onClick={handleCopy}
                className="bg-green-800 hover:bg-green-900 text-white px-3 py-2 transition-all duration-300"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <p className="text-green-800 dark:text-green-300 text-sm mt-1">Address copied!</p>
            )}
          </div>

          {selectedCrypto.qr_code_image && (
            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
                Scan QR Code
              </label>
              <div className="flex justify-center">
                <img
                  src={selectedCrypto.qr_code_image}
                  alt={`${selectedCrypto.name} QR Code`}
                  width={200}
                  height={200}
                  className="border border-gray-200 dark:border-gray-600 rounded-xl"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Payment Instructions
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              After transferring the crypto, upload a screenshot or photo of your proof of payment
            </p>
          </div>
        </>
      )}
    </div>
  );
}