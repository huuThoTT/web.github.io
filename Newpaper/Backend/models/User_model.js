const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'user', 'editor', 'admin'], default: 'user' }, // Thêm thuộc tính role
  socialAccounts: {
    facebook: { type: String },
    google: { type: String },
    phoneNumber: { type: String }
  },
  preferences: {
    categories: [
      {
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        tags: [String]
      }
    ]
  },
  Subscribe: { type: Boolean, default :false },
  notificationsEnabled: { type: Boolean, default: true },
  bookmarkedArticles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  adFreeSubscription: { type: Boolean, default: false },
}, { timestamps: true });

// Middleware to update updatedAt before save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
