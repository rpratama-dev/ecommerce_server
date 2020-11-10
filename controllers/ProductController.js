const { Product } = require('../models');

class ProductController {

  static async index(req, res, next) {

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

  }

  static async update(req, res, next) {
    const id = req.params.id;
    console.log("puttttt ===>", id)
    const { name, image_url, price, stock } = req.body;
    const input = { name, image_url, price, stock };
    try {
      const product = await Product.update(input, { where: { id }, returning: true });
      res.status(200).json({ status: 200, product: product[1][0] });
      // console.log(product[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async patch(req, res, next) {

  }

  static async delete(req, res, next) {

  }

}

module.exports = ProductController;