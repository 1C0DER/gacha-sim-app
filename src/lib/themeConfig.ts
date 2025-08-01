export const gameThemes = {
  Genshin: {
    background: '/genshin.jpg',
    primaryColor: '#4caf50',
    accentColor: '#81c784',
    textColor: '#1b4332',
    overlay: 'rgba(0, 0, 0, 0.15)',
    panelBg: 'bg-white/70 backdrop-blur-md', 
    headingText: 'text-green-900',
    buttonActive: 'bg-green-600 text-white shadow-md hover:bg-green-700',
    buttonInactive: 'bg-green-100 text-green-700 hover:bg-green-200',
    chartColors: {
      pie: ['#facc15', '#a78bfa'],      
      barFeatured: ['#facc15', '#f87171'],
      pity: '#60a5fa',
      probLine: '#15803d',
      spendLine: '#16a34a',
    },
    borderGold: 'border-yellow-400',
  },
  Default: {
    background: '/back.png',
    primaryColor: '#7b61ff',
    accentColor: '#b388ff',
    textColor: '#000000',
    overlay: 'rgba(0, 0, 0, 0)',
    panelBg: 'bg-white',
    headingText: 'text-gray-700',
    buttonActive: 'bg-blue-500 text-white',
    buttonInactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    chartColors: {
      pie: ['#facc15', '#a78bfa'],
      barFeatured: ['#34d399', '#f87171'],
      pity: '#60a5fa',
      probLine: '#22d3ee',
      spendLine: '#f97316',
    },
    borderGold: 'border-yellow-300',
  },
};

export const getTheme = (gameKey: string) =>
  gameThemes[gameKey as keyof typeof gameThemes] || gameThemes.Default;
