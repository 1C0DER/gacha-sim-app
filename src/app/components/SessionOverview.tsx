import { getTheme } from '@/lib/themeConfig';

interface Props {
  moneyDisp: string;
  symbol: string;
  pity5: number;
  pity4: number;
  pityMax5: number;
  pityMax4: number;
  onClear: () => void;
  onExport: () => void;
  gameKey?: string;
}

export default function SessionOverview({
  moneyDisp,
  symbol,
  pity5,
  pity4,
  pityMax5,
  pityMax4,
  onClear,
  onExport,
  gameKey = 'Default',
}: Props) {
  const theme = getTheme(gameKey);

  return (
    <div className={`${theme.panelBg} ${theme.borderGold} rounded-2xl shadow-lg p-5 text-sm space-y-2 border border-white/30`}>
      <p className="text-green-700">💸 <strong>{symbol}{moneyDisp}</strong> spent</p>
      <p className="text-green-700">
        Pity: 5★ <strong>{pity5}/{pityMax5}</strong> | 4★ <strong>{pity4}/{pityMax4}</strong>
      </p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={onClear}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
          Clear Session
        </button>
        <button
          onClick={onExport}
          className={`${theme.buttonActive} hover:opacity-90 px-4 py-2 rounded transition`}>
          Export Session
        </button>
      </div>
    </div>
  );
}
