const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY);
  return token;
}

function verifyToken(token) {
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    return { status: "tokenValid", decode };
  } catch (err) {
    err = {
      status: 'JsonWebTokenError',
      message: 'Authentication Failed'
    }
    return err;
  }
}

module.exports = {
  generateToken, verifyToken
}