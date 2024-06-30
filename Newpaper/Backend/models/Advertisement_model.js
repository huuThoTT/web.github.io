const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertisementSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true // Quảng cáo sẽ mặc định là hoạt động khi mới được tạo
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
