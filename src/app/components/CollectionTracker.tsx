'use client';

import { useState } from 'react';
import { CollectionEntry } from '@/lib/useCollectionTracker';

interface Props {
  collection: CollectionEntry[];
}

const rarityOrder: ('5-Star' | '4-Star' | '3-Star')[] = ['5-Star', '4-Star', '3-Star'];

export default function CollectionTracker({ collection }: Props) {
  const [filter, setFilter] = useState<'All' | '5-Star' | '4-Star' | '3-Star'>('All');

  const filtered = collection.filter(item =>
    filter === 'All' ? true : item.rarity === filter
  );

  const grouped = rarityOrder.reduce((acc, rarity) => {
    acc[rarity] = filtered.filter(item => item.rarity === rarity);
    return acc;
  }, {} as Record<'5-Star' | '4-Star' | '3-Star', CollectionEntry[]>);

  const borderClass = (rarity: string) =>
    rarity === '5-Star'
      ? 'border-yellow-400 font-bold text-yellow-700'
      : rarity === '4-Star'
      ? 'border-purple-400 text-purple-700'
      : 'border-gray-300 text-gray-600';

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">📚 Collection Tracker</h2>
        <div className="space-x-2 text-sm">
          {['All', '5-Star', '4-Star', '3-Star'].map(r => (
            <button
              key={r}
              className={`px-2 py-1 rounded ${
                filter === r
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter(r as typeof filter)}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {rarityOrder.map(rarity => {
        const items = grouped[rarity];
        if (items.length === 0) return null;

        return (
          <div key={rarity} className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-1">
              {rarity} ({items.length})
            </h3>
            <div className="flex flex-wrap gap-2 pl-3 border-l border-gray-200">
              {items.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className={`px-2 py-1 rounded border ${borderClass(item.rarity)}`}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
