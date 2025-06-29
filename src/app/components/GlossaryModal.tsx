'use client';

import { Dialog } from '@headlessui/react';
import { Fragment, useState } from 'react';

const glossary: { term: string; definition: string }[] = [
  {
    term: 'Pity',
    definition:
      'The guaranteed number of pulls after which a high-rarity item (e.g., 5★) is awarded. For example, 90 pulls in Genshin guarantees a 5★.',
  },
  {
    term: 'Soft Pity',
    definition:
      'A mechanic where the chance of getting a 5★ increases gradually after a certain number of pulls (e.g., 75+).',
  },
  {
    term: 'Hard Pity',
    definition:
      'The fixed number of pulls after which a rare item is guaranteed. This is the upper limit (e.g., 90 pulls for 5★).',
  },
  {
    term: '50/50',
    definition:
      'A system where you have a 50% chance to get the featured 5★ item. If you lose, the next 5★ is guaranteed to be featured.',
  },
  {
    term: 'Rate-Up',
    definition:
      'A temporary increase in the probability of pulling specific characters or weapons during a banner.',
  },
  {
    term: 'Designated Item',
    definition:
      'A system (e.g., weapon path or Chronicle) where you select a specific 5★. If not received after one or more attempts, it becomes guaranteed.',
  },
  {
    term: 'Banner',
    definition:
      'A limited-time pool of items or characters with specific drop rates and featured units.',
  },
  {
    term: 'Pull',
    definition:
      'A single attempt at summoning or wishing for a reward in the gacha system.',
  },
  {
    term: 'Currency',
    definition:
      'The resource used to perform pulls (e.g., Primogems, Crystals), often linked to real money value.',
  },
];

export default function GlossaryModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-blue-600 underline underline-offset-2 ml-3"
      >
        📚 Glossary
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} as={Fragment}>
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded max-w-md w-full z-50 max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-bold mb-3">📚 Gacha Glossary</Dialog.Title>
            <ul className="space-y-3 text-sm">
              {glossary.map((item, i) => (
                <li key={i}>
                  <strong>{item.term}:</strong> {item.definition}
                </li>
              ))}
            </ul>
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
