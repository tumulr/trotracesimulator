'use strict';

const jwt = require('jsonwebtoken');

class Token {
  constructor(env) {
    this.env = env;
  }

  generate(payload, options={}) {
    return jwt.sign(payload, this.env.jwt.secret, options);
  }

  verify(token) {
    return new Promise((resolve, reject) => {
      try {
        let tokenResult = jwt.verify(token, this.env.jwt.secret);

        resolve(tokenResult);
      } catch(err) {
        reject(err)
      }
    });
  }
}

module.exports = Token;
