const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    content_blocks: [
        {
            type: { type: String, enum: ['paragraph', 'image','quote'], required: true },
            content: { type: String },
            src: { type: String },
            alt: { type: String }
        }
    ],
    author: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, 
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }] ,
    Comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] ,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    Publish: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
    views: { type: Number, default: 0 }, 
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 }, 
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
