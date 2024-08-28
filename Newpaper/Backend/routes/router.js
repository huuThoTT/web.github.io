const express = require('express');
const router = express.Router();
const userController = require('../controllers/User_controller');
const articleController = require('../controllers/Article_controller');
const categoryController = require('../controllers/Category_controller');
const commentController = require('../controllers/Comment_controller');
const notificationController = require('../controllers/Notification_controller');
const tagController = require('../controllers/Tag_controller')
const { verifyToken,  verifyTokenAndUserAuthorization, verifyTokenAndAdmin,} = require("../middleware/userVerifyToken");
//Auth
router.post('/auth/register', userController.register);
router.post("/auth/logout", verifyToken, userController.logOut);
router.post('/auth/login', userController.login);

//REFRESH TOKEN
router.post("/auth/refresh", userController.requestRefreshToken);

// User routes
router.get('/user', userController.getAll);
router.post('/user/updateUser', userController.updateOrCreate);
router.delete('/user/:id',userController.delete)

// Article routes
router.get('/article/getArticle', articleController.getAll);
router.post('/article/updateArticle',articleController.update);
router.delete('/article/:id',articleController.delete);
// router.get('/article/getArticlePending', articleController.getAll);
// router.post('/article/updateArticlePending',articleController.update);

// Category routes
router.get('/category/getCategory', categoryController.getAll);
router.post('/category/updateCategory', categoryController.updateOrCreate);
router.delete('/category/:id', categoryController.delete);

// Tags
router.get('/tag/getTag', tagController.getAll);
router.post('/tag/updateTag', tagController.updateOrCreate);
router.delete('/tag/:id', tagController.delete);

// // Comment routes
// router.get('/commnet/getComment', commentController.getAll);
// router.post('/comment/updateComment', commentController.update);
// router.delete('/comment/:id', commentController.delete);

// Rating routes
// router.get('/rating/getRating', commentController.getAll);
// router.post('/rating/updateRating', commentController.update);


// Advertisement routes
router.post('/advertisements', verifyToken, authorize(['admin']), advertisementController.create);
router.get('/advertisements', verifyToken, authorize(['guest', 'user', 'editor', 'admin']), advertisementController.getAll);
router.get('/advertisements/:id', verifyToken, authorize(['guest', 'user', 'editor', 'admin']), advertisementController.getById);
router.put('/advertisements/:id', verifyToken, authorize(['admin', 'editor']), advertisementController.update);
router.delete('/advertisements/:id', verifyToken, authorize(['admin']), advertisementController.delete);
router.patch('/advertisements/:id/toggle', verifyToken, authorize(['admin']), advertisementController.toggle);


module.exports = router;
