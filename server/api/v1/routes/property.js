const express = require('express');
const jwt = require('../controllers/auth');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');

router.post('/property',jwt, PropertyController.add);
router.patch('/property/:property-id',jwt, PropertyController.update);
router.patch('/property/:property-id/sold',jwt, PropertyController.update);
router.get('/property/:property-id', PropertyController.get);
router.get('/property/all', PropertyController.get_all);
router.get('/property/user/:owner',jwt, PropertyController.get_by_user);
router.delete('/property/:property-id',jwt, PropertyController.delete);

module.exports = router;
