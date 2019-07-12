 const joi = require('joi');
 
 const schema = joi.object().keys({
   owner: joi.number().integer().required(),
   OwnerEmail: joi.string().email().trim().required(),
   OwnerPhoneNumber: joi.string().regex(new RegExp('^[1-9]{10}$')).trim().required(),
   property_id: joi.number().integer().required(),
   address: joi.string().trim().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
   status: joi.boolean().default('onsale').required(),
   type: joi.string().trim().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
   price: joi.number().min(0).required(),
   state: joi.string().trim().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
   city: joi.string().trim().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).required(),
   created_on: joi.string().required()
 });
 

 module.exports = { schema };