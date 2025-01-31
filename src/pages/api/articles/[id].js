import ArticleMongo from '../../../models/Article';
import dbConnect from '../../../lib/db';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'PUT':
            try {
                const updatedArticle = await ArticleMongo.findByIdAndUpdate(id, req.body, { new: true });
                if (!updatedArticle) {
                    return res.status(404).json({ success: false, error: 'Article not found' });
                }
                res.status(200).json(updatedArticle);
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'DELETE':
            try {
                const deletedArticle = await ArticleMongo.findByIdAndDelete(id);
                if (!deletedArticle) {
                    return res.status(404).json({ success: false, error: 'Article not found' });
                }
                res.status(200).json({ success: true, message: 'Article deleted' });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}