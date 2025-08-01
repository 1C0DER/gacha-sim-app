'use client';

import { GameKey } from '@/lib/gachaData';
import { useGachaSimulator } from '@/lib/useGachaSimulator';
import CustomPullInput from './CustomPullInput';
import GameSelector from './GameSelector';
import StatsDashboard from './StatsDashboard';
import SummaryBox from './SummaryBox';
import HeaderSection from './HeaderSection';
import BannerCurrencySelect from './BannerCurrencySelect';
import CustomizeFeaturedItems from './CustomizeFeaturedItems';
import PullButtons from './PullButtons';
import SessionOverview from './SessionOverview';
import { useCollectionTracker } from '@/lib/useCollectionTracker';
import CollectionTracker from './CollectionTracker';
import { getTheme } from '@/lib/themeConfig';

interface Props {
  gameKey: GameKey;
}

export default function SimPage({ gameKey }: Props) {
  const sim = useGachaSimulator(gameKey);
  const collection = useCollectionTracker(sim.history, gameKey);
  const theme = getTheme(gameKey);

  return (
    <main
      className="min-h-screen w-full flex overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${theme.background})`,
        color: theme.textColor,
      }}
    >
    <div className="absolute inset-0" style={{ backgroundColor: theme.overlay }} />
      {/* Sidebar */}
      <aside className="w-24 sm:w-28 md:w-36 lg:w-35 h-screen sticky top-0 overflow-y-auto border-r border-gray-200 bg-white py-6 px-3 shadow-md z-10">
        <GameSelector />
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen px-4 py-8 relative z-10">
        <div className="max-w-[90%] mx-auto space-y-4">
          <section className="space-y-5">
            <HeaderSection
              gameKey={gameKey}
              gameName={sim.game.name}
              bannerName={sim.banner.name}
              bannerType={sim.banner.type}
              rates={sim.banner.rates}
              pity={sim.banner.pity}
              softPity={sim.banner.softPity}
              history={sim.history}
            />

            <BannerCurrencySelect
              selectedBanner={sim.selectedBanner}
              currency={sim.currency}
              bannerKeys={sim.bannerKeys}
              supportedCurrencies={sim.supportedCurrencies}
              currencySymbols={sim.currencySymbols}
              gameBanners={sim.game.banners}
              onChangeBanner={sim.onChangeBanner}
              onChangeCurrency={sim.onChangeCurrency}
              gameKey={gameKey}
            />

            {(sim.banner.type === 'chronicle' ||
              (sim.banner.type === 'weapon' && gameKey === 'Genshin') ||
              sim.banner.type === 'guaranteed') && (
              <CustomizeFeaturedItems
                bannerType={sim.banner.type}
                selectedCharacters={sim.selectedCharacters}
                selectedWeapons={sim.selectedWeapons}
                allCharacters={sim.allCharacters}
                allWeapons={sim.allWeapons}
                allBangboos={
                  sim.banner.type === 'guaranteed'
                    ? sim.banner.pool['5-Star']
                    : []
                }
                designatedItem={sim.designatedItem}
                pathPoints={sim.pathPoints}
                charToAdd={sim.charToAdd}
                weaponToAdd={sim.weaponToAdd}
                setCharToAdd={sim.setCharToAdd}
                setWeaponToAdd={sim.setWeaponToAdd}
                handleAdd={sim.handleAdd}
                handleRemove={sim.handleRemove}
                handleDesignatedSelect={sim.setDesignatedItem}
                featured5Stars={sim.getFeatured5Stars()}
              />
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex gap-9">
                <PullButtons
                  onOnePull={sim.onOnePull}
                  onTenPull={sim.onTenPull}
                  gameKey={gameKey}
                />
                <CustomPullInput
                  onCustomPull={(count) => {
                    for (let i = 0; i < count; i++) sim.onOnePull();
                  }}
                />
              </div>
              <div className="w-full md:max-w-xs">
                <SessionOverview
                  moneyDisp={sim.moneyDisp}
                  symbol={sim.symbol}
                  pity5={sim.pity5}
                  pity4={sim.pity4}
                  pityMax5={sim.banner.pity['5-Star']}
                  pityMax4={sim.banner.pity['4-Star']}
                  onClear={() => sim.onChangeBanner(sim.selectedBanner)}
                  onExport={sim.onExport}
                  gameKey={gameKey} 
                />
              </div>
            </div>
          <SummaryBox
            totalPulls={sim.totalPulls}
            totalFiveStars={sim.totalFiveStars}
            avgPullsPerFive={sim.avgPullsPerFive}
            lastFiveStarAt={sim.lastFiveStarAt}
            expectedFiveStars={sim.expectedFiveStars}
            luckMessage={sim.luckMessage}
            currency={sim.currency}
            moneyDisp={sim.moneyDisp}
            gameKey={gameKey}   // 👈 Add this
          />
          </section>

          <section>
            <CollectionTracker collection={collection} gameKey={gameKey} />
          </section>

          <section className="space-y-3">
            <h2 className={`text-lg font-bold text-white ${theme.headingText}`}>
              📊 Simulation Analytics
            </h2>
            <StatsDashboard
              history={sim.history}
              banner={sim.banner}
              gameKey={gameKey}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
