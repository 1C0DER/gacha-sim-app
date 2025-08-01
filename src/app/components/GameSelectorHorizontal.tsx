'use client';
import { useRouter } from 'next/navigation';
import { gachaRates, GameKey } from '@/lib/gachaData';

export default function GameSelectorHorizontal() {
const router = useRouter();

return (
<div className="flex flex-row flex-wrap justify-center gap-6">
    {Object.entries(gachaRates).map(([key, data]) => (
    <button
        key={key}
        onClick={() => router.push(`/gacha/${key}`)}
        className="flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-500 shadow-md rounded-xl px-6 py-3 transition-transform duration-200 hover:scale-105 min-w-[140px]"
    >
        <img
        src={data.icon}
        alt={data.name}
        className="w-10 h-10 object-contain"
        />
        <span className="text-base font-semibold text-gray-800">{data.name}</span>
    </button>
    ))}
</div>
);
}
