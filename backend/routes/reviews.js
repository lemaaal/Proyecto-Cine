const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const router = express.Router();

// Rutas para las reseñas
router.post('/:movieId', reviewsController.postReview);
router.get('/:movieId', reviewsController.getReview);
router.get('/:movieId/:reviewId', reviewsController.getReviewInfo);
router.get('/', reviewsController.getAllMovieReviews);
router.put('/:movieId/:reviewId', reviewsController.updateReview);
router.delete('/:movieId/:reviewId', reviewsController.deleteReview);

module.exports = router;
