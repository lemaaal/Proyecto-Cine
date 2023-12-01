const express = require('express');
const followersController = require('../controllers/followersController');
const router = express.Router();

router.post('/follow', followersController.followUser);
router.delete('/unfollow', followersController.unfollowUser);
router.get('/followers/:userId', followersController.getUserFollowers);
router.get('/following/:userId', followersController.getUserFollowing);

module.exports = router;
