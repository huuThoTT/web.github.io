const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookmarkSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('bookmark', bookmarkSchema);
  
