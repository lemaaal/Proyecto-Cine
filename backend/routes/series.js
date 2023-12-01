const express = require('express');
const seriesController = require('../controllers/seriesController');
const router = express.Router();

// Rutas para las series
router.get('/', seriesController.getAllSeries);
router.post('/', seriesController.addSeries);
router.get('/:id', seriesController.getSeriesById);
router.put('/:id', seriesController.updateSeries);
router.delete('/:id', seriesController.deleteSeries);

module.exports = router;
