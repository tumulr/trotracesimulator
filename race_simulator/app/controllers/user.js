'use strict';

const User = require('../classes/user');
const Token = require('../classes/token');

class UserController {
  constructor(env) {
    this.env = env;
    this.user = new User(this.env);
    this.token = new Token(this.env);
  }

  async login(req, res) {
    try {
      let result = this.user.login(req.body.email, req.body.password);

      if (result.status) {
        let jwtPayload = {
          email: req.body.email
        };
        let issuedToken = this.token.generate(jwtPayload, {
          expiresIn: this.env.jwt.expiration
        });

        res.status(200).json({email: req.body.email, token: issuedToken});
      } else {
        res.status(401).json({message: 'INVALID_CREDENTIALS'});
      }
    } catch(err) {
      res.status(400).json({message: err.message});
    }
  }
}

module.exports = UserController;
