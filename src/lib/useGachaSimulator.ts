'use client';

import { useState } from 'react';
import { gachaRates, GameKey } from '@/lib/gachaData';
import { useExchangeRate } from '@/lib/useExchangeRate';
import { getOrCreateUserId } from './getOrCreateUserId';

type Rarity = '5-Star' | '4-Star' | '3-Star';
interface Pull { name: string; rarity: Rarity }

const currencySymbols: Record<string, string> = {
  GBP: '£', USD: '$', EUR: '€', JPY: '¥', NGN: '₦', AUD: 'A$', CAD: 'C$', INR: '₹',
};
const supportedCurrencies = Object.keys(currencySymbols);

export function useGachaSimulator(gameKey: GameKey) {
  const game = gachaRates[gameKey] as { name: string; banners: Record<string, any> };
  const bannerKeys = Object.keys(game.banners) as (keyof typeof game.banners)[];
  const [selectedBanner, setSelectedBanner] = useState<keyof typeof game.banners>(bannerKeys[0]);
  const banner = game.banners[selectedBanner];

  const [history, setHistory] = useState<Pull[]>([]);
  const [pity5, setPity5] = useState(0);
  const [pity4, setPity4] = useState(0);
  const [lost5050_5, setLost5] = useState(false);
  const [lost5050_4, setLost4] = useState(false);
  const [spentGBP, setSpent] = useState(0);
  const [currency, setCurrency] = useState('GBP');
  const [designatedItem, setDesignatedItem] = useState<string | null>(null);
  const [pathPoints, setPathPoints] = useState(0);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([]);
  const [charToAdd, setCharToAdd] = useState('');
  const [weaponToAdd, setWeaponToAdd] = useState('');

  const fiveStarHistory = history.filter(p => p.rarity === '5-Star');
  const totalPulls = history.length;
  const totalFiveStars = fiveStarHistory.length;
  const avgPullsPerFive = totalFiveStars ? (totalPulls / totalFiveStars).toFixed(1) : '-';
  const lastFiveStarIndex = history.findIndex(p => p.rarity === '5-Star');
  const lastFiveStarAt = lastFiveStarIndex !== -1 ? lastFiveStarIndex + 1 : '-';

  const rate = useExchangeRate(currency);
  const moneyDisp = (spentGBP * rate).toFixed(2);
  const symbol = currencySymbols[currency] || '£';

  const baseFiveRate = banner.rates['5-Star'];
  const expectedFiveStars = +(totalPulls * baseFiveRate).toFixed(2);
  const luckDelta = totalFiveStars - expectedFiveStars;
  let luckMessage = '';
  if (luckDelta > 0.5) luckMessage = '🎉 You’re luckier than expected!';
  else if (luckDelta < -0.5) luckMessage = '💔 You’re pulling below average luck.';
  else luckMessage = '📊 You’re right around statistical expectation.';

  const rand = (a: readonly string[]) => a[Math.floor(Math.random() * a.length)];

  const fiveRate = (p: number) => {
    const { enabled, start, maxRate } = banner.softPity;
    if (!enabled || p < start) return banner.rates['5-Star'];
    const slope = (maxRate - banner.rates['5-Star']) / (banner.pity['5-Star'] - start);
    return Math.min(banner.rates['5-Star'] + slope * (p - (start - 1)), maxRate);
  };

  const getFeatured5Stars = () => {
  return banner.type === 'chronicle'
    ? [...selectedCharacters, ...selectedWeapons]
    : banner.featured?.['5-Star'] || [];
};


  const handlePull = (
  rarity: Rarity,
  pity: number,
  lost5050: boolean,
  localPath: number
): [string, boolean, number] => {
  const featured = getFeatured5Stars();
  const fallback = banner.pool['5-Star'];
  const bannerType = banner.type;

  const isHonkaiWeapon = bannerType === 'weapon' && gameKey === 'Honkai';
  const isGenshinWeapon = bannerType === 'weapon' && gameKey === 'Genshin';
  const isZZZWeapon = bannerType === 'weapon' && gameKey === 'ZZZ';
  const isChronicle = bannerType === 'chronicle';

  const usingDesignated = isChronicle || isGenshinWeapon;

  const isGuaranteed = usingDesignated && designatedItem && (
    (isChronicle && localPath >= 1) ||
    (isGenshinWeapon && localPath >= 2)
  );
  if (isGuaranteed) return [designatedItem!, false, 0];

  const featHit = lost5050 || Math.random() < (
    isHonkaiWeapon || isZZZWeapon ? 0.75 : 0.5
  );

  let pool: readonly string[];

  if (isChronicle) {
    pool = featured.length ? featured : fallback;
  } else {
    pool = featHit && featured.length ? featured : fallback;
  }

  const chosen = rand(pool);
  let newPath = localPath;

  if (usingDesignated && designatedItem) {
    if (chosen !== designatedItem) {
      newPath += 1;
    } else {
      newPath = 0;
    }
  }

  return [chosen, !featHit, newPath];
};


  const pullOnce = (): Pull => {
    const g5 = pity5 + 1 >= banner.pity['5-Star'];
    const g4 = pity4 + 1 >= banner.pity['4-Star'];
    const r = Math.random();
    let rar: Rarity;

    if (g5) rar = '5-Star';
    else if (r < fiveRate(pity5)) rar = '5-Star';
    else if (g4) rar = '4-Star';
    else if (r < fiveRate(pity5) + banner.rates['4-Star']) rar = '4-Star';
    else rar = '3-Star';

    let chosen = '';
    if (rar === '5-Star') {
      const [result, lost, newPath] = handlePull(rar, pity5, lost5050_5, pathPoints);
      chosen = result;
      setLost5(lost);
      setPathPoints(newPath);
      setPity5(0);
      setPity4(0);
    } else if (rar === '4-Star') {
      const feat = banner.featured['4-Star'];
      const featHit = banner.type === 'standard' ? false : (lost5050_4 || Math.random() < 0.5);
      const poolToUse = featHit && feat.length ? feat : banner.pool['4-Star'];
      chosen = rand(poolToUse);
      if (banner.type !== 'standard') setLost4(!featHit);
      setPity5(pity5 + 1);
      setPity4(0);
    } else {
      chosen = rand(banner.pool['3-Star']);
      setPity5(pity5 + 1);
      setPity4(pity4 + 1);
    }

    return { name: chosen, rarity: rar };
  };

  const onePull = () => {
    const p = pullOnce();
    setHistory(h => [p, ...h]);
    setSpent(s => +(s + banner.costPerPullGBP).toFixed(2));
  };

  const tenPull = () => {
    const pulls: Pull[] = [];
    let localPity5 = pity5, localPity4 = pity4;
    let localLost5050_5 = lost5050_5, localLost5050_4 = lost5050_4;
    let localPath = pathPoints;

    for (let i = 0; i < 10; i++) {
      const g5 = localPity5 + 1 >= banner.pity['5-Star'];
      const g4 = localPity4 + 1 >= banner.pity['4-Star'];
      const r = Math.random();
      let rar: Rarity;

      if (g5) rar = '5-Star';
      else if (r < fiveRate(localPity5)) rar = '5-Star';
      else if (g4) rar = '4-Star';
      else if (r < fiveRate(localPity5) + banner.rates['4-Star']) rar = '4-Star';
      else rar = '3-Star';

      if (rar === '5-Star') {
        const [chosen, lost, newPath] = handlePull(rar, localPity5, localLost5050_5, localPath);
        localLost5050_5 = lost;
        localPath = newPath;
        localPity5 = 0;
        localPity4 = 0;
        pulls.push({ name: chosen, rarity: rar });
        continue;
      }

      let pool: readonly string[];

      if (rar === '4-Star') {
        const feat = banner.featured['4-Star'];
        const featHit = banner.type === 'standard' ? false : (localLost5050_4 || Math.random() < 0.5);
        pool = featHit && feat.length ? feat : banner.pool['4-Star'];
        if (banner.type !== 'standard') localLost5050_4 = !featHit;
        localPity5 += 1;
        localPity4 = 0;
      } else {
        pool = banner.pool['3-Star'];
        localPity5 += 1;
        localPity4 += 1;
      }

      pulls.push({ name: rand(pool), rarity: rar });
    }

    setHistory(h => [...pulls, ...h]);
    setSpent(s => +(s + banner.costPerPullGBP * 10).toFixed(2));
    setPity5(localPity5);
    setPity4(localPity4);
    setLost5(localLost5050_5);
    setLost4(localLost5050_4);
    setPathPoints(localPath);
  };

  const changeBanner = (bk: keyof typeof game.banners) => {
    setSelectedBanner(bk);
    setHistory([]); setPity5(0); setPity4(0);
    setLost5(false); setLost4(false);
    setSpent(0); setDesignatedItem(null); setPathPoints(0);
    setSelectedCharacters([]); setSelectedWeapons([]);
  };

  const handleExport = async () => {
  const session = {
    userId: getOrCreateUserId(),
    game: game.name,
    banner: banner.name,
    bannerType: banner.type,
    designatedItem,
    pulls: history,
    stats: {
      currency,
      moneyDisp,
      totalPulls,
      totalFiveStars,
      avgPullsPerFive,
      expectedFiveStars,
      luckMessage,
    },
    pathPoints,
    createdAt: new Date().toISOString(),
  };

  try {
    await fetch('/api/saveSession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });
    console.log('✅ Session saved to MongoDB');
  } catch (err) {
    console.error('❌ Failed to save session', err);
  }

  const blob = new Blob([JSON.stringify(session, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gacha_session.json';
  a.click();
  URL.revokeObjectURL(url);
};

  const allCharacters = banner.type === 'chronicle' ? banner.pool['5-Star-Meta'].characters : [];
  const allWeapons = banner.type === 'chronicle' ? banner.pool['5-Star-Meta'].weapons : [];

  const handleAdd = (item: string, type: 'char' | 'weapon') => {
    if (type === 'char' && !selectedCharacters.includes(item) && selectedCharacters.length < 7) {
      setSelectedCharacters([...selectedCharacters, item]);
    } else if (type === 'weapon' && !selectedWeapons.includes(item) && selectedWeapons.length < 7) {
      setSelectedWeapons([...selectedWeapons, item]);
    }
  };

  const handleRemove = (item: string, type: 'char' | 'weapon') => {
    if (type === 'char') {
      setSelectedCharacters(selectedCharacters.filter(c => c !== item));
    } else {
      setSelectedWeapons(selectedWeapons.filter(w => w !== item));
    }
    if (designatedItem === item) {
      setDesignatedItem(null);
    }
  };

  return {
    game, banner, bannerKeys, selectedBanner,
    history, currency, symbol, moneyDisp, pity5, pity4,
    totalPulls, totalFiveStars, avgPullsPerFive, lastFiveStarAt,
    expectedFiveStars, luckMessage, pathPoints, rate,
    charToAdd, setCharToAdd, weaponToAdd, setWeaponToAdd,
    designatedItem, setDesignatedItem,
    selectedCharacters, selectedWeapons,
    handleAdd, handleRemove,
    onOnePull: onePull,
    onTenPull: tenPull,
    onExport: handleExport,
    onChangeBanner: changeBanner,
    onChangeCurrency: setCurrency,
    supportedCurrencies, currencySymbols,
    allCharacters,
    allWeapons,
    getFeatured5Stars,
  };
}
