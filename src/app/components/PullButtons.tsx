interface Props {
  onOnePull: () => void;
  onTenPull: () => void;
}

export default function PullButtons({ onOnePull, onTenPull }: Props) {
  return (
    <div className="flex justify-center gap-3">
      <button onClick={onOnePull} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition">
        One Pull
      </button>
      <button onClick={onTenPull} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition">
        Ten Pulls
      </button>
    </div>
  );
}
