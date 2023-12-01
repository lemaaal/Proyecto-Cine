const express = require('express');
const userListsController = require('../controllers/userListsController');
const router = express.Router();

router.get('/:userId/movies', userListsController.getUserMovies);
router.get('/:userId/series', userListsController.getUserSeries);
router.post('/:userId/movies', userListsController.addMovieToUserList);
router.post('/:userId/series', userListsController.addSeriesToUserList);

module.exports = router;
