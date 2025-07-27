'use client';

import { Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface Props {
  bannerType: string;
  rates: Record<string, number>;
  pity: Record<string, number>;
  softPity?: { enabled: boolean; start: number; maxRate: number };
  gameKey: string;
}

export default function InfoModal({
  bannerType,
  rates,
  pity,
  softPity,
  gameKey,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getTerms = () => {
    switch (gameKey) {
      case 'Genshin':
        return { item: 'weapon', featured5: 'character', fourStar: 'character or weapon' };
      case 'Honkai':
        return { item: 'Light Cone', featured5: 'character', fourStar: 'character or Light Cone' };
      case 'ZZZ':
        return { item: 'W-Engine', featured5: 'character', fourStar: 'character or W-Engine' };
      default:
        return { item: 'item', featured5: 'item', fourStar: '4★ item' };
    }
  };

  const { item, featured5, fourStar } = getTerms();
  const baseRate = (rates['5-Star'] * 100).toFixed(2);
  const pityCap5 = pity['5-Star'];
  const pityCap4 = pity['4-Star'];

  const lines: string[] = [];

  lines.push(`🎯 Base 5★ rate: ${baseRate}%`);
  lines.push(`📦 Pity for 5★: ${pityCap5} pulls`);
  lines.push(`🎲 4★ pity: Guaranteed every ${pityCap4} pulls`);

  if (softPity?.enabled) {
    lines.push(`📈 Soft pity starts at: ${softPity.start} pulls`);
  }

  // Banner-specific logic
  if (bannerType === 'standard') {
    lines.push(`⭐️ No promotional 5★ — full pool only`);
  }

  if (bannerType === 'limited') {
    lines.push(`⭐️ 50% chance to get featured 5★ ${featured5}`);
    lines.push(`🎯 Guaranteed after 1 fail (50/50 system)`);
  }

  if (bannerType === 'weapon') {
    if (gameKey === 'Genshin') {
      lines.push(`⭐️ 50% chance to get featured ${item}`);
      lines.push(`🎯 Guaranteed after 2 fails (Epitomized Path)`);
      lines.push(`🛠 Requires selecting a designated ${item}`);
    } else if (gameKey === 'Honkai') {
      lines.push(`⭐️ 75% chance to get featured ${item}`);
      lines.push(`🎯 Guaranteed after 1 fail`);
      lines.push(`🚫 No designated ${item} selection system`);
    } else if (gameKey === 'ZZZ') {
      lines.push(`⭐️ 75% chance to get featured ${item}`);
      lines.push(`🎯 Guaranteed after 1 fail`);
    }
  }

  if (bannerType === 'chronicle') {
    lines.push(`⭐️ 50% chance to get featured item`);
    lines.push(`🎯 Guaranteed designated item after 1 failed 5★`);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-blue-600 underline underline-offset-2"
      >
        ℹ️ How this banner works
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} as={Fragment}>
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded max-w-md w-full z-50">
            <Dialog.Title className="text-lg font-bold mb-3">🎲 Banner Mechanics</Dialog.Title>
            {lines.map((line, i) => (
              <p key={i} className="mb-1">{line}</p>
            ))}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-1 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
