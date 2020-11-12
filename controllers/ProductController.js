const { Product } = require('../models');
const createError = require('http-errors');

class ProductController {

  static async index(req, res, next) {
    try {
      const products = await Product.findAll({ attributes: { exclude: ['UserId'] }, order: [['id', 'DESC']] });
      res.status(200).json({ status: 200, products });
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    const UserId = req.logedInUser.id;
    const { name, image_url, price, stock } = req.body;
    const input = { name, image_url, price, stock, UserId };
    try {
      const product = await Product.create(input);
      res.status(201).json({ status: 201, product })
    } catch (error) {
      next(error)
    }
  }

  static async show(req, res, next) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, { attributes: { exclude: ['UserId'] } });
      res.status(200).json({ status: 200, product });
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    const { name, image_url, price, stock } = req.body;
    const input = { name, image_url, price, stock };
    try {
      const product = await Product.update(input, { where: { id }, returning: true });
      res.status(200).json({ status: 200, product: product[1][0] }); 
    } catch (error) {
      next(error)
    }
  }

  static async patch(req, res, next) {

  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const status = 200;
    const payload = { status, message: "Success deleted product" };
    try {
      const product = await Product.findByPk(id);
      if (product) {
        if (product.stock < 1) {
          await Product.destroy({ where: { id } });
        } else {
          throw createError(400, "Failed to delete, stock is not empty")
        }
      } else {
        status = 404;
        payload.status = status;
        payload.message = "Failed to delete, Product id not found";
      }
      res.status(status).json(payload);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = ProductController;