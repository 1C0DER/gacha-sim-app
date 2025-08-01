"use client";

import GameSelectorHorizontal from './components/GameSelectorHorizontal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
      style={{
        backgroundImage: "url('/back1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Blur (behind everything except profile) */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md z-0"></div>

      {/* Profile Button */}
      <button
        onClick={() => router.push('/profile')}
        className="absolute top-6 right-6 w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-gray-300 hover:scale-105 transition z-20"
        title="Profile"
      >
        <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          🎲 Gacha Simulator Hub
        </h1>
        <GameSelectorHorizontal />
      </div>
    </main>
  );
}
