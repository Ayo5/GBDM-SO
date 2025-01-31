import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    content: String,
    image: String,
    imageAlt: String,
    width: Number,
    height: Number,
});

const ArticleMongo = mongoose.models.articles || mongoose.model('articles', articleSchema);

export default ArticleMongo;