'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whistlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Whistlist.belongsTo(models.Product, { foreignKey: 'ProductId' })
    }
  };
  Whistlist.init({
    UserId: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product id required'
        },
        notNull: {
          args: true,
          msg: 'Product id required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Whistlist',
  });
  return Whistlist;
};