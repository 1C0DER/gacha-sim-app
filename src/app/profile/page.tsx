'use client';

import { useEffect, useState } from 'react';
import { getOrCreateUserId } from '@/lib/getOrCreateUserId';
import SessionModal from '@/app/components/SessionModal';

interface Pull {
  name: string;
  rarity: '5-Star' | '4-Star' | '3-Star';
}

interface SessionEntry {
  _id: string;
  game: string;
  banner: string;
  bannerType: string;
  createdAt: string;
  stats: {
    currency: string;
    moneyDisp: string;
    totalPulls: number;
    totalFiveStars: number;
    avgPullsPerFive: string;
    expectedFiveStars: number;
    luckMessage: string;
  };
  pulls: Pull[];
}

export default function ProfilePage() {
  const [userId, setUserId] = useState('');
  const [sessions, setSessions] = useState<SessionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<SessionEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const id = getOrCreateUserId();
    setUserId(id);

    fetch(`/api/getSessions?userId=${id}`)
      .then(res => res.json())
      .then(data => {
        setSessions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load sessions:', err);
        setLoading(false);
      });
  }, []);

  const handleDeleteSession = async (sessionId: string) => {
    const confirmed = confirm('Are you sure you want to delete this session?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/deleteSession?id=${sessionId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Failed to delete session: ${err.error}`);
        return;
      }

      setSessions(prev => prev.filter(s => s._id !== sessionId));
      setIsModalOpen(false);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Something went wrong deleting this session.');
    }
  };

  return (
    <main
      className="relative min-h-screen text-black overflow-y-auto"
      style={{
        backgroundImage: "url('/back1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">👤 Your Profile</h1>
        <p className="text-sm mb-4 text-gray-600">
          Anonymous ID:{' '}
          <code className="text-xs bg-gray-100 px-2 py-1 rounded break-all">{userId}</code>
        </p>

        {loading ? (
          <p>Loading your sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="text-gray-500">No saved sessions yet. Go pull something first!</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-3 text-purple-600">📚 Your Sessions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sessions.map((s, index) => (
                <button
                  key={s._id}
                  className="bg-white/70 border border-gray-300 hover:border-purple-400 shadow-md rounded-xl p-6 flex items-center justify-center text-xl font-bold transition text-purple-700 backdrop-blur-sm"
                  onClick={() => {
                    setSelectedSession(s);
                    setIsModalOpen(true);
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}

        <SessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          session={selectedSession}
          onDelete={selectedSession ? () => handleDeleteSession(selectedSession._id) : undefined}
        />
      </div>
    </main>
  );
}
