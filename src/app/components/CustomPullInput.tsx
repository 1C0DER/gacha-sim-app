'use client';

import { useState } from 'react';

interface Props {
  onCustomPull: (count: number) => void;
}

export default function CustomPullInput({ onCustomPull }: Props) {
  const [count, setCount] = useState('');

  const handlePull = () => {
    const value = parseInt(count, 10);
    if (isNaN(value) || value < 1 || value > 500) {
      alert('Please enter a number between 1 and 500.');
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
        max={500}
        className="border border-gray-300 rounded px-3 py-2 text-sm w-32"
      />
      <button
        onClick={handlePull}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded"
      >
        Pull
      </button>
    </div>
  );
}
