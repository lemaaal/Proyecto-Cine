const express = require('express');
const discussionPostsController = require('../controllers/discussionPostsController');
const router = express.Router();

router.post('/discussion/:discussionId/posts', discussionPostsController.creatediscussionPost);
router.delete('/discussion/:discussionId/posts/:postId', discussionPostsController.deletediscussionPost);

module.exports = router;
