
const express = require('express');

const router = express.Router();
const AuthenticationController = require('../controllers/aunthenticationController');

router.post('/signup', AuthenticationController.register);
router.get('/login', AuthenticationController.login);

module.exports = router;