const { User } = require('../models');
const createError = require('http-errors');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {

  static async register(req, res, next) {
    try {
      const { fullname, email, password } = req.body;
      const input = { fullname, email, password };
      const user = await User.create(input); 
      res.status(201).json({
        status: 201, user: { id: user.id, fullname, email }
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
        const { id, fullname, role, email, password } = user;
        const match = comparePassword(inputPassword, password);

        if (!match) {
          throw (createError(401, message));
        } else {
          const payload = { id, fullname, email };
          const access_token = generateToken(payload);
          payload.role = role;
          res.status(200).json({ status: 200, user: payload, access_token });
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async googlesignin(req, res, next) {
    let { google_access_token } = req.body;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let userGoogle = {}

    try {
      const ticket = await client.verifyIdToken({
        idToken: google_access_token,
        audience: process.env.CLIENT_ID,
      })
      const payload = ticket.getPayload();
      const { name, email, picture } = payload;
      userGoogle = { name, email, picture }

      const user = User.findOne({ where: { email } })
      if (user) {
        const { id, fullname, email } = user
        const payload = { id, fullname, email };
        const access_token = generateToken(payload);
        payload.role = role;
        res.status(200).json({ status: 200, user: payload, access_token });
      } else {
        const newUser = {
          fullname: userGoogle.name,
          password: 'jJys8Hsk8wEmJSa',
          email: userGoogle.email
        }
        const user = await User.create(newUser)
      }
    } catch (error) {
      next(error)
    }

    // client.verifyIdToken({
    //   idToken: google_access_token,
    //   audience: process.env.CLIENT_ID,
    // }).then(ticket => {
    //   const payload = ticket.getPayload();
    //   const { name, email, picture } = payload;
    //   userGoogle = { name, email, picture }
    //   return User.findOne({ where: { email } })
    // }).then(user => {
    //   if (user) {
    //     return user
    //   } else {
    //     const newUser = {
    //       fullname: userGoogle.name,
    //       password: 'jJys8Hsk8wEmJSa',
    //       email: userGoogle.email
    //     }
    //     return User.create(newUser)
    //   }
    // }).then(data => {
    //   const { id, fullname, email } = data;
    //   const access_token = generateToken({ id, email, fullname });
    //   res.status(200).json({ id, email, fullname, access_token });
    // }).catch(err => {
    //   next(err)
    // })
  }
}



module.exports = UserController;