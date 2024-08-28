const Article = require('../models/Article_model');
const Category = require('../models/Category_model');
const Tag = require('../models/Tag_model');

const articleController = {

  getAll: async (req, res) => {
    try {
  
      const articles = await Article.find({ status: 'approved' })
        .populate('category', 'name') // Lấy tên của category
        .populate('tags', 'name'); // Lấy tên của tags
  
      res.json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  

  update: async (req, res) => {
    try {
      let article;

      // Nếu có ID trong request body
      if (req.body._id) {
        article = await Article.findById(req.body._id);
      }

      if (!article) {
        // Nếu không có ID hoặc không tìm thấy article, tạo mới
        article = new Article(req.body);
      } else {
        // Nếu có ID và tìm thấy article, cập nhật article
        Object.assign(article, req.body);
      }

      // Lưu article
      await article.save();

      res.json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);

      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      if (!req.user.isAdmin && String(article.author) !== String(req.user.id)) {
        return res.status(403).json({ message: 'You are not authorized to delete this article' });
      }

      if (article.status !== 'approved') {
        return res.status(403).json({ message: 'Article cannot be deleted unless it is approved' });
      }

      await Article.findByIdAndDelete(req.params.id);
      res.json({ message: 'Article deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
}

module.exports = articleController;
