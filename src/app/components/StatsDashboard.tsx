'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
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

  const pityGaps: number[] = useMemo(() => {
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

      {/* Pie: Rarity */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-center mb-2">Rarity Distribution (4★ & 5★)</h3>
        <Pie
          data={{
            labels: ['5★', '4★'],
            datasets: [{
              data: [rarityCount['5-Star'] || 0, rarityCount['4-Star'] || 0],
              backgroundColor: ['#facc15', '#a78bfa'],
            }]
          }}
        />
      </div>

      {/* Bar: Featured vs Off-Banner */}
      {featuredList.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-center mb-2">Featured vs Off-Banner 5★ Pulls</h3>
          <Bar
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
        </div>
      )}

      {/* Bar: Pity Histogram */}
      {pityGaps.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-center mb-2">Pity Histogram (Pulls Between 5★s)</h3>
          <Bar
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
        </div>
      )}

      {/* Line: Spending Over Time */}
      {spendingData.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-center mb-2">Cumulative Spending Over Time</h3>
          <Line
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
                    callback: (val: number | string) =>
                      `£${Number(val).toFixed(0)}`
                  }
                }
              }
            }}
          />
        </div>
      )}

      {/* Line: Pull Timeline by Rarity */}
      {pullTimeline.length > 0 && (
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <h3 className="font-semibold text-center mb-2">Pull Timeline by Rarity</h3>
          <Line
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
                    stepSize: 1, // ✅ <-- this is correct location
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
        </div>
      )}

    </div>
  );
}
