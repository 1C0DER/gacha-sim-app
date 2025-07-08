import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== 'DELETE') {
return res.status(405).json({ error: 'Method not allowed' });
}

const { id } = req.query;

if (!id || typeof id !== 'string') {
return res.status(400).json({ error: 'Missing or invalid session ID' });
}

try {
const client = await clientPromise;
const db = client.db('gachaSim');
const result = await db.collection('sessions').deleteOne({ _id: new ObjectId(id) });

if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Session not found' });
}

res.status(200).json({ success: true });
} catch (err) {
console.error('[DELETE_SESSION_ERROR]', err);
res.status(500).json({ error: 'Failed to delete session' });
}
}
