import { useState, useEffect } from 'react';

const fallbackRates: Record<string, number> = {
  GBP: 1,
  USD: 1.26,
  EUR: 1.17,
  JPY: 200,
  NGN: 1845,
  AUD: 1.89,
  CAD: 1.72,
  INR: 105,
};

export function useExchangeRate(currency: string): number {
  const [rate, setRate] = useState(fallbackRates[currency] || 1);

  useEffect(() => {
    if (currency === 'GBP') {
      setRate(1);
      return;
    }

    fetch(`https://api.exchangerate.host/latest?base=GBP&symbols=${currency}`)
      .then((res) => res.json())
      .then((data) => {
        const newRate = data?.rates?.[currency];
        if (newRate) {
          setRate(newRate);
        } else {
          console.warn(`Fallback to static rate for ${currency}`);
          setRate(fallbackRates[currency] || 1);
        }
      })
      .catch((err) => {
        console.error('Exchange fetch failed, using fallback:', err);
        setRate(fallbackRates[currency] || 1);
      });
  }, [currency]);

  return rate;
}
