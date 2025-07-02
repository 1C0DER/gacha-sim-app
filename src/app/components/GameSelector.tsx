'use client';
import { useRouter } from 'next/navigation';
import { gachaRates, GameKey } from '@/lib/gachaData';

export default function GameSelector() {
  const router = useRouter();

  const handleClick = (key: GameKey) => {
    router.push(`/gacha/${key}`);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-4">
        {Object.entries(gachaRates).map(([key, data]) => (
          <button
            key={key}
            onClick={() => handleClick(key as GameKey)}
            className="flex flex-col items-center bg-white border border-gray-300 hover:border-blue-500 shadow-sm rounded-xl px-4 py-2 transition duration-200 min-w-[100px]"
          >
            <img
              src={data.icon}
              alt={data.name}
              className="w-10 h-10 object-contain mb-1"
            />
            <span className="text-sm text-gray-800 text-center">{data.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
