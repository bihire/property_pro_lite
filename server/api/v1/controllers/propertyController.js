const properties = [
  {
    id: 1,
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
    id: 1,
    address: 'bro',
    owner: 1,
    status: 'bro',
    price: 2.0847,
    state: 'bro',
    city: 'bro',
    type: 'g',
    created_on: '2018-11-13T20:20:39+00:00',
    image_url: 'https://www.google.be/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    ownerEmail: 'muhireboris@yahoo.fr',
    ownerPhoneNumber: '0798734567'
  }
];
const _ = require('lodash');
const Validator = require('jsonschema').Validator;
const { Propertyschema } = require('../models/property');
const { dateTime } = require('../models/date');

const v = new Validator();

module.exports = {
  async add(req, res) {
    try {
      const id_auto_inc = properties[properties.length - 1].id + 1;
      const {
        address,
        owner,
        status,
        price,
        state,
        city,
        type,
        ownerEmail,
        ownerPhoneNumber
      } = req.body;
      const property = {
        id: id_auto_inc,
        address,
        owner,
        status,
        price,
        state,
        city,
        type,
        created_on: dateTime,
        ownerEmail,
        ownerPhoneNumber
      };
      console.log(dateTime);
      const Property = v.validate(property, Propertyschema);
      if (Property.errors.length !== 0) throw Property.errors;
      properties.push(Property.instance);

      res.status(200).send({
        status: 'success',
        array: properties.length,
        data: Property.instance
      });
    }
    catch (error) {
      res.status(500).send({
        message: `error: ${error}`
      });
    }
  },
  async get_all(req, res) {
    try {
      let propertis = null;
      const { search } = req.query;
      if (search) {
        function filterByValue(properties, search) {
          propertis = properties.filter((v, i) => {
            if (v.type.toLowerCase().indexOf(search) >= 0) {
              return true;
            }
            false;
          });
        }
        filterByValue(properties, search);

        res.send(propertis);
      }
      else {
        res.status(200).send({
          status: 'success',
          data: properties
        });
      }
    }
    catch (error) {
      res.status(500).send({
        status: 'error',
        error: `Error fetching property:   ${error}`
      });
    }
  },
  async get(req, res) {
    try {
      const { id } = req.params;

      const validId = properties.find(property => property.id == id);

      if (validId == undefined) {
        throw res.status(404).send({
          status: 'error',
          error: "the property doesn't exist"
        });
      }
      res.status(200).send({
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
  async get_by_user(req, res) {
    try {
      const { user_id } = req.params;

      const validUserId = properties.filter(property => property.owner == user_id);

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
      const {
        address, status, price, state, city, type, ownerEmail, ownerPhoneNumber, owner, id
      } = req.body;

      const search = _.chain(properties)
        .find({
          owner,
          id
        })
        .merge({
          address,
          status,
          price,
          state,
          city,
          type,
          ownerEmail,
          ownerPhoneNumber
        });
      res.status(200).send({
        status: 'success',
        data: search,
        dataProperty: properties
      });
    }
    catch (error) {
      await res.status(500).send({
        message: `error: ${error}`
      });
    }
  },
  async delete(req, res) {
    try {
      const { id, owner } = req.body
      const validId = await properties.find(property => property.owner == owner && property.id == id);

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
};
