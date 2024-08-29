const express = require('express');
const router = express.Router();
const userController = require('../controllers/User_controller');
const articleController = require('../controllers/Article_controller');
const categoryController = require('../controllers/Category_controller');
const commentController = require('../controllers/Comment_controller');
const notificationController = require('../controllers/Notification_controller');
const { verifyToken, authorize, verifyTokenAndUserAuthorization, verifyTokenAndAdmin,} = require("../middleware/userVerifyToken");
// User routes
router.get('/users', verifyToken, userController.getAll);
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.put('/users/:id', verifyTokenAndUserAuthorization, userController.update);
router.delete('/users/:id', verifyTokenAndAdmin, userController.delete);
router.get('/users/:id/preferences', verifyToken, userController.getPreferences);
router.put('/users/:id/preferences', verifyToken, userController.updatePreferences);
router.post('/users/logout', verifyToken, userController.logOut);
router.post('/users/refresh', userController.requestRefreshToken);
//REFRESH TOKEN
router.post("/refresh", userController.requestRefreshToken);

// Article routes
router.post('/articles', verifyTokenAndAdmin, articleController.create);
router.get('/articles', articleController.getAll);
router.get('/articles/:id', verifyToken, articleController.getById);
router.put('/articles/:id', verifyTokenAndUserAuthorization, articleController.update);
router.delete('/articles/:id', verifyTokenAndAdmin, articleController.delete);
router.get('/articles/search', articleController.search);
router.put('/articles/:id/approve', verifyTokenAndAdmin, articleController.approve);
// Category routes
router.post('/categories', verifyTokenAndAdmin, categoryController.create);
router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getById);
router.put('/categories/:id', verifyTokenAndAdmin, categoryController.update);
router.delete('/categories/:id', verifyTokenAndAdmin, categoryController.delete);

// Comment routes
router.post('/articles/:articleId/comments', verifyToken, commentController.add);
router.get('/articles/:articleId/comments', commentController.getByArticle);
router.delete('/comments/:id', verifyTokenAndUserAuthorization, commentController.delete);

// Notification routes
router.get('/notifications', verifyToken, notificationController.getAllByUser);
router.put('/notifications/:id', verifyToken, notificationController.markAsRead);

// Subscription routes
router.post('/subscriptions', verifyToken, subscriptionController.create);
router.get('/subscriptions', verifyToken, subscriptionController.getByUser);
router.delete('/subscriptions/:id', verifyToken, subscriptionController.cancel);

//LOG OUT
router.post("/logout", verifyToken, userController.logOut);

// Advertisement routes
router.post('/advertisements', verifyToken, authorize(['admin']), advertisementController.create);
router.get('/advertisements', verifyToken, authorize(['guest', 'user', 'editor', 'admin']), advertisementController.getAll);
router.get('/advertisements/:id', verifyToken, authorize(['guest', 'user', 'editor', 'admin']), advertisementController.getById);
router.put('/advertisements/:id', verifyToken, authorize(['admin', 'editor']), advertisementController.update);
router.delete('/advertisements/:id', verifyToken, authorize(['admin']), advertisementController.delete);
router.patch('/advertisements/:id/toggle', verifyToken, authorize(['admin']), advertisementController.toggle);


module.exports = router;
