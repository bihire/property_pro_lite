const jwt = require('../controllers/auth');
const express = require('express');

const router = express.Router();
const AuthenticationController = require('../controllers/aunthenticationController');

router.post('/auth/signup',  AuthenticationController.register);
router.post('/auth/signin', AuthenticationController.login);

module.exports = router;