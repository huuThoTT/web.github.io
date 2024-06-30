const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    listIdArticle:[{ type: Schema.Types.ObjectId }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Category', categorySchema);
  