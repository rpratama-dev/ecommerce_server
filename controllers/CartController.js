const { Product, Cart } = require('../models')
const createError = require('http-errors')

class CartController {

  static async index(req, res, next) {
    const UserId = req.logedInUser.id
    try {
      const carts = await Cart.findAll({ where: { UserId }, include: Product })
      res.status(200).json({ status: 200, carts })
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    const { ProductId, amount } = req.body
    const UserId = req.logedInUser.id
    try {
      const product = await Product.findByPk(ProductId)
      const cart = await Cart.findOne({ where: { ProductId, UserId } })
      if (cart) {
        // const tempAmount = cart.amount + amount
        if (product.stock >= amount) {
          const result = await Cart.update({ amount }, {
            where: { id: cart.id }, returning: true
          })
          res.status(200).json({ status: 200, cart: { UserId, ProductId, amount } })
        } else {
          throw createError(400, 'sorry the amount cannot exceed the stock')
        }
      } else {
        if (product.stock >= amount) {
          const payload = { UserId, ProductId, amount }
          const result = await Cart.create(payload)
          res.status(201).json({ status: 201, cart: { UserId, ProductId, amount } })
        } else {
          throw createError(400, 'sorry the amount cannot exceed the stock')
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async patch(req, res, next) {
    let { ProductId, amount, patch } = req.body
    patch = patch || 'add'
    const { id } = req.params
    const UserId = req.logedInUser.id
    try {
      const product = await Product.findByPk(ProductId)
      const cart = await Cart.findByPk(id)
      if (cart) {
        if (product.stock >= amount && amount > 0) {
          const result = await Cart.update({ amount: amount }, {
            where: { id: cart.id }, returning: true
          })
          res.status(200).json({ status: 200, cart: { UserId, ProductId, amount: amount } })
        } else {
          if (amount <= 1) {
            throw createError(202, 'You can delete this cart')
          } else {
            throw createError(400, 'sorry the amount cannot exceed the stock')
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params
    try {
      const result = await Cart.destroy({ where: { id } })
      res.status(200).json({ status: 200, message: 'Product deleted from cart' })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = CartController