'use client';

import InfoModal from './InfoModal';
import GlossaryModal from './GlossaryModal';

interface Props {
  gameKey: string;
  gameName: string;
  bannerName: string;
  bannerType: string;
  rates: Record<string, number>;
  pity: Record<string, number>;
  softPity: { enabled: boolean; start: number; maxRate: number };
}

export default function HeaderSection({
  gameKey,
  gameName,
  bannerName,
  bannerType,
  rates,
  pity,
  softPity
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md text-center p-5 border border-gray-200">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {gameName} — {bannerName}
      </h1>
      <div className="flex justify-center gap-3 mt-2">
        <InfoModal
          bannerType={bannerType}
          rates={rates}
          pity={pity}
          softPity={softPity}
          gameKey={gameKey}
        />
        <GlossaryModal />
      </div>
    </div>
  );
}
