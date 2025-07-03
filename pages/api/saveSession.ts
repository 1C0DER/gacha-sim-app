// /pages/api/saveSession.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const session = req.body;

    if (!session || !session.userId || !session.pulls) {
      return res.status(400).json({ error: 'Missing required session data' });
    }

    const client = await clientPromise;
    const db = client.db('gachaSim');
    const result = await db.collection('sessions').insertOne({
      ...session,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Session saved', id: result.insertedId });
  } catch (err) {
    console.error('[SAVE_SESSION_ERROR]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
