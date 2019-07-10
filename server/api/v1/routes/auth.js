// import auth from '../controllers/auth';

const express = require('express');

const router = express.Router();
const AuthenticationController = require('../controllers/aunthenticationController');

router.post('/register', AuthenticationController.register);
// router.get('/login', AuthenticationController.login);

module.exports = router;