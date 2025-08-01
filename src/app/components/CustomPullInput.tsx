'use client';

import { useState } from 'react';
import { getTheme } from '@/lib/themeConfig';

interface Props {
  onCustomPull: (count: number) => void;
  gameKey?: string;
}

export default function CustomPullInput({ onCustomPull, gameKey = 'Default' }: Props) {
  const [count, setCount] = useState('');
  const theme = getTheme(gameKey);

  const handlePull = () => {
    const value = parseInt(count, 10);
    if (isNaN(value) || value < 1 || value > 10000) {
      alert('Please enter a number between 1 and 10000.');
      return;
    }
    onCustomPull(value);
    setCount('');
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="Custom pulls"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        min={1}
        max={10000}
        className={`border border-gray-300 rounded px-3 py-2 text-sm w-32 bg-white/70 backdrop-blur-sm ${theme.headingText} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.borderGold}`}
      />
      <button
        onClick={handlePull}
        className={`${theme.buttonActive} text-sm px-4 py-2 rounded shadow-md hover:shadow-lg transition-transform hover:scale-105`}
      >
        Pull
      </button>
    </div>
  );
}
