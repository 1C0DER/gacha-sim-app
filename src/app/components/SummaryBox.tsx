import React from 'react';

interface Props {
  totalPulls: number;
  totalFiveStars: number;
  avgPullsPerFive: string | number;
  lastFiveStarAt: string | number;
  expectedFiveStars: number;
  luckMessage: string;
  currency: string;
  moneyDisp: string;
}

const currencyWarningThresholds: Record<string, number> = {
  GBP: 200,
  USD: 250,
  EUR: 230,
  JPY: 30000,
  NGN: 200000,
  AUD: 350,
  CAD: 320,
  INR: 20000,
};

const SummaryBox: React.FC<Props> = ({
  totalPulls,
  totalFiveStars,
  avgPullsPerFive,
  lastFiveStarAt,
  expectedFiveStars,
  luckMessage,
  currency,
  moneyDisp,
}) => {
  const moneyFloat = parseFloat(moneyDisp);
  const threshold = currencyWarningThresholds[currency] || 200;
  const showWarning = moneyFloat > threshold;

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-md p-6 space-y-3 text-sm text-black">
      <p>Total Pulls: <strong>{totalPulls}</strong></p>
      <p>Total 5★ Pulled: <strong>{totalFiveStars}</strong></p>
      <p>Average Pulls per 5★: <strong>{avgPullsPerFive}</strong></p>
      <p>Last 5★ was <strong>{lastFiveStarAt}</strong> pulls ago</p>

      <hr className="border-t border-white/30 my-2" />

      <p>Statistically Expected 5★s: <strong>{expectedFiveStars}</strong></p>
      <p>{luckMessage}</p>

      {showWarning && (
        <p className="text-red-600 font-bold">🔔 You've spent over {currency === 'JPY' ? '¥' : '£'}{threshold} — that’s console money!</p>
      )}
    </div>
  );
};

export default SummaryBox;
