'use client';
import { useRouter } from 'next/navigation';
import { gachaRates, GameKey } from '@/lib/gachaData';

export default function GameSelector() {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/gacha/${e.target.value}`);  
  };

  return (
    <div className="mb-8 w-full max-w-xs">
      <select
        defaultValue=""
        onChange={handleChange}
        className="w-full p-2 text-black rounded border bg-white">
        <option value="" disabled>Select a Game…</option>
        {Object.keys(gachaRates).map((key) => (
          <option key={key} value={key}>
            {gachaRates[key as GameKey].name}
          </option>
        ))}
      </select>
    </div>
  );
}
