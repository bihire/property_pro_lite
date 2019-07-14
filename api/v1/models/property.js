 const joi = require('joi');
 
 const schema = joi.object().keys({
   owner: joi.number().integer().required(),
   ownerEmail: joi.string().email().trim().required(),
   ownerPhoneNumber: joi.string().regex(new RegExp('^[1-9]{10}$')).trim().required(),
   property_id: joi.number().integer().required(),
   address: joi.string().trim().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
   status: joi.string().default('onsale').valid('available', 'sold').required(),
   type: joi.string().allow('').trim().required(),
   price: joi.number().min(0).required(),
   state: joi.string().trim().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
   city: joi.string().trim().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
   created_on: joi.string().required(),
   image_url: joi.string().uri().required()
 });
 

 module.exports = { schema };