'use client';

import { GameKey } from '@/lib/gachaData';
import { useGachaSimulator } from '@/lib/useGachaSimulator';

import GameSelector from './GameSelector';
import StatsDashboard from './StatsDashboard';
import SummaryBox from './SummaryBox';
import HeaderSection from './HeaderSection';
import BannerCurrencySelect from './BannerCurrencySelect';
import CustomizeFeaturedItems from './CustomizeFeaturedItems';
import PullButtons from './PullButtons';
import SessionOverview from './SessionOverview';
import PullHistory from './PullHistory';

interface Props {
  gameKey: GameKey;
}

export default function SimPage({ gameKey }: Props) {
  const sim = useGachaSimulator(gameKey);

  return (
    <main className="min-h-screen bg-gray-100 text-black py-8 px-4">
      <div className="max-w-screen-xl mx-auto mb-8">
        <GameSelector />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-6 max-w-screen-xl mx-auto">
        <aside className="space-y-5">
          <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
            <StatsDashboard
              history={sim.history}
              banner={sim.banner}
              gameKey={gameKey}
            />
          </div>
        </aside>

        <section className="space-y-5">
          <HeaderSection
            gameName={sim.game.name}
            bannerName={sim.banner.name}
            bannerType={sim.banner.type}
            rates={sim.banner.rates}
            pity={sim.banner.pity}
            softPity={sim.banner.softPity}
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
          />

          {(sim.banner.type === 'chronicle' || sim.banner.type === 'weapon') && (
            <CustomizeFeaturedItems
              bannerType={sim.banner.type}
              selectedCharacters={sim.selectedCharacters}
              selectedWeapons={sim.selectedWeapons}
              allCharacters={sim.allCharacters}
              allWeapons={sim.allWeapons}
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

          <PullButtons
            onOnePull={sim.onOnePull}
            onTenPull={sim.onTenPull}
          />

          <SessionOverview
            moneyDisp={sim.moneyDisp}
            symbol={sim.symbol}
            pity5={sim.pity5}
            pity4={sim.pity4}
            pityMax5={sim.banner.pity['5-Star']}
            pityMax4={sim.banner.pity['4-Star']}
            onClear={() => sim.onChangeBanner(sim.selectedBanner)}
            onExport={sim.onExport}
          />

          <SummaryBox
            totalPulls={sim.totalPulls}
            totalFiveStars={sim.totalFiveStars}
            avgPullsPerFive={sim.avgPullsPerFive}
            lastFiveStarAt={sim.lastFiveStarAt}
            expectedFiveStars={sim.expectedFiveStars}
            luckMessage={sim.luckMessage}
            currency={sim.currency}
            moneyDisp={sim.moneyDisp}
          />

          <PullHistory history={sim.history} />
        </section>
      </div>
    </main>
  );
}
