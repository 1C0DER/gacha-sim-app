export const gameThemes = {
  Genshin: {
    background: '/genshin.jpg',
    primaryColor: '#4caf50',
    accentColor: '#81c784',
    textColor: '#1b4332',
    overlay: 'rgba(0, 0, 0, 0.10)',
    panelBg: 'bg-white/50 backdrop-blur-lg shadow-lg',
    headingText: 'text-green-800 drop-shadow-md',
    buttonActive:
      'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md hover:from-green-600 hover:to-green-800 hover:shadow-lg transition-transform hover:scale-105',
    buttonInactive:
      'bg-green-100 text-green-700 hover:bg-green-200 shadow-sm',
    chartColors: {
      pie: ['#facc15', '#a78bfa'],
      barFeatured: ['#facc15', '#f87171'],
      pity: '#60a5fa',
      probLine: '#15803d',
      probFill: 'rgba(21, 128, 61, 0.2)',      
      spendLine: '#16a34a',
      spendFill: 'rgba(22, 163, 74, 0.3)',     
      timelineBorder: '#6b7280',
      timelineFill: '#cbd5e166',
    },
    borderGold: 'border border-yellow-300',
    sectionUnderline: 'after:block after:h-1 after:w-12 after:bg-green-400 after:mt-1 after:mx-auto rounded',
  },

  Honkai: {
    background: '/honkai.jpg',
    primaryColor: '#3b82f6',
    accentColor: '#93c5fd',
    textColor: '#1e3a8a',
    overlay: 'rgba(0, 0, 0, 0.15)',
    panelBg: 'bg-white/50 backdrop-blur-lg shadow-lg',
    headingText: 'text-blue-800 drop-shadow-md',
    buttonActive:
      'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transition-transform hover:scale-105',
    buttonInactive:
      'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-sm',
    chartColors: {
      pie: ['#facc15', '#a78bfa'],
      barFeatured: ['#3b82f6', '#f87171'],
      pity: '#60a5fa',
      probLine: '#2563eb',
      probFill: 'rgba(37, 99, 235, 0.2)',        
      spendLine: '#1d4ed8',
      spendFill: 'rgba(29, 78, 216, 0.3)',     
      timelineBorder: '#6b7280',
      timelineFill: '#cbd5e166',
    },
    borderGold: 'border border-blue-300',
    sectionUnderline: 'after:block after:h-1 after:w-12 after:bg-blue-400 after:mt-1 after:mx-auto rounded',
  },

  ZZZ: {
  background: '/zzz.jpeg',
  primaryColor: '#f59e0b', 
  accentColor: '#fb923c', 
  textColor: '#1c1917',
  overlay: 'rgba(0, 0, 0, 0.12)',
  panelBg: 'bg-white/50 backdrop-blur-lg shadow-lg',
  headingText: 'text-yellow-800 drop-shadow-md',
  buttonActive:
    'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg transition-transform hover:scale-105',
  buttonInactive:
    'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 shadow-sm',
  chartColors: {
    pie: ['#facc15', '#f97316'],
    barFeatured: ['#f59e0b', '#f87171'],
    pity: '#fbbf24',
    probLine: '#d97706',
    probFill: 'rgba(217, 119, 6, 0.2)',  
    spendLine: '#ea580c',
    spendFill: 'rgba(234, 88, 12, 0.3)',   
    timelineBorder: '#78350f',
    timelineFill: '#fed7aa66',
  },
  borderGold: 'border border-yellow-300',
  sectionUnderline: 'after:block after:h-1 after:w-12 after:bg-yellow-400 after:mt-1 after:mx-auto rounded',
  },

  Default: {
    background: '/back.png',
    primaryColor: '#7b61ff',
    accentColor: '#b388ff',
    textColor: '#000000',
    overlay: 'rgba(0, 0, 0, 0)',
    panelBg: 'bg-white shadow-md',
    headingText: 'text-gray-700',
    buttonActive: 'bg-blue-500 text-white hover:bg-blue-600 shadow-md',
    buttonInactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm',
    chartColors: {
      pie: ['#facc15', '#a78bfa'],
      barFeatured: ['#34d399', '#f87171'],
      pity: '#60a5fa',
      probLine: '#22d3ee',
      probFill: 'rgba(34, 211, 238, 0.2)',   
      spendLine: '#f97316',
      spendFill: 'rgba(252, 211, 77, 0.3)',       
      timelineBorder: '#6b7280',
      timelineFill: '#cbd5e166',
    },
    borderGold: 'border border-gray-200',
    sectionUnderline: '',
  },
};

export const getTheme = (gameKey: string) =>
  gameThemes[gameKey as keyof typeof gameThemes] || gameThemes.Default;
