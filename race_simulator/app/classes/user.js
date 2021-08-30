'use strict';

const Token = require('./token');

class User {
  constructor(env) {
    this.env = env;
    this.token = new Token(this.env);
  }

  login(email, password) {
    if (password !== this.env.password) {
      return {status: false, message: 'INVALID_USER'};
    }

    return {status: true, message: 'VALID_USER'};
  }
}

module.exports = User;
