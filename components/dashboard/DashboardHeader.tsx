'use client'

import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function DashboardHeader({ onRefresh, }: { onRefresh: () => void; }) {
  //eslint-disable-next-line
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="flex justify-left items-left p-2">
      <button
        onClick={onRefresh}
        title="Refresh"
        className="hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        <RotateCcw size={24} className={`text-gray-600 dark:text-gray-400 ${refreshing ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
}
