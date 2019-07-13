const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();

// We also need a secret to encode/decode our JWTs
app.set('appSecret', 'super-secret-secret');

module.exports = function WebAuthentication(req, res, next) {
  const {
    token
  } = req.headers;
  if (token) {
    jwt.verify(token, app.get('appSecret'), (err, sender) => {
      if (err) {
        return res.status(404).json({
          status: 'error',
          data: `failed to authanticate token: ${err}`
        });
      }
      console.log(sender)
      res.sender = sender;
      next();
    });
  } else {
    res.status(403).json({
      status: 'error',
      data: 'please provide token'
    });
  }
};
