'use client';

import { useState, Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import type { Pull } from '@/lib/useCollectionTracker';

interface Props {
  history: Pull[];
  title?: string;
  limit?: number;
}

export default function PullHistory({ history, title = 'Pull History', limit }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const pulls = limit ? history.slice(0, limit) : history;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-blue-600 underline underline-offset-2"
      >
        📜 View Pull History
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} as={Fragment}>
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded max-w-md w-full z-50">
            <Dialog.Title className="text-lg font-bold mb-3 text-center">
              {title}
            </Dialog.Title>

            <ul className="max-h-64 overflow-y-auto text-sm border border-gray-200 rounded p-2 space-y-1 bg-gray-50">
              {pulls.length === 0 ? (
                <li className="text-gray-500 italic">No pulls yet.</li>
              ) : (
                pulls.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 border-b last:border-0 pb-1"
                  >
                    {p.rarity === '5-Star' && (
                      <span className="text-yellow-500 font-bold">⭐️⭐️⭐️⭐️⭐️</span>
                    )}
                    {p.rarity === '4-Star' && (
                      <span className="text-purple-500 font-bold">⭐️⭐️⭐️⭐️</span>
                    )}
                    {p.rarity === '3-Star' && (
                      <span className="text-gray-400">⭐️⭐️⭐️</span>
                    )}
                    <span className="text-gray-800">{p.name || '⚠️ Unknown'}</span>
                  </li>
                ))
              )}
            </ul>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-1 bg-blue-500 text-white rounded w-full"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
