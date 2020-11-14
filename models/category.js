'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, { foreignKey: 'CategoryId' })
      Category.hasMany(models.Banner, { foreignKey: 'CategoryId' })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Category already exist'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category name is required, can\'t be empty!'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['product', 'banner']],
          msg: 'Category type must be product or banner'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};