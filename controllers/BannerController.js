const { Banner, Category } = require('../models');
const { Op } = require("sequelize");
const createError = require('http-errors')

class BannerController {

  static async index(req, res, next) {
    try {
      const banners = await Banner.findAll({ include: Category ,order: [['id', 'DESC']]})
      res.status(200).json({ status: 200, banners })
    } catch (error) {
      next(error)
    }
  }

  static async store(req, res, next) {
    const { name, image_url, start_date, end_date, CategoryId } = req.body;
    const UserId = req.logedInUser.id;
    const input = { name, image_url, start_date, end_date, CategoryId, UserId };
    try {
      const banner = await Banner.create(input)
      res.status(201).json({ status: 201, banner })
    } catch (error) {
      next(error)
    }
  }

  static async show(req, res, next) {
    const { id } = req.params
    try {
      const banner = await Banner.findByPk(id, { include: Category })
      res.status(200).json({ status: 200, banner })
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    const { name, image_url, start_date, end_date, CategoryId } = req.body;
    const { id } = req.params;
    const input = { name, image_url, start_date, end_date, CategoryId };
    try {
      const banner = await Banner.update(input, { where: { id }, returning: true})
      res.status(200).json({ status: 200, banner: banner[1][0] })
    } catch (error) {
      next(error)
    }
  }

  static async patch(req, res, next) {
    let { is_active } = req.body;
    const { id } = req.params;
    try {
      const dataBanner = await Banner.findByPk(id)
      const currentDate = new Date(new Date().toISOString().slice(0, 10))
      if (new Date(dataBanner.end_date) < currentDate) {
        is_active = 'false';
        await Banner.update({ is_active }, { where: { id }, returning: true })
        throw createError(400, 'Banner is due, can\'t set to active')
      }
      const banner = await Banner.update({ is_active }, { where: { id }, returning: true})
      res.status(200).json({ status: 200, banner: banner[1][0] })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params
    try {
      const banner = await Banner.destroy({ where: { id }})
      res.status(200).json({ status: 200, message: 'Success deleted banner' })
    } catch (err) {
      next(err)
    }
  }

  static async activeBanner(req, res, next) {
    try {
      const banners = await Banner.findAll(
        {
          where: {
            is_active: 'true',
            end_date: {
              [Op.gte]: new Date(new Date().toISOString().slice(0, 10))
            }
          }
        })
      res.status(200).json({ status: 200, banners })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BannerController