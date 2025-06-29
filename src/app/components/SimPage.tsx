'use client';

import { useState } from 'react';
import { gachaRates, GameKey } from '@/lib/gachaData';
import { useExchangeRate } from '@/lib/useExchangeRate';
import GlossaryModal from './GlossaryModal';
import StatsDashboard from './StatsDashboard';
import InfoModal from './InfoModal';

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
    if (luckDelta > 0.5) {
      luckMessage = '🎉 You’re luckier than expected!';
    } else if (luckDelta < -0.5) {
      luckMessage = '💔 You’re pulling below average luck.';
    } else {
      luckMessage = '📊 You’re right around statistical expectation.';
    }

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
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <h1 className="text-2xl font-bold">{game.name} — {banner.name}</h1>
        <div className="flex items-center">
          <InfoModal
            bannerType={banner.type}
            rates={banner.rates}
            pity={banner.pity}
            softPity={banner.softPity}
          />
          <GlossaryModal />
        </div>
      </div>

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

            <div className="flex gap-4 mb-3">
        <button onClick={() => {
          setHistory([]); setPity5(0); setPity4(0);
          setLost5(false); setLost4(false);
          setSpent(0); setPathPoints(0);
        }} className="px-4 py-1 bg-red-600 text-white rounded">Clear Session</button>

        <button
          onClick={() => {
            const data = {
              pulls: history,
              currency,
              spent: `${symbol}${moneyDisp}`,
              totalPulls,
              totalFiveStars,
              avgPullsPerFive,
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'gacha_session.json';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Export Session
        </button>
      </div>

            <div className="mb-4 text-sm bg-white p-4 rounded shadow w-full max-w-md">
        <p>Total Pulls: <strong>{totalPulls}</strong></p>
        <p>Total 5★ Pulled: <strong>{totalFiveStars}</strong></p>
        <p>Average Pulls per 5★: <strong>{avgPullsPerFive}</strong></p>
        <p>Last 5★ was <strong>{lastFiveStarAt}</strong> pulls ago</p>
          <hr className="my-3" />
        <p>Statistically Expected 5★s: <strong>{expectedFiveStars}</strong></p>
        <p>{luckMessage}</p>

        {spentGBP >= 200 ? (
        <p className="mt-2 text-red-700 font-bold">🚨 You've spent over £200 — that’s console money!</p>
      ) : spentGBP >= 100 ? (
        <p className="mt-2 text-red-600 font-bold">⚠️ You’ve simulated spending over £100.</p>
      ) : spentGBP >= 50 ? (
        <p className="mt-2 text-yellow-600 font-semibold">⚠️ You’ve spent over £50 — that’s a full-priced game.</p>
      ) : null}
      </div>

      <StatsDashboard history={history} banner={banner} gameKey={gameKey} />

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
