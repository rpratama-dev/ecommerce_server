const { Whistlist, Product } = require('../models')
const createError = require('http-errors')

class WhistlistController {
  
  static async index(req, res, next) {
    try {
      const UserId = req.logedInUser.id
      const whistlists = await Whistlist.findAll({ where: { UserId }, attributes: ['id'], include: Product }) 
      res.status(200).json({ status: 200, whistlists })
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    try {
      const { ProductId } = req.body
      const UserId = req.logedInUser.id;
      const whistlist = await Whistlist.findOrCreate({ where: { UserId, ProductId } })
      if (whistlist[1]) {
        res.status(201).json({ status: 201, whistlist: whistlist[0] })
      } else {
        throw createError(400, 'Product already in your whistlist')
      }
  } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params
      const result = await Whistlist.destroy({ where: { id } })
      res.status(200).json({ status: 200, message: 'Product deleted from your whistlist' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = WhistlistController