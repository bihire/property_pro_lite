const express = require('express');
const jwt = require('../controllers/auth');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');

router.post('/property',jwt, PropertyController.add);
router.patch('/property/:property_id',jwt, PropertyController.update);
router.patch('/property/:property_id/sold',jwt, PropertyController.update);
router.get('/property/:property_id', PropertyController.get);
router.get('/property/all', PropertyController.get_all);
router.get('/property/user/:owner', PropertyController.get_by_user);
router.get('/property/user/all',jwt, PropertyController.get_self);
router.delete('/property/:property-id',jwt, PropertyController.delete);

module.exports = router;
