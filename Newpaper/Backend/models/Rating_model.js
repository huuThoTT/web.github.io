const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ratingCount: { type: Number, default: 0 }, 
  }, { timestamps: true });
  
  module.exports = mongoose.model('Rating', ratingSchema);
  