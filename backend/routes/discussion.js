const express = require('express');
const debatesController = require('../controllers/debatesController');
const router = express.Router();

router.get('/:id', debatesController.getAllDisscusions);
router.post('/', debatesController.createDebate);
router.get('/:id', debatesController.getDebateById);
router.post('/:id/posts', debatesController.addPostToDebate);

module.exports = router;
