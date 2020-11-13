'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Banner.belongsTo(models.User, { foreignKey: 'UserId' })

    }
  };
  Banner.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required, can\'t be empty!'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image URL is required, can\'t be empty!'
        }, 
        isUrl: {
          args: true,
          msg: 'Banner must be an Valid URL adress'
        }
      }
    },
    is_active: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status is required, can\'t be empty!'
        }
      }
    },
    start_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: 'Start date is required, can\'t be empty!'
        },
        isDate: {
          args: true,
          msg: 'Must be valid date!'
        }
      }
    },
    end_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: 'End date is required, can\'t be empty!'
        },
        isDate: {
          args: true,
          msg: 'Must be valid date!'
        }
      }
    },
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    validate: {
      checkDate() {
        let startDate = new Date(this.start_date);
        startDate.setDate(startDate.getDate() - 1);
        if (Date.parse(this.end_date) < startDate) {
          throw new ValidationError('End date cannot be set less than start date!');
        }
      }
    },
    modelName: 'Banner',
  });
  return Banner;
};