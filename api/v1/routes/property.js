const express = require('express');
const jwt = require('../controllers/auth');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');

  router.post('/property', jwt, PropertyController.add);
  router.patch('/property/:property_id', jwt, PropertyController.update);
  router.patch('/property/:property_id/sold', jwt, PropertyController.update);
  router.get('/property/:property_id', PropertyController.get);  // Goes here
  router.get('/property/user/:owner', PropertyController.get_by_user);
  router.get('/property/allproperties/g', PropertyController.get_self);

  router.delete('/property/:property_id', jwt, PropertyController.delete);
  
  router.get('/properti/bro', PropertyController.getAllProperties);   // Here when i change the path to '/property/something' it goes to router.get('/property/:property_id', PropertyController.get) callbacks

  module.exports = router;