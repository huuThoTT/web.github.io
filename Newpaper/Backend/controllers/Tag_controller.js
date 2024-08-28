const Tag = require('../models/Tag_model');
const Category = require('../models/Category_model')
const tagController = {

  getAll: async (req, res) => {
    try {
      const tags = await Tag.find();
      res.json(tags);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateOrCreate: async (req, res) => {
    try {
      const { _id, name, description, category } = req.body;

      let tag;
      if (_id) {
        // Nếu có ID, tìm kiếm tag trong cơ sở dữ liệu
        tag = await Tag.findById(_id);
      }

      if (tag) {
        // Nếu tìm thấy tag, cập nhật nó
        tag.name = name;
        tag.description = description;
        tag.category = category;
        await tag.save();
      } else {
        // Nếu không tìm thấy tag hoặc không có ID, tạo tag mới
        tag = new Tag({ name, description, category});
        await tag.save();
      }

      // Cập nhật trường tags trong Category
      const categories = await Category.findOne({ name: category});
      if (categories) {
        if (!categories.tags.includes(tag._id)) {
          categories.tags.push(tag._id);
        }
        await categories.save();
      }

      res.json(tag);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const tagId = req.params.id;

      // Xóa tag
      await Tag.findByIdAndDelete(tagId);

      // Loại bỏ ObjectId của tag đó khỏi các category liên quan
      await Category.updateMany(
        { tags: tagId },
        { $pull: { tags: tagId } }
      );

      res.json({ message: 'Tag deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = tagController;
