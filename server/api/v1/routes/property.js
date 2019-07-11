const express = require('express');
const jwt = require('../controllers/auth');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');

router.post('/property/add',jwt, PropertyController.add);
router.post('/property/update',jwt, PropertyController.update);
router.get('/property/:id', PropertyController.get);
router.get('/property', PropertyController.get_all);
router.get('/property/user/:user_id',jwt, PropertyController.get_by_user);
router.delete('/property/del',jwt, PropertyController.delete);

module.exports = router;
