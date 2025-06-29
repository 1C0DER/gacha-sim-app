interface Props {
  moneyDisp: string;
  symbol: string;
  pity5: number;
  pity4: number;
  pityMax5: number;
  pityMax4: number;
  onClear: () => void;
  onExport: () => void;
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
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 text-sm space-y-2 border border-gray-200">
      <p>💸 <strong>{symbol}{moneyDisp}</strong> spent</p>
      <p>Pity: 5★ <strong>{pity5}/{pityMax5}</strong> | 4★ <strong>{pity4}/{pityMax4}</strong></p>
      <div className="flex gap-3 mt-3">
        <button onClick={onClear} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
          Clear Session
        </button>
        <button onClick={onExport} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
          Export Session
        </button>
      </div>
    </div>
  );
}
