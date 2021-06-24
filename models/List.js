const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class List extends Model {}
List.init(  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    // },
    //maybe need another reference for something ? ?? 
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'user',
    //     key: 'id'
    //   }
    },
    list_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredients_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'recipe',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'list'
  }
);

module.exports = List;
