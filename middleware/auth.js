const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwt');
const { User, Category, Banner, Whistlist, Cart } = require('../models');

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
    if (user.role === "admin") {
      next();
    } else {
      throw createError(401, "Not authorize");
    }
  } catch (error) {
    next(error)
  }
}

async function authorizeCustomer(req, res, next) {
  const UserId = req.logedInUser.id;
  try {
    const user = await User.findByPk(UserId); 
    if (user.role === "customer") {
      next();
    } else {
      throw createError(401, "Not authorize");
    }
  } catch (error) {
    next(error)
  }
}

async function checkCategory(req, res, next) {
  const { id } = req.params
  try {
    const category = await Category.findByPk(id)
    if (!category) {
      throw createError(404, 'Category ID Not Found')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function checkBanner(req, res, next) {
  const { id } = req.params
  try {
    const banner = await Banner.findByPk(id)
    if (!banner) {
      throw createError(404, 'Banner ID Not Found')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function checkWhistlist(req, res, next) {
  const { id } = req.params
  try {
    const whistlist = await Whistlist.findByPk(id)
    if (!whistlist) {
      throw createError(404, 'Whistlist ID Not Found')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function cekCart(req, res, next) {
  const { id } = req.params
  const UserId = req.logedInUser.id

  try {
    const cart = await Cart.findByPk(id)
    if (!cart) {
      throw createError(404, 'Cart ID Not Found')
    } else {
      if (cart.UserId === UserId) {
        next()  
      } else {
        throw createError(401, "Not authorize");
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authentication,
  authorize,
  checkCategory,
  checkBanner,
  checkWhistlist,
  authorizeCustomer,
  cekCart
}