'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required, can't be empty",
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Iamge URL is required, can't be empty",
        },
        isUrl: {
          args: true,
          msg: "Image must valid a url"
        }
      }
    },
    price: {
      type: DataTypes.NUMBER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required, can't be empty"
        }, 
        min: {
          args: 0,
          msg: "Price cannot set minus",
        }
      }
    },
    stock: {
      type: DataTypes.NUMBER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is required, can't be empty"
        }, 
        min: {
          args: 0,
          msg: "Stock cannot set minus",
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};