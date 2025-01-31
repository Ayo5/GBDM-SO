import ArticleMongo from '../../models/Article';
import dbConnect from '../../lib/db';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { title, content, image, imageAlt, width, height } = req.body;

        // Validate the request body
        if (!title || !content) {
            return res.status(400).json({ success: false, error: 'Title and content are required' });
        }

        try {
            // Find the highest current id and increment it by 1
            const lastArticle = await ArticleMongo.findOne().sort({ _id: -1 });
            const newId = lastArticle ? lastArticle._id + 1 : 1;

            const article = new ArticleMongo({ _id: newId, title, content, image, imageAlt, width, height });
            await article.save();
            res.status(201).json(article);
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    else if (req.method === 'GET') {
        try {
            const articles = await ArticleMongo.find({});
            res.status(200).json(articles);
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}