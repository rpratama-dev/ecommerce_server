const { User } = require('../models');

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
}

module.exports = UserController;