const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');
router.get('/', appController.indexPage);
router.get('/tweet/:id', tweetController.singleTweetPage);
router.post('/api/tweets/:id/heart', userController.heartTweet)
router.get('/register', userController.registerPage);
router.post('/register',userController.verifyRegister,userController.checkUserExists,userController.registerUser,authController.login)
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/account',authController.isLoggedIn,userController.accountPage);
router.post('/account',userController.upload,userController.resize,userController.accountUpdate);
router.post('/upload',userController.upload,userController.resize,userController.accountUpdate);
router.post('/tweet', tweetController.postTweet);
router.get('/edit/:id', tweetController.patchTweet);
router.get('/delete/:id',authController.isLoggedIn,tweetController.deleteTweet);
router.get('/search', userController.searchTweets);
router.get('/:username', userController.profilePage);
module.exports = router;
