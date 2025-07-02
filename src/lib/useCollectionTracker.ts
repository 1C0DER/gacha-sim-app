import { useMemo } from 'react';
import { GameKey } from './gachaData';

export type Rarity = '5-Star' | '4-Star' | '3-Star';

export interface Pull {
  name: string;
  rarity: Rarity;
}

export interface CollectionEntry {
  name: string;
  rarity: Rarity;
  count: number;
  label: string;
}

const gamePrefixes: Record<GameKey, string> = {
  Genshin: 'C',
  Honkai: 'E',
  Custom: '?',
};

export function useCollectionTracker(history: Pull[], gameKey: GameKey): CollectionEntry[] {
  return useMemo(() => {
    const prefix = gamePrefixes[gameKey] || '?';
    const map = new Map<string, { name: string; rarity: Rarity; count: number }>();

    for (const pull of history) {
      const key = `${pull.name}_${pull.rarity}`;
      if (!map.has(key)) {
        map.set(key, { name: pull.name, rarity: pull.rarity, count: 1 });
      } else {
        map.get(key)!.count += 1;
      }
    }

    return Array.from(map.values()).map(({ name, rarity, count }) => ({
      name,
      rarity,
      count,
      label: `${name} ${prefix}${count - 1}`, // C0 = first copy
    }));
  }, [history, gameKey]);
}
