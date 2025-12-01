// routes/users.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// l route mtaa l inscription
router.post('/register', authController.register);

// l route mtaa l  Connexion  
router.post('/login', authController.login);

// l route mtaa lprofil user
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;