const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const router = express.Router();

// Rutas para las reseñas
router.post('/', reviewsController.postReview);
router.get('/:id', reviewsController.getReview);
// router.get('/', reviewsController.getAllReview);
// router.put('/:id', reviewsController.updateReview);
// router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
