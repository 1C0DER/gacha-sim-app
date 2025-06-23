'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { gachaRates, GameKey } from '@/lib/gachaData';
import SimPage from '@/app/components/SimPage';

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const gameParam = (params?.game as string)?.toLowerCase();

  const validKey = (Object.keys(gachaRates) as GameKey[]).find(
    (key) => key.toLowerCase() === gameParam
  );

  useEffect(() => {
    if (!validKey) {
      router.replace('/'); 
    }
  }, [validKey, router]);

  if (!validKey) return null;

  return <SimPage gameKey={validKey} />;
}
