var bcrypt = require('bcryptjs');

function hashPassword(password) {
  console.log(process.env.SALT)
  const salt = bcrypt.genSaltSync(+process.env.SALT);
  const hash = bcrypt.hashSync(password, salt)
  return hash;
}

function comparePassword(password, hash) {
  const match = bcrypt.compareSync(password, hash);
  return match;
}

module.exports = {
  hashPassword, comparePassword
}