'use client';

import { Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface Props {
  bannerType: string;
  rates: Record<string, number>;
  pity: Record<string, number>;
  softPity?: { enabled: boolean; start: number; maxRate: number };
}

export default function InfoModal({ bannerType, rates, pity, softPity }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getBannerExplanation = () => {
    const lines = [];

    lines.push(`🎯 Base 5★ rate: ${(rates['5-Star'] * 100).toFixed(2)}%`);
    lines.push(`📦 Pity for 5★: ${pity['5-Star']} pulls`);
    if (softPity?.enabled) {
      lines.push(`📈 Soft pity starts at: ${softPity.start} pulls`);
      lines.push(`🔼 Highest 5★ chance during soft pity: ${(softPity.maxRate * 100).toFixed(1)}%`);
    }
    lines.push(`⭐️ 50/50 system applies: ${bannerType !== 'standard'}`);
    if (bannerType === 'chronicle') {
      lines.push(`🎯 Designated item guarantee after 1 failed pull`);
    } else if (bannerType === 'weapon') {
      lines.push(`🎯 Designated item guaranteed after 2 failed pulls (Path System)`);
    }

    return lines.map((line, i) => <p key={i} className="mb-1">{line}</p>);
  };

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
            {getBannerExplanation()}
            <button onClick={() => setIsOpen(false)} className="mt-4 px-4 py-1 bg-blue-500 text-white rounded">
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
