// ⬇️ ...imports and setup stay the same

'use client';

import { useState } from 'react';
import { gachaRates, GameKey } from '@/lib/gachaData';
import { useExchangeRate } from '@/lib/useExchangeRate';

type Rarity = '5-Star' | '4-Star' | '3-Star';
interface Pull { name: string; rarity: Rarity }

const currencySymbols: Record<string, string> = {
  GBP: '£', USD: '$', EUR: '€', JPY: '¥', NGN: '₦', AUD: 'A$', CAD: 'C$', INR: '₹',
};
const supportedCurrencies = Object.keys(currencySymbols);

interface Props {
  gameKey: GameKey;
}

export default function SimPage({ gameKey }: Props) {
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

  const rate = useExchangeRate(currency);
  const moneyDisp = (spentGBP * rate).toFixed(2);
  const symbol = currencySymbols[currency] || '£';

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
      : banner.featured['5-Star'];
  };

    const handlePull = (rar: Rarity, pity: number, lost5050: boolean, localPath: number): [string, boolean, number] => {
      const featured = getFeatured5Stars();
      const fallback = banner.pool['5-Star'];
      const bannerType = banner.type;

      const isGuaranteed = designatedItem && (
        (bannerType === 'chronicle' && localPath >= 1) ||
        (bannerType === 'weapon' && localPath >= 2)
      );

      if (isGuaranteed) return [designatedItem!, false, 0];

      if (bannerType === 'standard') {
        return [rand(fallback), false, localPath];
      }

      const featHit = lost5050 || Math.random() < 0.5;
      const pool = featHit && featured.length ? featured :
                  fallback.length ? fallback : ['⚠️ Unknown 5★'];
      const chosen = rand(pool);

      let newPath = localPath;
      if (designatedItem && chosen !== designatedItem && (bannerType === 'chronicle' || bannerType === 'weapon')) {
        newPath += 1;
      } else if (chosen === designatedItem) {
        newPath = 0;
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

    let pool: readonly string[];

    if (rar === '5-Star') {
      const [chosen, lost, newPath] = handlePull(rar, pity5, lost5050_5, pathPoints);
      setLost5(lost);
      setPathPoints(newPath);
      pool = [chosen];
      setPity5(0); setPity4(0);
    } else if (rar === '4-Star') {
      const feat = banner.featured['4-Star'];
      const featHit = banner.type === 'standard' ? false : (lost5050_4 || Math.random() < 0.5);
      const poolToUse = featHit && feat.length ? feat : banner.pool['4-Star'];
      pool = poolToUse.length ? poolToUse : banner.pool['4-Star'];
      if (banner.type !== 'standard') setLost4(!featHit);
      setPity5(pity5 + 1); setPity4(0);
    } else {
      pool = banner.pool['3-Star'];
      setPity5(pity5 + 1); setPity4(pity4 + 1);
    }

    return { name: rand(pool), rarity: rar };
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

      let pool: readonly string[];

      if (rar === '5-Star') {
        const [chosen, lost, newPath] = handlePull(rar, localPity5, localLost5050_5, localPath);
        localLost5050_5 = lost; localPath = newPath;
        pool = [chosen]; localPity5 = 0; localPity4 = 0;
      } else if (rar === '4-Star') {
        const feat = banner.featured['4-Star'];
        const featHit = banner.type === 'standard' ? false : (localLost5050_4 || Math.random() < 0.5);
        const poolToUse = featHit && feat.length ? feat : banner.pool['4-Star'];
        pool = poolToUse.length ? poolToUse : banner.pool['4-Star'];
        if (banner.type !== 'standard') localLost5050_4 = !featHit;
        localPity5 += 1; localPity4 = 0;
      } else {
        pool = banner.pool['3-Star'];
        localPity5 += 1; localPity4 += 1;
      }

      pulls.push({ name: rand(pool), rarity: rar });
    }

    setHistory(h => [...pulls, ...h]);
    setSpent(s => +(s + banner.costPerPullGBP * 10).toFixed(2));
    setPity5(localPity5); setPity4(localPity4);
    setLost5(localLost5050_5); setLost4(localLost5050_4);
    setPathPoints(localPath);
  };

  const changeBanner = (bk: keyof typeof game.banners) => {
    setSelectedBanner(bk);
    setHistory([]); setPity5(0); setPity4(0);
    setLost5(false); setLost4(false);
    setSpent(0); setDesignatedItem(null); setPathPoints(0);
    setSelectedCharacters([]); setSelectedWeapons([]);
  };

  const allCharacters = banner.pool['5-Star']?.characters ?? [];
  const allWeapons = banner.pool['5-Star']?.weapons ?? [];

  const handleAdd = (item: string, type: 'char' | 'weapon') => {
    if (type === 'char' && !selectedCharacters.includes(item) && selectedCharacters.length < 7)
      setSelectedCharacters([...selectedCharacters, item]);
    else if (type === 'weapon' && !selectedWeapons.includes(item) && selectedWeapons.length < 7)
      setSelectedWeapons([...selectedWeapons, item]);
  };

  const handleRemove = (item: string, type: 'char' | 'weapon') => {
    if (type === 'char') setSelectedCharacters(selectedCharacters.filter(c => c !== item));
    else setSelectedWeapons(selectedWeapons.filter(w => w !== item));
    if (designatedItem === item) setDesignatedItem(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{game.name} — {banner.name}</h1>

      <select value={selectedBanner} onChange={e => changeBanner(e.target.value as keyof typeof game.banners)} className="p-2 border rounded mb-3">
        {bannerKeys.map(k => (
          <option key={k} value={k}>{game.banners[k].name}</option>
        ))}
      </select>

      <select value={currency} onChange={e => setCurrency(e.target.value)} className="p-2 border rounded mb-4">
        {supportedCurrencies.map(c => (
          <option key={c} value={c}>{currencySymbols[c]} {c}</option>
        ))}
      </select>

      {(banner.type === 'chronicle' || banner.type === 'weapon') && (
        <div className="mb-4 w-full max-w-md">
          {banner.type === 'chronicle' && (
            <>
              <div className="flex mb-2">
                <select value={charToAdd} onChange={e => setCharToAdd(e.target.value)} className="flex-1 border rounded p-2 mr-2">
                  <option value="">Select Character</option>
                  {allCharacters.filter((c: string) => !selectedCharacters.includes(c)).map((char: string) => (
                    <option key={char} value={char}>{char}</option>
                  ))}
                </select>
                <button onClick={() => handleAdd(charToAdd, 'char')} disabled={!charToAdd} className="bg-green-600 text-white px-3 rounded">Add</button>
              </div>
              <div className="mb-3 text-sm">
                {selectedCharacters.map((char) => (
                  <div key={char} className="flex justify-between border p-1 rounded mb-1 bg-white">
                    {char} <button onClick={() => handleRemove(char, 'char')} className="text-red-500">×</button>
                  </div>
                ))}
              </div>

              <div className="flex mb-2">
                <select value={weaponToAdd} onChange={e => setWeaponToAdd(e.target.value)} className="flex-1 border rounded p-2 mr-2">
                  <option value="">Select Weapon</option>
                  {allWeapons.filter((w: string) => !selectedWeapons.includes(w)).map((weap: string) => (
                    <option key={weap} value={weap}>{weap}</option>
                  ))}
                </select>
                <button onClick={() => handleAdd(weaponToAdd, 'weapon')} disabled={!weaponToAdd} className="bg-green-600 text-white px-3 rounded">Add</button>
              </div>
              <div className="mb-3 text-sm">
                {selectedWeapons.map((weap) => (
                  <div key={weap} className="flex justify-between border p-1 rounded mb-1 bg-white">
                    {weap} <button onClick={() => handleRemove(weap, 'weapon')} className="text-red-500">×</button>
                  </div>
                ))}
              </div>
            </>
          )}

          <label className="block mb-1">Designated 5★ Item:</label>
          <select className="w-full border p-2 rounded" value={designatedItem || ''} onChange={e => setDesignatedItem(e.target.value)}>
            <option value="">None</option>
            {(banner.type === 'chronicle'
              ? [...selectedCharacters, ...selectedWeapons]
              : banner.featured['5-Star']
            ).map((item: string) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <p className="text-sm mt-1 text-gray-600">Path Points: {pathPoints}</p>
        </div>
      )}

      <div className="flex gap-4 mb-5">
        <button onClick={onePull} className="px-5 py-2 bg-purple-600 text-white rounded">One Pull</button>
        <button onClick={tenPull} className="px-5 py-2 bg-purple-800 text-white rounded">Ten Pulls</button>
      </div>

      <p className="mb-2">Money spent: <strong>{symbol}{moneyDisp}</strong></p>
      <p className="mb-4">Pity 5★ {pity5}/{banner.pity['5-Star']} &nbsp;|&nbsp; Pity 4★ {pity4}/{banner.pity['4-Star']}</p>

      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Pull History</h2>
        <ul className="bg-white p-4 rounded shadow max-h-[300px] overflow-y-auto space-y-1">
          {history.map((p, i) => (
            <li key={i} className="border-b last:border-0 pb-1">
              {p.rarity === '5-Star' && '⭐️⭐️⭐️⭐️⭐️ '}
              {p.rarity === '4-Star' && '⭐️⭐️⭐️⭐️ '}
              {p.rarity === '3-Star' && '⭐️⭐️⭐️ '}
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
