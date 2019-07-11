const users = [{
  id: 1,
  address: "fgh",
  email: "muhirebori@yahoo.fr",
  first_name: "bro",
  last_name: "bro",
  password: "bro",
  confirm_password: "bro",
  phone_number: "bro",
  is_admin: true
}];

const _ = require('lodash');

const joi = require('joi');
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

// We also need a secret to encode/decode our JWTs
app.set('appSecret', 'super-secret-secret');

const Validator = require('jsonschema').Validator;
const {
  schema
} = require('../models/auth');

const v = new Validator();
module.exports = {
  async register(req, res, next) {
    try {
      const id_auto_inc = users[users.length - 1].id + 1;
      const {
        address,
        email,
        first_name,
        last_name,
        password,
        confirm_password,
        phone_number,
        is_admin
      } = req.body;
      const user = {
        id: id_auto_inc,
        address,
        email,
        first_name,
        last_name,
        password,
        confirm_password,
        phone_number,
        is_admin
      };
      console.log(Object.values(user).indexOf(undefined))
      if (Object.values(user).indexOf(undefined) > -1) throw res.send({
        message: 'all the fields are required'
      });
      const schema = joi.object().keys({
        id: joi.number().integer(),
        email: joi.string().email(),
        password: joi.string().regex(new RegExp('^[a-zA-Z1-9]{8,32}$')),
        address: joi.string(),
        first_name: joi.string(),
        last_name: joi.string(),
        confirm_password: joi.string(),
        phone_number: joi.string().regex(new RegExp('^[1-9]{10}$')),
        is_admin: joi.boolean()
      });
      const {
        error,
        value
      } = joi.validate(user, schema);

      if (error) {
        switch (error.details[0].context.key) {
          case 'email':
            res.status(400).send({
              status: 'error',
              'error': `you must provide a valid email`
            });
            break;
          case 'id':
            res.status(400).send({
              status: 'error',
              'error': `you must provide a valid id`
            });
            break;

          case 'password':
            res.status(400).send({
              status: 'error',
              'error': `password provided failed to match the following rules:
              <br>
              1. must contain the following charaters: lower case, upper case, integers
              <br>
              2. It must at least be 8 - 32 characters long
              `
            });
            break;

          case 'confirm_password':
            res.status(400).send({
              status: 'error',
              'error': `please confirm the password`
            });
            break;

          case 'address':
            res.status(400).send({
              status: 'error',
              'error': `you must provide a valid address`
            });
            break;

          case 'phone_number':
            res.status(400).send({
              status: 'error',
              'error': `the phone number need to be 8 characters long`
            });
            break;

          case 'first_name':
            res.status(400).send({
              status: 'error',
              'error': `you must provide a valid first name`
            });
            break;

          case 'last_name':
            res.status(400).send({
              status: 'error',
              'error': `you must provide a valid last name`
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
        users.push(value);
        res.status(201).send({
          status: 'success',
          array: value.length,
          data: value
        });
      };
      console.log(users);
      // const User = v.validate(user, schema);
      // if (User.errors.length !== 0) throw User.errors;
    } catch (error) {
      await res.status(500).send({
        error: `error: ${error}`
      });
    }
  },
  async login(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const User = users.find(user => user.email === email);
      if (!User) {
        throw res.status(401).json({
          message: 'Wrong email or password combination.'
        });
      }
      console.log(typeof User);

      const UserValid = User.password === password;
      if (UserValid === false) {
        throw res.status(401).json({
          message: 'Wrong email or password combination.'
        });
      }
      console.log(UserValid);
      
      console.log(Owner)
      const token = jwt.sign(User, app.get('appSecret'));
      console.log(token);
      const bro = jwt.verify(token, app.get('appSecret'), (err, decoded) => {
            if (err) throw err
            console.log(res.decoded = decoded);
            });
      console.log(bro)
      res.status(200).json({
        status: 'success',
        data: token
      });

    } catch (error) {
      res.status(403).send({
        status: 'error',
        error: `invalid email or password:   ${error}`
      });
    }
  },
  // async update(req, res) {
  //   try {
  //     const user = [];
  //     const bro = _.chain(users)
  //       .find({
  //         id: 1
  //       })
  //       .merge({
  //         email: 'muhireboris@yahoo.fr',
  //         first_name: 'my nigga'
  //       });
  //     res.status(200).send({
  //       status: 'success',
  //       data: bro,
  //       dataUser: users
  //     });
  //   } catch (error) {
  //     await res.status(500).send({
  //       message: `error: ${error}`
  //     });
  //   }
  // }
};
