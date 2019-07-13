const users = [{
  id: 1,
  address: 'bro',
  email: 'bro',
  firstName: 'bro',
  lastName: 'bro',
  password: 'bro',
  confirmPassword: 'bro',
  phoneNumber: 'bro',
  isAdmin: true
}];

const _ = require('lodash');

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
  async register(req, res) {
    try {
      const id_auto_inc = users[users.length - 1].id + 1;
      const {
        address,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        phoneNumber,
        isAdmin
      } = req.body;
      const user = {
        id: id_auto_inc,
        address,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        phoneNumber,
        isAdmin
      };

      const User = v.validate(user, schema);
      if (User.errors.length !== 0) throw User.errors;
      users.push(user);

      console.log(`${id_auto_inc}   ${users}`);
      await res.status(200).send({
        status: 'success',
        array: users.length,
        data: users
      });
    } catch (error) {
      await res.status(500).send({
        message: `error: ${error}`
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
      const token = jwt.sign(User, app.get('appSecret'));
      console.log(token);
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
