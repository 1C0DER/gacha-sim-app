interface Pull {
  name: string;
  rarity: '5-Star' | '4-Star' | '3-Star';
}

interface Props {
  history: Pull[];
}

export default function PullHistory({ history }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Pull History</h2>
      <ul className="max-h-[300px] overflow-y-auto space-y-1 text-sm">
        {history.map((p, i) => (
          <li key={i} className="border-b border-gray-200 pb-1 last:border-0 flex items-center gap-2">
            {p.rarity === '5-Star' && <span className="text-yellow-500 font-bold">⭐️⭐️⭐️⭐️⭐️</span>}
            {p.rarity === '4-Star' && <span className="text-purple-500 font-bold">⭐️⭐️⭐️⭐️</span>}
            {p.rarity === '3-Star' && <span className="text-gray-400">⭐️⭐️⭐️</span>}
            <span className="text-gray-800">{p.name || '⚠️ Unknown'}</span>
          </li>
        ))}
        {history.length === 0 && (
          <li className="text-gray-500 italic">No pulls yet.</li>
        )}
      </ul>
    </div>
  );
}
