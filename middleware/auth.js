const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');
async function authentication(req, res, next) {
  const { access_token } = req.headers;
  const message = 'Authentication Failed';
  let decoded = {};

  try {
    if (!access_token) {
      throw (createError(401, message));
    } else {
      const result = verifyToken(access_token);
      if (result.status == 'JsonWebTokenError') {
        throw createError(401, message)
      } else {
        decoded = result.decode;
      }

      const user = await User.findOne({ where: { id: decoded.id } })
      if (!user) {
        throw (createError(401, message));
      } else {
        req.logedInUser = decoded;
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

async function authorize(req, res, next) {
  const UserId = req.logedInUser.id;
  try {
    const user = await User.findByPk(UserId);
    console.log(user.role)
    if (user.role === "admin") {
      next();
    } else {
      throw createError(401, "Not authorize");
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authentication, authorize
}