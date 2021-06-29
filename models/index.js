// import all models
const List = require('./List');
const User = require('./User');

const Reviews = require('./Reviews')

// create associations
// User.hasMany(Recipes, {
//   foreignKey: 'user_id'
// });

// Recipes.belongsTo(User, {
//   foreignKey: 'user_id'
// });

Reviews.belongsTo(User, {
  foreignKey: 'user_id'
});

// Reviews.belongsTo(Recipes, {
//   foreignKey: 'recipes_id'
// });

User.hasMany(Reviews, {
  foreignKey: 'user_id'
});

// Recipes.hasMany(Reviews, {
//   foreignKey: 'recipes_id'
// });

//user has one shopping list
List.belongsTo(User, {
    foreignKey: 'user_id'
})

// List.belongsToMany(Recipes, {
//     // through: Vote,
//     // as: 'voted_posts',
//     foreignKey: 'recipes_id'
// });

module.exports = { User, List, Reviews };