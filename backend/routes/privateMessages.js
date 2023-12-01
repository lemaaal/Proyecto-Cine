const express = require('express');
const privateMessagesController = require('../controllers/privateMessagesController');
const router = express.Router();

// Rutas para los mensajes privados
router.post('/', privateMessagesController.sendMessage);
router.get('/:userId', privateMessagesController.getUserMessages);

module.exports = router;
