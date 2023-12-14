const express = require('express');
const discussionController = require('../controllers/discussionController');
const router = express.Router();

// Obtener info debates
router.get('/', discussionController.getAllDiscussions);
router.get('/:movieId', discussionController.getDiscussionsByMovieId);
router.get('/:movieId/:discussionId', discussionController.getDiscussionsById);
router.get('/:movieId/:discussionId', discussionController.getAllDiscussionsPost);
router.get('/:movieId/:discussionId/:postId', discussionController.getDiscussionsByPostId);

// Crear debate
router.post('/:movieId', discussionController.createDiscussions);
router.delete('/:movieId/:discussionId', discussionController.deleteDiscussions);
router.put('/:movieId/:discussionId', discussionController.updateDiscussions);

// Crear post en debate
router.post('/:movieId/:discussionId/', discussionController.createDiscussionsPost);
router.delete('/:movieId/:discussionId/:postId', discussionController.deleteDiscussionsPost);
router.put('/:movieId/:discussionId/:postId', discussionController.updateDiscussionsPost);

module.exports = router;
