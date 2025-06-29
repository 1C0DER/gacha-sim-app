'use client';

import { useMemo, useRef, useState } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import type { Chart as ChartInstance } from 'chart.js';
import { GameKey } from '@/lib/gachaData';

ChartJS.register(
  ArcElement, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  PointElement, LineElement, Filler
);

type Rarity = '5-Star' | '4-Star' | '3-Star';
interface Pull {
  name: string;
  rarity: Rarity;
}

interface Props {
  history: Pull[];
  banner: any;
  gameKey: GameKey;
}

export default function StatsDashboard({ history, banner, gameKey }: Props) {
  const rarityRef = useRef<ChartJS<'pie'> | null>(null);
  const featuredRef = useRef<ChartJS<'bar'> | null>(null);
  const pityRef = useRef<ChartJS<'bar'> | null>(null);
  const spendRef = useRef<ChartJS<'line'> | null>(null);
  const timelineRef = useRef<ChartJS<'line'> | null>(null);
  const probRef = useRef<ChartJS<'line'> | null>(null);

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
    rarity: false,
    featured: false,
    pity: false,
    spend: false,
    timeline: false,
    prob: false,
  });

  const toggle = (key: string) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const downloadChart = (key: string) => {
    const chartMap = {
      rarity: rarityRef,
      featured: featuredRef,
      pity: pityRef,
      spend: spendRef,
      timeline: timelineRef,
      prob: probRef,
    } as Record<string, React.RefObject<ChartInstance>>;

    const chart = chartMap[key]?.current;
    if (chart) {
      const a = document.createElement('a');
      a.href = chart.toBase64Image();
      a.download = `${gameKey}_${key}_chart.png`;
      a.click();
    }
  };

  const pullsFiltered = useMemo(() => history.filter(p => p.rarity !== '3-Star'), [history]);
  const rarityCount = pullsFiltered.reduce((acc, p) => {
    acc[p.rarity] = (acc[p.rarity] || 0) + 1;
    return acc;
  }, {} as Record<Rarity, number>);

  const fiveStarsOnly = history
    .map((p, i) => ({ ...p, index: i }))
    .filter(p => p.rarity === '5-Star');

  const featuredList = banner.featured?.['5-Star'] || [];
  const featuredPulls = fiveStarsOnly.filter(p => featuredList.includes(p.name)).length;
  const offBannerPulls = fiveStarsOnly.length - featuredPulls;

  const pityGaps = useMemo(() => {
    const gaps: number[] = [];
    let last5 = -1;
    history.forEach((p, i) => {
      if (p.rarity === '5-Star') {
        if (last5 !== -1) gaps.push(i - last5);
        last5 = i;
      }
    });
    return gaps;
  }, [history]);

  const spendingData = useMemo(() => {
    let total = 0;
    return history.map((_, i) => {
      total += banner.costPerPullGBP;
      return { x: i + 1, y: +total.toFixed(2) };
    });
  }, [history, banner.costPerPullGBP]);

  const pullTimeline = useMemo(() => {
    return history.map((p, i) => ({
      x: i + 1,
      y: p.rarity === '5-Star' ? 3 : p.rarity === '4-Star' ? 2 : 1,
      label: p.name,
      rarity: p.rarity
    }));
  }, [history]);

  return (
    <div className="mt-6 w-full max-w-3xl mx-auto space-y-6">

      {/* Rarity */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Rarity Distribution (4★ & 5★)</h3>
          <div className="space-x-2">
            <button onClick={() => toggle('rarity')} className="text-sm text-blue-600">Toggle</button>
            <button onClick={() => downloadChart('rarity')} className="text-sm text-green-600">Export</button>
          </div>
        </div>
        {!collapsed.rarity && (
          <Pie
            ref={rarityRef}
            data={{
              labels: ['5★', '4★'],
              datasets: [{
                data: [rarityCount['5-Star'] || 0, rarityCount['4-Star'] || 0],
                backgroundColor: ['#facc15', '#a78bfa'],
              }]
            }}
          />
        )}
      </div>

      {/* Featured */}
      {featuredList.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Featured vs Off-Banner 5★ Pulls</h3>
            <div className="space-x-2">
              <button onClick={() => toggle('featured')} className="text-sm text-blue-600">Toggle</button>
              <button onClick={() => downloadChart('featured')} className="text-sm text-green-600">Export</button>
            </div>
          </div>
          {!collapsed.featured && (
            <Bar
              ref={featuredRef}
              data={{
                labels: ['Featured 5★', 'Off-Banner 5★'],
                datasets: [{
                  label: 'Count',
                  data: [featuredPulls, offBannerPulls],
                  backgroundColor: ['#34d399', '#f87171'],
                }]
              }}
              options={{
                responsive: true,
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
              }}
            />
          )}
        </div>
      )}

      {/* Pity Histogram */}
      {pityGaps.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Pity Histogram (Pulls Between 5★s)</h3>
            <div className="space-x-2">
              <button onClick={() => toggle('pity')} className="text-sm text-blue-600">Toggle</button>
              <button onClick={() => downloadChart('pity')} className="text-sm text-green-600">Export</button>
            </div>
          </div>
          {!collapsed.pity && (
            <Bar
              ref={pityRef}
              data={{
                labels: pityGaps.map((_, i) => `5★ #${i + 2}`),
                datasets: [{
                  label: 'Pulls Since Last 5★',
                  data: pityGaps,
                  backgroundColor: '#60a5fa',
                }]
              }}
              options={{
                responsive: true,
                scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } } }
              }}
            />
          )}
        </div>
      )}

      {/* Spending Line */}
      {spendingData.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Cumulative Spending Over Time</h3>
            <div className="space-x-2">
              <button onClick={() => toggle('spend')} className="text-sm text-blue-600">Toggle</button>
              <button onClick={() => downloadChart('spend')} className="text-sm text-green-600">Export</button>
            </div>
          </div>
          {!collapsed.spend && (
            <Line
              ref={spendRef}
              data={{
                labels: spendingData.map(p => p.x),
                datasets: [{
                  label: '£ Spent',
                  data: spendingData.map(p => p.y),
                  borderColor: '#f97316',
                  backgroundColor: 'rgba(252, 211, 77, 0.3)',
                  fill: true,
                  tension: 0.3,
                }]
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (val: number | string) => `£${Number(val).toFixed(0)}`
                    }
                  }
                }
              }}
            />
          )}
        </div>
      )}

      {/* Pull Timeline */}
      {pullTimeline.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Pull Timeline by Rarity</h3>
            <div className="space-x-2">
              <button onClick={() => toggle('timeline')} className="text-sm text-blue-600">Toggle</button>
              <button onClick={() => downloadChart('timeline')} className="text-sm text-green-600">Export</button>
            </div>
          </div>
          {!collapsed.timeline && (
            <Line
              ref={timelineRef}
              data={{
                labels: pullTimeline.map(p => p.x),
                datasets: [{
                  label: 'Rarity (3★=1, 4★=2, 5★=3)',
                  data: pullTimeline.map(p => p.y),
                  pointRadius: 4,
                  pointHoverRadius: 6,
                  pointBackgroundColor: pullTimeline.map(p =>
                    p.y === 3 ? '#facc15' : p.y === 2 ? '#a78bfa' : '#e5e7eb'
                  ),
                  pointBorderColor: '#111',
                  borderColor: '#6b7280',
                  backgroundColor: '#cbd5e166',
                  fill: false,
                  tension: 0.2,
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (ctx) => {
                        const index = ctx.dataIndex;
                        const point = pullTimeline[index];
                        return `${point.rarity}: ${point.label}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    ticks: {
                      stepSize: 1,
                      callback: (tickValue: string | number) => {
                        const v = Number(tickValue);
                        return ['?', '3★', '4★', '5★'][v] || '';
                      }
                    },
                    min: 0,
                    max: 4
                  }
                }
              }}
            />
          )}
        </div>
      )}

      {/* Probability Curve */}
      {banner.softPity?.enabled && (
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Cumulative 5★ Probability Curve</h3>
            <div className="space-x-2">
              <button onClick={() => toggle('prob')} className="text-sm text-blue-600">Toggle</button>
              <button onClick={() => downloadChart('prob')} className="text-sm text-green-600">Export</button>
            </div>
          </div>
          {!collapsed.prob && (
            <Line
              ref={probRef}
              data={{
                labels: Array.from({ length: banner.pity['5-Star'] }, (_, i) => i + 1),
                datasets: [{
                  label: 'Chance of 5★ at this pull',
                  data: Array.from({ length: banner.pity['5-Star'] }, (_, i) => {
                    const pity = i + 1;
                    const base = banner.rates['5-Star'];
                    if (pity < banner.softPity.start) return base * 100;
                    const slope = (banner.softPity.maxRate - base) / (banner.pity['5-Star'] - banner.softPity.start);
                    const rate = Math.min(base + slope * (pity - (banner.softPity.start - 1)), banner.softPity.maxRate);
                    return rate * 100;
                  }),
                  borderColor: '#22d3ee',
                  backgroundColor: 'rgba(34, 211, 238, 0.2)',
                  fill: true,
                  tension: 0.3,
                }]
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (val) => val + '%'
                    },
                    title: {
                      display: true,
                      text: 'Chance of 5★',
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Pull Number (since last 5★)',
                    }
                  }
                }
              }}
            />
          )}
        </div>
      )}

    </div>
  );
}
