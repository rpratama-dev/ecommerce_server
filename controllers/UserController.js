const { User } = require('../models');
const createError = require('http-errors');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {

  static async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;
      const input = { fullname, email, password };
      const user = await User.create(input);

      res.status(201).json({
        status: 201, user
      })

    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    const message = "Wrong Username / Password";

    try {
      const user = await User.findOne({ where: { email: inputEmail } });
      if (!user) {
        throw (createError(401, message))
      } else {
        const { id, fullname, email, password } = user;
        const match = comparePassword(inputPassword, password);
        
        if (!match) {
          throw (createError(401, message));
        } else {
          const payload = { id, fullname, email };
          const access_token = generateToken(payload);
          res.status(200).json({ status: 200, user: payload, access_token });
        }
      }
    } catch (error) {
      next(error)
    }
  }
}



module.exports = UserController;