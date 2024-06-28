const express = require('express');
const router = express.Router();
const userController = require('../controllers/User_controller');
const articleController = require('../controllers/Article_controller');
const categoryController = require('../controllers/Category_controller');
const commentController = require('../controllers/Comment_controller');
const notificationController = require('../controllers/Notification_controller');
const subscriptionController = require('../controllers/Subscription_controller');
const { verifyToken,  verifyTokenAndUserAuthorization, verifyTokenAndAdmin,} = require("../middleware/userVerifyToken");
// User routes
router.get('/users/',verifyToken, userController.getAll);
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.put('/users/:id', verifyTokenAndUserAuthorization,userController.update);
router.delete('/users/:id',verifyTokenAndAdmin,userController.delete)
router.get('/users/:id/preferences', verifyToken,userController.getPreferences);
router.put('/users/:id/preferences', verifyToken ,userController.updatePreferences);
//REFRESH TOKEN
router.post("/refresh", userController.requestRefreshToken);

// Article routes
router.post('/articles',verifyToken, articleController.create);
router.get('/articles', articleController.getAll);
router.get('/articles/:id',verifyToken, articleController.getById);
router.put('/articles/:id',verifyToken,articleController.update);
router.delete('/articles/:id',verifyToken,articleController.delete);
router.get('/articles/search', articleController.search);
router.put('/articles/:id/approve',  verifyTokenAndAdmin, articleController.approve);
// Category routes
router.post('/categories', categoryController.create);
router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getById);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

// Comment routes
router.post('/articles/:articleId/comments', commentController.add);
router.get('/articles/:articleId/comments', commentController.getByArticle);
router.delete('/comments/:id', commentController.delete);

// Notification routes
router.get('/notifications', notificationController.getAllByUser);
router.put('/notifications/:id', notificationController.markAsRead);

// Subscription routes
router.post('/subscriptions', subscriptionController.create);
router.get('/subscriptions', subscriptionController.getByUser);
router.delete('/subscriptions', subscriptionController.cancel);

//LOG OUT
router.post("/logout", verifyToken, userController.logOut);

module.exports = router;
