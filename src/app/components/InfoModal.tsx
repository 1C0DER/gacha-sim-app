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

  const getBannerExplanation = () => {
    const lines: string[] = [];

    const baseRate = (rates['5-Star'] * 100).toFixed(2);
    const pityCap = pity['5-Star'];
    const isGenshin = gameKey === 'Genshin';
    const isHonkai = gameKey === 'Honkai';

    lines.push(`🎯 Base 5★ rate: ${baseRate}%`);
    lines.push(`📦 Pity for 5★: ${pityCap} pulls`);

    if (softPity?.enabled) {
      lines.push(`📈 Soft pity starts at: ${softPity.start} pulls`);
      lines.push(`🔼 Max 5★ chance during soft pity: ${(softPity.maxRate * 100).toFixed(1)}%`);
    }

    // Banner-specific rules
    if (bannerType === 'standard') {
      lines.push(`⭐️ No promotional 5★ — full pool only`);
    } else if (bannerType === 'limited') {
      lines.push(`⭐️ 50% chance to get featured 5★. If you lose, the next is guaranteed.`);
    } else if (bannerType === 'weapon') {
      if (isGenshin) {
        lines.push(`⭐️ 50% chance to get featured weapon.`);
        lines.push(`🎯 Guaranteed after 2 fails (Epitomized Path).`);
        lines.push(`🛠 Requires selecting a designated item.`);
      } else if (isHonkai) {
        lines.push(`⭐️ 75% chance to get featured Light Cone.`);
        lines.push(`🎯 Guaranteed featured after 1 fail.`);
        lines.push(`🚫 No designated item selection system.`);
      }
    } else if (bannerType === 'chronicle') {
      lines.push(`⭐️ 50% chance to get featured item.`);
      lines.push(`🎯 Guaranteed designated item after 1 failed 5★.`);
    }

    return lines.map((line, i) => (
      <p key={i} className="mb-1">
        {line}
      </p>
    ));
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
