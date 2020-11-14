'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'UserId' })
      User.hasMany(models.Banner, { foreignKey: 'UserId' })
    }
  };
  User.init({
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Fullname is required, can't be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer"
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required, can't be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required, can't be empty"
        },
        len: {
          args: [8],
          msg: "Password is minimal 8 character",
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      },
      afterCreate(user) {
        delete user.dataValues.password;
        delete user.dataValues.createdAt;
        delete user.dataValues.updatedAt;
      }
    },
    modelName: 'User',
  });
  return User;
};