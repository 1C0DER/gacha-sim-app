export const gachaRates = {
  Genshin: {
    name: 'Genshin Impact',
    banners: {
      Limited: {
        name: 'Limited Character Event Wish',
        type: 'limited',
        costPerPullGBP: 2.45,
        currencyPerPull: 160,
        rates: {
          '5-Star': 0.006,
          '4-Star': 0.051,
          '3-Star': 0.943,
        },
        pity: {
          '5-Star': 90,
          '4-Star': 10,
        },
        softPity: {
          enabled: true,
          start: 75,
          maxRate: 0.324,
        },
        featured: {
          '5-Star': ['Skirk'],
          '4-Star': ['Dahlia', 'Candace', 'Diona'],
        },
        pool: {
          '5-Star': ['Skirk', 'Yumemizuki Mizuki', 'Dehya', 'Tighnari', 'Keqing', 'Mona', 'Qiqi', 'Diluc', 'Jean'],
          '4-Star': ['Barbara', 'Beidou', 'Bennet', 'Candace', 'Charlotte', 'Chevreuse', 'Chongyun', 'Collei', 'Diona', 'Dori', 'Faruzan', 'Fischl', 'Freminet', 'Gaming', 'Gorou', 'Iansan', 'Ifa', 'Kachina', 'Kaveh', 'Kirara', 'Kujo Sara', 'Kuki Shinobu', 'Lan Yan', 'Layla', 'Lynette', 'Mika', 'Nigguang', 'Noelle', 'Ororon', 'Razor', 'Rosaria', 'Sayu', 'Sethos', 'Shikanoin Heizou', 'Sucrose', 'Thoma', 'Xiangling', 'Xingqiu', 'Xinyan', 'Yanfei', 'Yaoyao', 'Yun Jin', 'Dragons Bane', 'Eye of Per­cep­tion', 'Favonius Codex', 'Fa­vo­ni­us Great­sword', 'Favonius Lance', 'Fa­vo­ni­us Sword', 'Favonius Warbow', 'Li­ons Roar', 'Rainslasher', 'Rust', 'Sacrificial Bow', 'Sacrificial Fragments', 'Sacrificial Greatsword', 'Sacrificial Sword', 'The Bell', 'The Flute', 'The Stringless', 'The Widsith'],
          '3-Star': ['Black Tassel', 'Bloodtainted Greatsword', 'Cool Steel', 'Debate Club', 'Emer­ald Orb', 'Ferrous Shadow', 'Har­binger of Dawn', 'Magic Guide', 'Ra­ven Bow', 'Sharpshooters Oath', 'Sky­rider Sword', 'Slingshot', 'Thrill­ing Tales of Drag­on Slay­ers'],
        },
      },
      Standard: {
        name: 'Wanderlust Invocation',
        type: 'standard',
        costPerPullGBP: 2.45,
        currencyPerPull: 160,
        rates: { '5-Star': 0.006, '4-Star': 0.051, '3-Star': 0.943 },
        pity: { '5-Star': 90, '4-Star': 10 },
        softPity: { enabled: true, start: 75, maxRate: 0.324 },
        featured: { '5-Star': [], '4-Star': [] },
        pool: { '5-Star': [], '4-Star': [], '3-Star': [] },
      },
      Weapon: {
        name: 'Epitome Invocation',
        type: 'weapon',
        costPerPullGBP: 2.45,
        currencyPerPull: 160,
        rates: { '5-Star': 0.007, '4-Star': 0.060, '3-Star': 0.933 },
        pity: { '5-Star': 80, '4-Star': 10 },
        softPity: { enabled: true, start: 65, maxRate: 0.35 },
        featured: {
          '5-Star': ['Azurelight', 'Calamity Queller'],
          '4-Star': ['Xiphos’ Moonlight', 'Makhaira Aquamarine', 'Wandering Evenstar', 'Favonius Lance', 'Sacrificial Bow'],
        },
        pool: { '5-Star': [], '4-Star': [], '3-Star': [] },
      },
      Chronicle: {
        name: 'Chronicled Wish',
        type: 'chronicle',
        costPerPullGBP: 2.45,
        currencyPerPull: 160,
        rates: { '5-Star': 0.006, '4-Star': 0.051, '3-Star': 0.943 },
        pity: { '5-Star': 90, '4-Star': 10 },
        softPity: { enabled: true, start: 75, maxRate: 0.324 },
        featured: { '5-Star': [], '4-Star': [] },
        pool: { '5-Star': [], '4-Star': [], '3-Star': [] },
      },
    },
  },

  Honkai: {
    name: 'Honkai: Star Rail',
    banners: {
      Default: {
        name: 'Default Honkai Banner',
        type: 'standard',
        costPerPullGBP: 2.30,
        currencyPerPull: 160,
        rates: { '5-Star': 0.007, '4-Star': 0.060, '3-Star': 0.933 },
        pity: { '5-Star': 90, '4-Star': 10 },
        softPity: { enabled: true, start: 75, maxRate: 0.35 },
        featured: { '5-Star': [], '4-Star': [] },
        pool: { '5-Star': [], '4-Star': [], '3-Star': [] },
      },
    },
  },

  Custom: {
    name: 'Custom Game',
    banners: {
      Default: {
        name: 'Custom Standard Banner',
        type: 'standard',
        costPerPullGBP: 1.60,
        currencyPerPull: 100,
        rates: { '5-Star': 0.01, '4-Star': 0.09, '3-Star': 0.90 },
        pity: { '5-Star': 0, '4-Star': 0 },
        softPity: { enabled: false, start: 0, maxRate: 0 },
        featured: { '5-Star': [], '4-Star': [] },
        pool: { '5-Star': [], '4-Star': [], '3-Star': [] },
      },
    },
  },
} as const;

export type GameKey = keyof typeof gachaRates;
export type BannerKey = keyof typeof gachaRates['Genshin']['banners'];

