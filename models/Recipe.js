// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Recipes extends Model{}
// Recipes.init(
//     {
//         id:{
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         recipe_title: {
//             title: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//         }
//     },
//         ingredients: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         instructions: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//     },
//     {
//         sequelize,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'recipe'
//       }
//     );

// module.exports = Recipes;