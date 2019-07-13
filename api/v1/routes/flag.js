const express = require('express');
const jwt = require('../controllers/auth');
const router = express.Router();
const FlagController = require('../controllers/flagController');

router.post('/flag/create',jwt, FlagController.create);
// router.get('/', FlagController.login);

module.exports = router;