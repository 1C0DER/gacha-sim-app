'use client';

import { Dialog } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import { useCollectionTracker } from '@/lib/useCollectionTracker';
import type { GameKey } from '@/lib/gachaData';

interface Pull {
  name: string;
  rarity: '5-Star' | '4-Star' | '3-Star';
}

interface Session {
  game: string;
  banner: string;
  bannerType: string;
  stats: {
    currency: string;
    moneyDisp: string;
    totalPulls: number;
    totalFiveStars: number;
    avgPullsPerFive: string;
    expectedFiveStars: number;
    luckMessage: string;
  };
  pulls: Pull[];
  createdAt: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}

export default function SessionModal({ isOpen, onClose, session }: Props) {
  if (!session) return null;

  // Convert game name back into GameKey for proper collection prefix
  const gameKey: GameKey =
    session.game === 'Genshin Impact'
      ? 'Genshin'
      : session.game === 'Honkai: Star Rail'
      ? 'Honkai'
      : 'Custom';

  const collection = useCollectionTracker(session.pulls, gameKey);

  const grouped = useMemo(() => ({
    '5-Star': collection.filter(p => p.rarity === '5-Star'),
    '4-Star': collection.filter(p => p.rarity === '4-Star'),
  }), [collection]);

  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-xl font-bold mb-4">📘 Session Details</Dialog.Title>

          {/* Summary */}
          <div className="text-sm space-y-1 mb-4">
            <p className="text-gray-600 text-sm mb-2">
              {new Date(session.createdAt).toLocaleString()} • <strong>{session.game}</strong> • {session.banner}
            </p>
            <p>🎲 <strong>Total Pulls:</strong> {session.stats.totalPulls}</p>
            <p>⭐ <strong>Total 5★:</strong> {session.stats.totalFiveStars}</p>
            <p>📈 <strong>Avg Pulls per 5★:</strong> {session.stats.avgPullsPerFive}</p>
            <p>🔮 <strong>Expected 5★s:</strong> {session.stats.expectedFiveStars}</p>
            <p>{session.stats.luckMessage}</p>
            <p>💸 <strong>Spent:</strong> {session.stats.currency} {session.stats.moneyDisp}</p>
          </div>

          <hr className="my-4" />

          {/* Collection Summary */}
          <h3 className="font-semibold text-sm mb-2">📚 Collection Summary</h3>
          <p className="text-gray-500 text-sm mb-4 italic">Only showing 5★ and 4★ pulls</p>

          {(['5-Star', '4-Star'] as const).map(rarity => (
            grouped[rarity].length > 0 && (
              <div key={rarity} className="mb-3">
                <h4 className={`font-semibold ${rarity === '5-Star' ? 'text-yellow-600' : 'text-purple-600'}`}>
                  {rarity === '5-Star' ? '⭐️ 5-Star' : '✨ 4-Star'}
                </h4>
                <ul className="list-disc ml-5 text-sm mt-1">
                  {grouped[rarity].map((item, i) => (
                    <li key={i}>{item.label}</li>
                  ))}
                </ul>
              </div>
            )
          ))}

          <hr className="my-4" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded w-full transition"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
