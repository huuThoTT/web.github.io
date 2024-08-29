const Article = require('../models/Article_model');
const User = require('../models/User_model');
const mongoose = require('mongoose');

const articleController = {

 
  getAll: async (req, res) => {
    try {
      // Tìm tất cả các bài viết có trạng thái 'approved' và populate category và tags để thay thế ObjectId bằng name
      const articles = await Article.find({ status: 'approved' })
      res.json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  
    getAllPending: async (req, res) => {
      try {
        const articles = await Article.find({ status: 'pending' })
        res.json(articles);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
   updateArticleStatus :async (req, res) => {
      try {
        const { id } = req.params;  // Lấy ID bài viết từ params
        const { status } = req.body; // Lấy trạng thái mới từ body
    
        // Kiểm tra nếu thiếu thông tin cần thiết
        if (!status) {
          return res.status(400).json({ message: 'Thiếu thông tin status' });
        }
    
        // Tìm bài viết theo ID
        const article = await Article.findById(id);
    
        if (!article) {
          return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }
    
        // Cập nhật trạng thái của bài viết
        article.status = status;
        await article.save();
    
        return res.status(200).json({
          message: 'Cập nhật trạng thái bài viết thành công',
          article
        });
      } catch (error) {
  
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái bài viết' });
      }
    },
    update: async (req, res) => {
      try {
        const { _id, category: categoryName, tags: tagNames, userId, ...articleData } = req.body;
        console.log(req.body);
          articleData.category = categoryName;
        
        articleData.tags = tagNames;
  
        let article;
        if (_id) {
          // Nếu có ID trong request body, tìm và cập nhật article
          article = await Article.findById(_id);
          if (article) {
            Object.assign(article, articleData);
          } else {
            return res.status(404).json({ error: 'Article not found' });
          }
        } else {
          // Nếu không có ID, tạo mới article
          article = new Article(articleData);
        }
  
        // Lưu hoặc cập nhật article
        await article.save();
  
        // Cập nhật bookmarkedArticles cho User nếu có userId
        if (userId) {
          const user = await User.findById(userId);
          if (user) {
            // Kiểm tra xem bài viết đã được bookmark chưa
            if (!user.bookmarkedArticles.includes(article._id)) {
              user.bookmarkedArticles.push(article._id);
              await user.save();
            }
          } else {
            return res.status(404).json({ error: 'User not found' });
          }
        }
  
        res.json(article);
      } catch (err) {
    
        res.status(500).json({ error: err.message });
      }
    },
  
    delete: async (req, res) => {
      try {
        // Tìm bài viết bằng ID
        const article = await Article.findById(req.params.id);
        if (!article) {
          return res.status(404).json({ message: 'Article not found' });
        }
    
        // Xóa bài viết
        await Article.findByIdAndDelete(req.params.id);
    
        // Xóa bài viết khỏi danh sách bookmarkedArticles của tất cả người dùng
        await User.updateMany(
          { bookmarkedArticles: article._id },
          { $pull: { bookmarkedArticles: article._id } }
        );
    
        res.json({ message: 'Article deleted and removed from all user bookmarks' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    },
    
    
   getBookMaked : async (req, res) => {
      const userId = req.params.id;
      try {
        const user = await User.findById(userId).populate('bookmarkedArticles');
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });

        }
    
        res.status(200).json(user.bookmarkedArticles);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    },

 markArticlesAsRead :async (req, res) => {
      try {
        const { articleIds } = req.body; // Một mảng chứa các ID của bài viết cần cập nhật
    trong đây có những tính năng gì, tiếng việt

        // Kiểm tra xem articleIds có phải là mảng hợp lệ không
        if (!Array.isArray(articleIds) || articleIds.length === 0) {
          return res.status(400).json({ message: 'Invalid article IDs.' });
        }
    
        // Kiểm tra tất cả articleIds có hợp lệ không
        const invalidIds = articleIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
        if (invalidIds.length > 0) {
          return res.status(400).json({ message: 'Invalid ObjectId(s) in article IDs.' });
        }
    
        // Cập nhật trạng thái isRead của các bài viết
        const result = await Article.updateMany(
          { _id: { $in: articleIds } },
          { $set: { isRead: true } }
        );
    
        res.status(200).json({ message: 'Articles updated successfully.', result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
    }
}
module.exports = articleController;
