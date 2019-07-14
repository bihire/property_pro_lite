const properties = [
  {
    property_id: 1,
    address: 'bro',
    owner: 1,
    status: 'bro',
    price: 2.0847,
    state: 'bro',
    city: 'bro',
    type: 'bro i am',
    created_on: '2018-11-13T20:20:39+00:00',
    image_url: 'https://www.google.be/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    ownerEmail: 'muhireboris@yahoo.fr',
    ownerPhoneNumber: '0798734567'
  },
  {
    property_id: 1,
    address: 'bro',
    owner: 2,
    status: 'bro',
    price: 2.0847,
    state: 'bro',
    city: 'bro',
    type: 'g',
    created_on: '2018-11-13T20:20:39+00:00',
    image_url: 'https://www.google.be/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    ownerEmail: 'muhireboris@yahoo.fr',
    ownerPhoneNumber: '3341234333'
  }
];
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const express = require('express');
const joi = require('joi');
const app = express();
const Validator = require('jsonschema').Validator;
const { schema } = require('../models/property');
const { dateTime } = require('../models/date');

const v = new Validator();


module.exports = {
  async add(req, res) {
    try {
      const decode = jwt.decode(req.headers.token, app.get('appSecret'));
      const id_auto_inc = properties[properties.length - 1].property_id + 1;
      const {
        address,
        status,
        price,
        state,
        city,
        type,
        image_url
      } = req.body;
      const property = {
        property_id: id_auto_inc,
        address,
        owner: decode.owner,
        status,
        price,
        state,
        city,
        type,
        created_on: dateTime,
        ownerEmail: decode.email,
        ownerPhoneNumber: decode.phone_number,
        image_url
      };
      
      const {
        error,
        value
      } = joi.validate(property, schema);

       if (error) {
         switch (error.details[0].context.key) {
           case 'address':
             res.status(400).send({
               status: 'error',
               'error': `you must provide a valid address`
             });
             break;
           case 'owner':
             res.status(400).send({
               status: 'error',
               'error': `the owner must be valid`
             });
             break;

             case 'image_url':
             res.status(400).send({
               status: 'error',
               'error': `the image url must be valid`
             });
             break;

           case 'status':
             res.status(400).send({
               status: 'error',
               'error': ` staus can only accept two valiables:
              <br>
              1. availabe
              <br>
              2. sold
              `
             });
             break;

           case 'price':
             res.status(400).send({
               status: 'error',
               'error': `the price must be 0 or a positive number`
             });
             break;

           case 'state':
             res.status(400).send({
               status: 'error',
               'error': `you must provide a valid state address`
             });
             break;

           case 'city':
             res.status(400).send({
               status: 'error',
               'error': `the city name must be between 3 to 25 characters long`
             });
             break;

           case 'type':
             res.status(400).send({
               status: 'error',
               'error': `the type name must be between 3 to 25 characters long`
             });
             break;

           case 'created_on':
             res.status(400).send({
               status: 'error',
               'error': `please provide a valid format`
             });
             break;
          case 'ownerEmail':
             res.status(400).send({
               status: 'error',
               'error': `you must provide a valid email address`
             });
             break;
             case 'ownerPhoneNumber':
             res.status(400).send({
               status: 'error',
               'error': `phone number must contain 10 numbers`
             });
             break;
           default:
             res.status(400).send({
               status: 'error',
               'error': `invalid information`
             });
             break;
         }
       } else {
        properties.push(value);
        res.status(201).send({
          status: 'success',
          array: value.length,
          data: value
        });
       }
    }
    catch (error) {
      res.status(500).send({
        message: `error: ${error}`
      });
    }
  },
  async getAllProperties(req, res) {
    try {
        let types = null;
        const {
          type
        } = req.query;
        if (type) {
          function filterByValue(properties, type) {
            types = properties.filter((v, i) => {
              if (v.type.toLowerCase().indexOf(type) >= 0) {
                return true;
              }
              false;
            });
          }
          filterByValue(properties, type);

          res.status(200).send({
            status: 'success',
              data: types
          });
        } else {
          res.status(200).send({
            status: 'success',
            data: properties
          });
        }
    } catch (error) {
      res.status(400).send({
        status: 'error',
        error: `Error fetching property:   ${error}`
      });
    }
  },
  async get(req, res) {
    try {
      const { property_id } = req.params;

      const validId = await properties.find(property => property.property_id == property_id);

      if (validId == undefined) {
        throw res.status(404).send({
          status: 'error',
          error: "the property doesn't exist"
        });
      }
      await res.status(200).send({
        status: 'success',
        data: validId
      });
    }
    catch (error) {
      res.status(500).send({
        status: 'error',
        error: `Error fetching property:   ${error}`
      });
    }
  },
  async get_self(req, res) {

    try {
      
      const decode = jwt.decode(req.headers.token, app.get('appSecret'));
      console.log(decode);
      const validUserId = await properties.filter(property => property.owner == decode.owner);
      console.log(validUserId, decode.owner)
      if (validUserId == undefined) {
        throw res.status(404).send({
          status: 'error',
          error: "the user doesn't exist"
        });
      }
      res.status(200).send({
        status: 'success',
        data: validUserId
      });
    } catch (error) {
      res.status(500).send({
        status: 'error',
        error: `Error fetching property:   ${error}`
      });
    }
  },
  async get_by_user(req, res) {
    
    try {
      const { owner } = req.params
      const decode = jwt.decode(req.headers.token, app.get('appSecret'));
      const validUserId = properties.filter(property => property.owner == owner);

      if (validUserId == undefined) {
        throw res.status(404).send({
          status: 'error',
          error: "the user doesn't exist"
        });
      }
      res.status(200).send({
        status: 'success',
        data: validUserId
      });
    }
    catch (error) {
      res.status(500).send({
        status: 'error',
        error: `Error fetching property:   ${error}`
      });
    }
  },
  async update(req, res) {
    try {
      const decode = jwt.decode(req.headers.token, app.get('appSecret'));
      const { property_id } = req.params;
      const {
        address, status, price, state, city, type
      } = req.body;

      let update = properties.find(property => property.owner == decode.owner && property.property_id == property_id)
      if (update == undefined) {
        throw res.status(404).send({
          status: 'error',
          error: "the property doesn't exist"
        });
      }
      update.address = address ? address : update.adress;
      update.status = status ? status : update.status;
      update.price = price ? price : update.price;
      update.state = state ? state : update.state;
      update.city = city ? city : update.city;
      update.type = type ? type : update.type;
        
      res.status(200).send({
        status: 'success',
        dataProperty: update
      });
    } catch (error) {
      await res.status(500).send({
        message: `error: ${error}`
      });
    }
  },
  async delete(req, res) {
    try {
      const decode = jwt.decode(req.headers.token, app.get('appSecret'));
      const { property_id } = req.params
      const validId = await properties.find(property => property.owner == decode.owner && property.property_id == property_id);
      if (validId == undefined) {
        throw res.status(404).send({
          status: 'error',
          error: "sorry we can't serve you"
        });
      }
      const del = properties.splice(validId);
      res.status(200).send({
        status: 'success',
        data: {
          message: `${del.length} items successfully deleted`
        }
      });
    }
    catch (error) {
      res.status(403).send({
        status: 'error',
        error: `Error fetching property:   ${error}`
      });
    }
  }
}
