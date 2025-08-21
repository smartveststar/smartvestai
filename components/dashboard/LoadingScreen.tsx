'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [textIndex, setTextIndex] = useState(0);
  const [showNetworkWarning, setShowNetworkWarning] = useState(false);

  const loadingTexts = [
    "Loading your Dashbaord...",
    "Just a moment...",
    "Loading Bots...",
    "Please wait...",
  ];

  useEffect(() => {
    // Text rotation timer - changes text every 1.5 seconds
    const textTimer = setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 1500);

    // Network warning timer - shows after 5 seconds
    const networkTimer = setTimeout(() => {
      setShowNetworkWarning(true);
    }, 7000);

    // Cleanup timers
    return () => {
      clearInterval(textTimer);
      clearTimeout(networkTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-6"></div>
        
        {/* Loading Text */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 transition-opacity duration-300">
          {loadingTexts[textIndex]}
        </p>
        
        {/* Network Warning */}
        {showNetworkWarning && (
          <div className="mt-6 p-4 rounded-lg max-w-sm mx-auto">
            <p className="text-red-400 dark:text-red-400 text-xs font-medium">
              Slow Network, please check your connection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}