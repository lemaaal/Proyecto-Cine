const express = require('express');
const discussionController = require('../controllers/discussionController');
const router = express.Router();

router.get('/', discussionController.getAllDiscussions);
router.post('/', discussionController.createDiscussions);
router.get('/:id', discussionController.getDiscussionsById);
router.post('/:id/posts', discussionController.addPostToDiscussions);

module.exports = router;
