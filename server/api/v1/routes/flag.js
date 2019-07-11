const express = require('express');

const router = express.Router();
const FlagController = require('../controllers/flagController');

router.post('/flag/create', FlagController.create);
// router.get('/', FlagController.login);

module.exports = router;