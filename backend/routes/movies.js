const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();

// Rutas para las películas
router.get('/', moviesController.getAllMovies);
router.get('/search', moviesController.getMovieByQuery);
router.get('/:id', moviesController.getMovieById);

module.exports = router;
