const { Category } = require('../models')

class CategoryController {

  static async index(req, res, next) {
    try {
      const categories = await Category.findAll({ order: [['name', 'ASC']]})
      res.status(200).json({ status: 200, categories })
    } catch (err) {
      next(err)
    }
  }

  static async store(req, res, next) {
    const { name, type } = req.body
    try {
      const category = await Category.create({ name, type })
      res.status(201).json({ status: 201, category })
    } catch (err) {
      next(err)
    }
  }

  static async show(req, res, next) {
    const { id } = req.params
    try {
      const categories = await Category.findByPk(id, { order: [['name', 'ASC']]})
      res.status(200).json({ status: 200, categories })
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.update({ name }, { where: { id }, returning: true})
      res.status(200).json({ status: 200, category: category[1][0] })
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) { 
    const { id } = req.params
    try {
      const category = await Category.destroy({ where: { id }})
      res.status(200).json({ status: 200, message: 'Success deleted category' })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = CategoryController