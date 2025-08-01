'use client';

import InfoModal from './InfoModal';
import GlossaryModal from './GlossaryModal';
import type { Pull } from '@/lib/useCollectionTracker';
import PullHistory from './PullHistory';
import { getTheme } from '@/lib/themeConfig';

interface Props {
  gameKey: string;
  gameName: string;
  bannerName: string;
  bannerType: string;
  rates: Record<string, number>;
  pity: Record<string, number>;
  softPity: { enabled: boolean; start: number; maxRate: number };
  history: Pull[];
}

export default function HeaderSection({
  gameKey,
  gameName,
  bannerName,
  bannerType,
  rates,
  pity,
  softPity,
  history,
}: Props) {
  const theme = getTheme(gameKey);

  return (
    <div className={`${theme.panelBg} ${theme.borderGold} rounded-2xl shadow-lg text-center p-5 border border-white/30`}>
      <h1 className={`text-3xl font-bold mb-2 ${theme.headingText}`}>
        {gameName} — {bannerName}
      </h1>
      <div className="flex justify-center gap-3 mt-2">
        <InfoModal
          bannerType={bannerType}
          rates={rates}
          pity={pity}
          softPity={softPity}
          gameKey={gameKey}/>
        <GlossaryModal />
        <PullHistory history={history} />
      </div>
    </div>
  );
}
