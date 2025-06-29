interface Props {
  selectedBanner: string;
  currency: string;
  bannerKeys: string[];
  supportedCurrencies: string[];
  currencySymbols: Record<string, string>;
  gameBanners: Record<string, any>;
  onChangeBanner: (val: string) => void;
  onChangeCurrency: (val: string) => void;
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
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md grid sm:grid-cols-2 gap-3 p-5 border border-gray-200">
      <div>
        <label className="block text-sm font-medium mb-1">Banner</label>
        <select
          value={selectedBanner}
          onChange={e => onChangeBanner(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        >
          {bannerKeys.map(k => (
            <option key={k} value={k}>{gameBanners[k].name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Currency</label>
        <select
          value={currency}
          onChange={e => onChangeCurrency(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        >
          {supportedCurrencies.map(c => (
            <option key={c} value={c}>{currencySymbols[c]} {c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
