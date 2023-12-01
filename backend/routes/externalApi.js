const express = require('express');
const { getMoviesFromExternalApi } = require('../controllers/externalApiController');
const router = express.Router();

router.get('/movies', getMoviesFromExternalApi);

module.exports = router;
