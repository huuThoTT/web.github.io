const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tags = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Tags', tagsSchema);
  