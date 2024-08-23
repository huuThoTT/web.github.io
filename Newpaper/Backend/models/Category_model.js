const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }] ,
    createdAt: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Category', categorySchema);
  