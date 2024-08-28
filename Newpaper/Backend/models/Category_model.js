const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
  }, { timestamps: true });
  
  module.exports = mongoose.model('categories', categorySchema);
  