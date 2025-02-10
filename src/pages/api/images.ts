// pages/api/images.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'webp');
        const files = await fs.readdir(uploadsDir);
        const images = files.filter(file => file.endsWith('.webp'));

        return res.status(200).json({ images });
    } catch (error) {
        console.error('Error reading images directory:', error);
        return res.status(500).json({ error: 'Failed to get images' });
    }
}