// /lib/getOrCreateUserId.ts
export const getOrCreateUserId = (): string => {
  if (typeof window === 'undefined') return ''; 

  const key = 'gacha_user_id';
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const newId = crypto.randomUUID(); 
  localStorage.setItem(key, newId);
  return newId;
};
