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
    category: { type: String},
    tags: [{ type: String }] ,
    Comment: [{ type: Schema.Types.ObjectId, ref: 'comments' }] ,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    publish: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
    views: { type: Number, default: 0 }, 
    totalRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 }, 
},  { timestamps: true });

module.exports = mongoose.model('articles', articleSchema);
