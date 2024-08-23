const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tags = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  }, { timestamps: true });
  
  module.exports = mongoose.model('Tags', tagsSchema);
  