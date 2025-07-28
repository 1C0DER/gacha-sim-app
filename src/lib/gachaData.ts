export const gachaRates = {
  Genshin: {
    name: 'Genshin Impact',
    icon: '/icons/genshin.png',
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
        pool: {
          '5-Star': ['Yumemizuki Mizuki', 'Dehya', 'Tighnari', 'Keqing', 'Mona', 'Qiqi', 'Diluc', 'Jean', 'Amos\' Bow', 'Aquila Favonia', 'Lost Prayer to the Sacred Winds', 'Primordial Jade Winged-Spear', 'Skyward Atlas', 'Skyward Blade', 'Skyward Harp', 'Skyward Pride', 'Skyward Spine', 'Wolf\'s Gravestone'],
          '4-Star': ['Amber', 'Barbara', 'Beidou', 'Bennett', 'Candace', 'Charlotte', 'Chevreuse', 'Chongyun', 'Collei', 'Diona', 'Dori', 'Faruzan', 'Fischl', 'Freminet', 'Gaming', 'Gorou', 'Iansan', 'Ifa', 'Kachina', 'Kaeya', 'Kaveh', 'Kirara', 'Kujou Sara', 'Kuki Shinobu', 'Lan Yan', 'Layla', 'Lisa', 'Lynette', 'Mika', 'Ningguang', 'Noelle', 'Ororon', 'Razor', 'Rosaria', 'Sayu', 'Sethos', 'Shikanoin Heizou', 'Sucrose', 'Thoma', 'Xiangling', 'Xingqiu', 'Xinyan', 'Yanfei', 'Yaoyao', 'Yun Jin', 'Dragon\'s Bane', 'Eye of Perception', 'Favonius Codex', 'Favonius Greatsword', 'Favonius Lance', 'Favonius Sword', 'Favonius Warbow', 'Lion\'s Roar', 'Rainslasher', 'Rust', 'Sacrificial Bow', 'Sacrificial Fragments', 'Sacrificial Greatsword', 'Sacrificial Sword', 'The Bell', 'The Flute', 'The Stringless', 'The Widsith'],
          '3-Star': ['Black Tassel', 'Bloodtainted Greatsword', 'Cool Steel', 'Debate Club', 'Emerald Orb', 'Ferrous Shadow', 'Harbinger of Dawn', 'Magic Guide', 'Raven Bow', 'Sharpshooter\'s Oath', 'Skyrider Sword', 'Slingshot', 'Thrilling Tales of Dragon Slayers'],
        },
      },
      Weapon: {
        name: 'Epitome Invocation',
        type: 'weapon',
        costPerPullGBP: 2.45,
        currencyPerPull: 160,
        rates: { '5-Star': 0.007, '4-Star': 0.060, '3-Star': 0.933 },
        pity: { '5-Star': 80, '4-Star': 10 },
        softPity: { enabled: true, start: 65, maxRate: 0.2 },
        featured: {
          '5-Star': ['Azurelight', 'Calamity Queller'],
          '4-Star': ['Xiphos’ Moonlight', 'Makhaira Aquamarine', 'Wandering Evenstar', 'Favonius Lance', 'Sacrificial Bow'],
        },
        pool: { 
          '5-Star': ['Amos\' Bow', 'Aquila Favonia', 'Lost Prayer to the Sacred Winds', 'Primordial Jade Winged-Spear', 'Skyward Atlas', 'Skyward Blade', 'Skyward Harp', 'Skyward Pride', 'Skyward Spine', 'Wolf\'s Gravestone'], 
          '4-Star': ['Amber', 'Barbara', 'Beidou', 'Bennett', 'Candace', 'Charlotte', 'Chevreuse', 'Chongyun', 'Collei', 'Diona', 'Dori', 'Faruzan', 'Fischl', 'Freminet', 'Gaming', 'Gorou', 'Iansan', 'Ifa', 'Kachina', 'Kaeya', 'Kaveh', 'Kirara', 'Kujou Sara', 'Kuki Shinobu', 'Lan Yan', 'Layla', 'Lisa', 'Lynette', 'Mika', 'Ningguang', 'Noelle', 'Ororon', 'Razor', 'Rosaria', 'Sayu', 'Sethos', 'Shikanoin Heizou', 'Sucrose', 'Thoma', 'Xiangling', 'Xingqiu', 'Xinyan', 'Yanfei', 'Yaoyao', 'Yun Jin', 'Dragon\'s Bane', 'Eye of Perception', 'Favonius Codex', 'Favonius Greatsword', 'Favonius Lance', 'Favonius Sword', 'Favonius Warbow', 'Lion\'s Roar', 'Rainslasher', 'Rust', 'Sacrificial Bow', 'Sacrificial Fragments', 'Sacrificial Greatsword', 'Sacrificial Sword', 'The Bell', 'The Flute', 'The Stringless', 'The Widsith'], 
          '3-Star': ['Black Tassel', 'Bloodtainted Greatsword', 'Cool Steel', 'Debate Club', 'Emerald Orb', 'Ferrous Shadow', 'Harbinger of Dawn', 'Magic Guide', 'Raven Bow', 'Sharpshooter\'s Oath', 'Skyrider Sword', 'Slingshot', 'Thrilling Tales of Dragon Slayers'] 
        },
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
        pool: {
          '5-Star': [
            'Albedo', 'Alhaitham', 'Aloy', 'Arataki Itto', 'Arlecchino', 'Baizhu', 'Chasca', 'Chiori', 'Citlali', 'Clorinde',
            'Cyno', 'Dehya', 'Diluc', 'Emilie', 'Escoffier', 'Eula', 'Furina', 'Ganyu', 'Hu Tao', 'Jean', 'Kaedehara Kazuha',
            'Kamisato Ayaka', 'Kamisato Ayato', 'Keqing', 'Kinich', 'Klee', 'Lyney', 'Mavuika', 'Mona', 'Mualani', 'Nahida',
            'Navia', 'Neuvillette', 'Nilou', 'Qiqi', 'Raiden Shogun', 'Sangonomiya Kokomi', 'Shenhe', 'Sigewinne', 'Skirk',
            'Tartaglia', 'Tighnari', 'Traveler', 'Varesa', 'Venti', 'Wanderer', 'Wriothesley', 'Xianyun', 'Xiao', 'Xilonen',
            'Yae Miko', 'Yelan', 'Yoimiya', 'Yumemizuki Mizuki', 'Zhongli',

            'A Thousand Blazing Suns', 'A Thousand Floating Dreams', 'Absolution', 'Amos\' Bow', 'Aqua Simulacra',
            'Aquila Favonia', 'Astral Vulture\'s Crimson Plumage', 'Azurelight', 'Beacon of the Reed Sea',
            'Calamity Queller', 'Cashflow Supervision', 'Crane\'s Echoing Call', 'Crimson Moon\'s Semblance',
            'Elegy for the End', 'Engulfing Lightning', 'Everlasting Moonglow', 'Fang of the Mountain King',
            'Freedom-Sworn', 'Haran Geppaku Futsu', 'Hunter\'s Path', 'Jadefall\'s Splendor', 'Kagura\'s Verity',
            'Key of Khaj-Nisut', 'Light of Foliar Incision', 'Lost Prayer to the Sacred Winds', 'Lumidouce Elegy',
            'Memory of Dust', 'Mistsplitter Reforged', 'Peak Patrol Song', 'Polar Star', 'Primordial Jade Cutter',
            'Primordial Jade Winged-Spear', 'Redhorn Stonethresher', 'Silvershower Heartstrings', 'Skyward Atlas',
            'Skyward Blade', 'Skyward Harp', 'Skyward Pride', 'Skyward Spine', 'Song of Broken Pines',
            'Splendor of Tranquil Waters', 'Staff of Homa', 'Staff of the Scarlet Sands', 'Starcaller\'s Watch',
            'Summit Shaper', 'Sunny Morning Sleep-In', 'Surf\'s Up', 'Symphonist of Scents', 'The First Great Magic',
            'The Unforged', 'Thundering Pulse', 'Tome of the Eternal Flow', 'Tulaytullah\'s Remembrance',
            'Uraku Misugiri', 'Verdict', 'Vivid Notions', 'Vortex Vanquisher', 'Wolf\'s Gravestone'
          ],
        '5-Star-Meta': {
          characters: [
            'Albedo', 'Alhaitham', 'Aloy', 'Arataki Itto', 'Arlecchino', 'Baizhu', 'Chasca', 'Chiori', 'Citlali', 'Clorinde',
            'Cyno', 'Dehya', 'Diluc', 'Emilie', 'Escoffier', 'Eula', 'Furina', 'Ganyu', 'Hu Tao', 'Jean', 'Kaedehara Kazuha',
            'Kamisato Ayaka', 'Kamisato Ayato', 'Keqing', 'Kinich', 'Klee', 'Lyney', 'Mavuika', 'Mona', 'Mualani', 'Nahida',
            'Navia', 'Neuvillette', 'Nilou', 'Qiqi', 'Raiden Shogun', 'Sangonomiya Kokomi', 'Shenhe', 'Sigewinne', 'Skirk',
            'Tartaglia', 'Tighnari', 'Traveler', 'Varesa', 'Venti', 'Wanderer', 'Wriothesley', 'Xianyun', 'Xiao', 'Xilonen',
            'Yae Miko', 'Yelan', 'Yoimiya', 'Yumemizuki Mizuki', 'Zhongli'
          ],
          weapons: [
            'A Thousand Blazing Suns', 'A Thousand Floating Dreams', 'Absolution', 'Amos\' Bow', 'Aqua Simulacra',
            'Aquila Favonia', 'Astral Vulture\'s Crimson Plumage', 'Azurelight', 'Beacon of the Reed Sea',
            'Calamity Queller', 'Cashflow Supervision', 'Crane\'s Echoing Call', 'Crimson Moon\'s Semblance',
            'Elegy for the End', 'Engulfing Lightning', 'Everlasting Moonglow', 'Fang of the Mountain King',
            'Freedom-Sworn', 'Haran Geppaku Futsu', 'Hunter\'s Path', 'Jadefall\'s Splendor', 'Kagura\'s Verity',
            'Key of Khaj-Nisut', 'Light of Foliar Incision', 'Lost Prayer to the Sacred Winds', 'Lumidouce Elegy',
            'Memory of Dust', 'Mistsplitter Reforged', 'Peak Patrol Song', 'Polar Star', 'Primordial Jade Cutter',
            'Primordial Jade Winged-Spear', 'Redhorn Stonethresher', 'Silvershower Heartstrings', 'Skyward Atlas',
            'Skyward Blade', 'Skyward Harp', 'Skyward Pride', 'Skyward Spine', 'Song of Broken Pines',
            'Splendor of Tranquil Waters', 'Staff of Homa', 'Staff of the Scarlet Sands', 'Starcaller\'s Watch',
            'Summit Shaper', 'Sunny Morning Sleep-In', 'Surf\'s Up', 'Symphonist of Scents', 'The First Great Magic',
            'The Unforged', 'Thundering Pulse', 'Tome of the Eternal Flow', 'Tulaytullah\'s Remembrance',
            'Uraku Misugiri', 'Verdict', 'Vivid Notions', 'Vortex Vanquisher', 'Wolf\'s Gravestone'
              ]
            },
            '4-Star': ['Amber', 'Barbara', 'Beidou', 'Bennett', 'Candace', 'Charlotte', 'Chevreuse', 'Chongyun', 'Collei', 'Diona', 'Dori', 'Faruzan', 'Fischl', 'Freminet', 'Gaming', 'Gorou', 'Iansan', 'Ifa', 'Kachina', 'Kaeya', 'Kaveh', 'Kirara', 'Kujou Sara', 'Kuki Shinobu', 'Lan Yan', 'Layla', 'Lisa', 'Lynette', 'Mika', 'Ningguang', 'Noelle', 'Ororon', 'Razor', 'Rosaria', 'Sayu', 'Sethos', 'Shikanoin Heizou', 'Sucrose', 'Thoma', 'Xiangling', 'Xingqiu', 'Xinyan', 'Yanfei', 'Yaoyao', 'Yun Jin', 'Dragon\'s Bane', 'Eye of Perception', 'Favonius Codex', 'Favonius Greatsword', 'Favonius Lance', 'Favonius Sword', 'Favonius Warbow', 'Lion\'s Roar', 'Rainslasher', 'Rust', 'Sacrificial Bow', 'Sacrificial Fragments', 'Sacrificial Greatsword', 'Sacrificial Sword', 'The Bell', 'The Flute', 'The Stringless', 'The Widsith'], 
            '3-Star': ['Black Tassel', 'Bloodtainted Greatsword', 'Cool Steel', 'Debate Club', 'Emerald Orb', 'Ferrous Shadow', 'Harbinger of Dawn', 'Magic Guide', 'Raven Bow', 'Sharpshooter\'s Oath', 'Skyrider Sword', 'Slingshot', 'Thrilling Tales of Dragon Slayers']
          }
        },
        },
      },
  Honkai: {
  name: 'Honkai: Star Rail',
  icon: '/icons/honkai.png',
  banners: {
    Limited: {
      name: 'To Evermore Burn as the Sun',
      type: 'limited',
      costPerPullGBP: 2.30,
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
        '5-Star': ['Phainon'],
        '4-Star': ['Tingyun', 'March 7th', 'Yukong'],
      },
      pool: {
        '5-Star': ['Bailu', 'Blade', 'Bronya', 'Clara', 'Fu Xuan', 'Gepard', 'Himeko', 'Seele', 'Welt', 'Yanqing'],
        '4-Star': ['Arlan', 'Asta', 'Dan Heng', 'Gallagher', 'Guinaifen', 'Hanya', 'Herta', 'Hook', 'Luka', 'Lynx', 'March 7th (Preservation)', 'Moze', 'Misha', 'Natasha', 'Pela', 'Sampo', 'Serval', 'Tingyun', 'Yukong', 'A Secret Vow', 'After the C Fall', 'Boundless Choreo', 'Concert for Two', 'Dance! Dance! Dance!', 'Day One of My New Life', 'Dream\'s Montage', 'Eyes of the Prey', 'Geniuses\' Greetings', 'Geniuses\' Repose', 'Good Night and Sleep Well', 'Indelible Promise', 'Landau\'s Choice', 'Make the World Clamor', 'Memories of the Past', 'Only Silence Remains', 'Perfect Timing', 'Planetary Rendezvous', 'Poised to Bloom', 'Post-Op Conversation', 'Resolution Shines As Pearls of Sweat', 'Shadowed by Night', 'Shared Feeling', 'Subscribe for More!', 'Swordplay', 'The Birth of the Self', 'The Moles Welcome You', 'Trend of the Universal Market', 'Under the Blue Sky'],
        '3-Star': ['Adversarial', 'Amber', 'Arrows', 'Chorus', 'Collapsing Sky', 'Cornucopia', 'Darting Arrow', 'Data Bank', 'Defense', 'Fine Fruit', 'Hidden Shadow', 'Loop', 'Mediation', 'Meshing Cogs', 'Multiplication', 'Mutual Demise', 'Passkey', 'Pioneering', 'Reminiscence', 'Sagacity', 'Shadowburn', 'Shattered Home', 'Void'],
      }
    },
    Weapon: {
      name: 'Brilliant Fixation',
      type: 'weapon',
      costPerPullGBP: 2.30,
      currencyPerPull: 160,
      rates: {
        '5-Star': 0.008,
        '4-Star': 0.066,
        '3-Star': 0.926,
      },
      pity: {
        '5-Star': 80,
        '4-Star': 10,
      },
      softPity: {
        enabled: true,
        start: 65,
        maxRate: 0.35,
      },
      featured: {
        '5-Star': ['Thus Burns the Dawn'],
        '4-Star': [
          'The Story\'s Next Page',
          'Planetary Rendezvous',
          'Under the Blue Sky'
        ],
      },
      pool: {
        '5-Star': ['Thus Burns the Dawn','Moment of Victory', 'Time Waits for No one', 'Sleep Like the Dead', 'In the Name of the World', 'But the Battle isnt Over', 'Something Irreplaceable', 'Night On the Milky Way'],
        '4-Star': ['Arlan', 'Asta', 'Dan Heng', 'Gallagher', 'Guinaifen', 'Hanya', 'Herta', 'Hook', 'Luka', 'Lynx', 'March 7th (Preservation)', 'Moze', 'Misha', 'Natasha', 'Pela', 'Sampo', 'Serval', 'Tingyun', 'Yukong', 'A Secret Vow', 'After the C Fall', 'Boundless Choreo', 'Concert for Two', 'Dance! Dance! Dance!', 'Day One of My New Life', 'Dream\'s Montage', 'Eyes of the Prey', 'Geniuses\' Greetings', 'Geniuses\' Repose', 'Good Night and Sleep Well', 'Indelible Promise', 'Landau\'s Choice', 'Make the World Clamor', 'Memories of the Past', 'Only Silence Remains', 'Perfect Timing', 'Planetary Rendezvous', 'Poised to Bloom', 'Post-Op Conversation', 'Resolution Shines As Pearls of Sweat', 'Shadowed by Night', 'Shared Feeling', 'Subscribe for More!', 'Swordplay', 'The Birth of the Self', 'The Moles Welcome You', 'Trend of the Universal Market', 'Under the Blue Sky'],
        '3-Star': ['Adversarial', 'Amber', 'Arrows', 'Chorus', 'Collapsing Sky', 'Cornucopia', 'Darting Arrow', 'Data Bank', 'Defense', 'Fine Fruit', 'Hidden Shadow', 'Loop', 'Mediation', 'Meshing Cogs', 'Multiplication', 'Mutual Demise', 'Passkey', 'Pioneering', 'Reminiscence', 'Sagacity', 'Shadowburn', 'Shattered Home', 'Void'],
      }
    },
    Standard: {
      name: 'Stellar Warp',
      type: 'standard',
      costPerPullGBP: 2.30,
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
        '5-Star': [],
        '4-Star': [],
      },
      pool: {
        '5-Star': ['Bronya', 'Gepard', 'Himeko', 'Welt', 'Yanqing', 'Moment of Victory', 'Time Waits for No one', 'Sleep Like the Dead', 'In the Name of the World', 'But the Battle isnt Over', 'Something Irreplaceable', 'Night On the Milky Way'],
        '4-Star': ['Arlan', 'Asta', 'Dan Heng', 'Gallagher', 'Guinaifen', 'Hanya', 'Herta', 'Hook', 'Luka', 'Lynx', 'March 7th (Preservation)', 'Moze', 'Misha', 'Natasha', 'Pela', 'Sampo', 'Serval', 'Tingyun', 'Yukong', 'A Secret Vow', 'After the C Fall', 'Boundless Choreo', 'Concert for Two', 'Dance! Dance! Dance!', 'Day One of My New Life', 'Dream\'s Montage', 'Eyes of the Prey', 'Geniuses\' Greetings', 'Geniuses\' Repose', 'Good Night and Sleep Well', 'Indelible Promise', 'Landau\'s Choice', 'Make the World Clamor', 'Memories of the Past', 'Only Silence Remains', 'Perfect Timing', 'Planetary Rendezvous', 'Poised to Bloom', 'Post-Op Conversation', 'Resolution Shines As Pearls of Sweat', 'Shadowed by Night', 'Shared Feeling', 'Subscribe for More!', 'Swordplay', 'The Birth of the Self', 'The Moles Welcome You', 'Trend of the Universal Market', 'Under the Blue Sky'],
        '3-Star': ['Adversarial', 'Amber', 'Arrows', 'Chorus', 'Collapsing Sky', 'Cornucopia', 'Darting Arrow', 'Data Bank', 'Defense', 'Fine Fruit', 'Hidden Shadow', 'Loop', 'Mediation', 'Meshing Cogs', 'Multiplication', 'Mutual Demise', 'Passkey', 'Pioneering', 'Reminiscence', 'Sagacity', 'Shadowburn', 'Shattered Home', 'Void'],
      }
    },
  },
},
  ZZZ: {
    name: 'Zenless Zone Zero',
    icon: '/icons/zzz.jpg',
    banners: {
      Limited: {
        name: 'Whispered Tales',
        type: 'limited',
        costPerPullGBP: 2.30,
        currencyPerPull: 160,
        rates: {
          '5-Star': 0.006,
          '4-Star': 0.094,
          '3-Star': 0.9,
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
          '5-Star': ['Ukinami Yuzuha'],
          '4-Star': ['Piper Wheel', 'Billy Kid'],
        },
        pool: {
          '5-Star': ['Yuzuha', 'Alexandrina Sebastiane', 'Grace Howard', 'Koleda Belobog', 'Nekomiya Mana', 'Soldier 11', 'Von Lycaon'],
          '4-Star': ['Anby Demara', 'Anton Ivanov', 'Ben Bigger', 'Corin Wickes', 'Luciana de Montefio', 'Nicole Demara', 'Pan Yinhu', 'Pulchra Fellini', 'Seth Lowell', 'Soukaku', 'Bashful Demon', 'Big Cylinder', 'Box Cutter', 'Bunny Band', 'Demara Battery Mark II', 'Drill Rig - Red Axis', 'Housekeeper', 'Kaboom the Cannon', 'Original Transmorpher', 'Peacekeeper - Specialized', 'Precious Fossilized Core', 'Puzzle Sphere', 'Rainforest Gourmet', 'Roaring Ride', 'Slice of Time', 'Starlight Engine Replica', 'Starlight Engine', 'Steam Oven', 'Street Superstar', 'The Vault', 'Tremor Trigram Vessel', 'Weeping Gemini'],
          '3-Star': ['Base', 'Inflection', 'Decrescent', 'Noviluna', 'Pleniluna', 'Alpha', 'Bravo', 'Charlie', 'Mark I', 'Mark II', 'Mark III', 'Arrow', 'Hatchet', 'Revolver', 'Cobalt'],
        },
      },
      Weapon: {
        name: 'Dissonant Sonata',
        type: 'weapon',
        costPerPullGBP: 2.30,
        currencyPerPull: 160,
        rates: {
          '5-Star': 0.01, 
          '4-Star': 0.15,   
          '3-Star': 0.84   
        },
        pity: {
          '5-Star': 80,    
          '4-Star': 10,   
        },
        softPity: {
          enabled: true,
          start: 65,       
          maxRate: 0.35     
        },
        featured: {
          '5-Star': ['Metanuki-morphosis'],
          '4-Star': ['Roaring Tide', 'Starlight Engine Replica'],
        },
        pool: {
          '5-Star': ['Fusion Compiler', 'Hellfire Gears', 'Steel Cushion', 'The Brimstone', 'The Restrained', 'Weeping Cradle'],
          '4-Star': ['Anby Demara', 'Anton Ivanov', 'Ben Bigger', 'Corin Wickes', 'Luciana de Montefio', 'Nicole Demara', 'Pan Yinhu', 'Pulchra Fellini', 'Seth Lowell', 'Soukaku', 'Bashful Demon', 'Big Cylinder', 'Box Cutter', 'Bunny Band', 'Demara Battery Mark II', 'Drill Rig - Red Axis', 'Housekeeper', 'Kaboom the Cannon', 'Original Transmorpher', 'Peacekeeper - Specialized', 'Precious Fossilized Core', 'Puzzle Sphere', 'Rainforest Gourmet', 'Roaring Ride', 'Slice of Time', 'Starlight Engine Replica', 'Starlight Engine', 'Steam Oven', 'Street Superstar', 'The Vault', 'Tremor Trigram Vessel', 'Weeping Gemini'],
          '3-Star': ['Base', 'Inflection', 'Decrescent', 'Noviluna', 'Pleniluna', 'Alpha', 'Bravo', 'Charlie', 'Mark I', 'Mark II', 'Mark III', 'Arrow', 'Hatchet', 'Revolver', 'Cobalt'],
        },
      },
      Bangboo: {
        name: 'An Outstanding Partner',
        type: 'guaranteed',
        costPerPullGBP: 2.30,
        currencyPerPull: 160,
        rates: {
          '5-Star': 0.01,
          '4-Star': 0.15,
          '3-Star': 0.84,
        },
        pity: {
          '5-Star': 80,
          '4-Star': 10,
        },
        softPity: {
          enabled: false,
          start: 0,
          maxRate: 0,
        },
        featured: {
          '5-Star': [], 
          '4-Star': ['Rocketboo'], 
        },
        pool: {
          '5-Star': [
            'Agent Gulliver', 'Amillion', 'Bangvolver', 'Belion', 'Butler',
            'Officer Cui', 'Plugboo', 'Red Moccus', 'Resonaboo', 'Robin',
            'Rocketboo', 'Safety', 'Sharkboo', 'Snap'
          ],
          '4-Star': [
            'Avocaboo', 'Baddieboo', 'Bagboo', 'Boollseye', 'Cryboo',
            'Devilboo', 'Electroboo', 'Exploreboo', 'Magnetiboo', 'Paperboo',
            'Penguinboo', 'Sumoboo'
          ],
          '3-Star': [
            'Base', 'Inflection', 'Decrescent', 'Noviluna', 'Pleniluna',
            'Alpha', 'Bravo', 'Charlie', 'Mark I', 'Mark II', 'Mark III',
            'Arrow', 'Hatchet', 'Revolver', 'Cobalt'
          ],
        },
        '5-Star-Meta': {
          bangboos: [
            'Agent Gulliver', 'Amillion', 'Bangvolver', 'Belion', 'Butler',
            'Officer Cui', 'Plugboo', 'Red Moccus', 'Resonaboo', 'Robin',
            'Rocketboo', 'Safety', 'Sharkboo', 'Snap'
          ],
        },
      },
    },
  },
  Custom: {
    name: 'Custom Game',
  icon: '/icons/custom.jpg',
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

