import { getTheme } from '@/lib/themeConfig';

interface Props {
  selectedBanner: string;
  currency: string;
  bannerKeys: string[];
  supportedCurrencies: string[];
  currencySymbols: Record<string, string>;
  gameBanners: Record<string, any>;
  onChangeBanner: (val: string) => void;
  onChangeCurrency: (val: string) => void;
  gameKey?: string;
}

export default function BannerCurrencySelect({
  selectedBanner,
  currency,
  bannerKeys,
  supportedCurrencies,
  currencySymbols,
  gameBanners,
  onChangeBanner,
  onChangeCurrency,
  gameKey = 'Default',
}: Props) {
  const theme = getTheme(gameKey);

  return (
    <div className={`${theme.panelBg} ${theme.borderGold} rounded-2xl shadow-lg grid sm:grid-cols-2 gap-3 p-5 border border-white/30`}>
      <div>
        <label className={`block text-sm font-medium mb-1 ${theme.headingText}`}>Banner</label>
        <select
          value={selectedBanner}
          onChange={e => onChangeBanner(e.target.value)}
          className={`w-full p-2 rounded border ${theme.headingText} border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400`}>
          {bannerKeys.map(k => (
            <option key={k} value={k}>
              {gameBanners[k].name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${theme.headingText}`}>Currency</label>
        <select
          value={currency}
          onChange={e => onChangeCurrency(e.target.value)}
          className={`w-full p-2 rounded border ${theme.headingText} border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400`}>
          {supportedCurrencies.map(c => (
            <option key={c} value={c}>
              {currencySymbols[c]} {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
