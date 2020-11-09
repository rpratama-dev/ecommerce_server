const createError = require('http-errors');

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

module.exports = {
  authentication,
}