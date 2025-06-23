import GameSelector from './components/GameSelector';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-black mb-6">🎲 Gacha Simulator Hub</h1>
      <GameSelector />
    </main>
  );
}
