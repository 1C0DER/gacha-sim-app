import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('gachaSim');

    const sessions = await db
      .collection('sessions')
      .find({ userId })
      .sort({ createdAt: -1 }) 
      .toArray();

    res.status(200).json(sessions);
  } catch (err) {
    console.error('[GET_SESSIONS_ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
}
