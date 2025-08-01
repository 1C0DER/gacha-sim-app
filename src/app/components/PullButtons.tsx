interface Props {
  onOnePull: () => void;
  onTenPull: () => void;
  gameKey: string;
}

import { getTheme } from '@/lib/themeConfig';

export default function PullButtons({ onOnePull, onTenPull, gameKey }: Props) {
  const theme = getTheme(gameKey);

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={onOnePull}
        className={`px-5 py-2.5 rounded-md text-sm font-medium transition ${theme.buttonActive}`}>
        One Pull
      </button>
      <button
        onClick={onTenPull}
        className={`px-5 py-2.5 rounded-md text-sm font-medium transition ${theme.buttonInactive}`}>
        Ten Pulls
      </button>
    </div>
  );
}
