const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

// Rutas para el perfil de usuario
router.get('/:userId', profileController.getUserProfile);
router.put('/:userId', profileController.updateUserProfile);
router.put('/:userId/password', profileController.changeUserPassword);
router.delete('/:userId', profileController.deleteUserProfile);

module.exports = router;
