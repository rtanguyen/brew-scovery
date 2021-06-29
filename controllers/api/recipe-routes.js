// //recipe routes will be similar to module 13 where it includes 'shopping list through the recipie id

// //Maybe these routes wont be hit in our API cause we arent storing them?
// const router = require('express').Router();
// const { User, Recipes, Reviews, List } = require('../../models')
// const withAuth = require('../../utils/auth');
// //get all the recipes 
// //right now it includes the reviews attached
// router.get('/', (req, res) => {
//     Recipes.findAll({
//         attributes: ['id', 'recipe_title', 'image_url'],
//         include: [
//             {
//             model: Reviews,
//             attributes: ['review_text'],
//             include: {
//                 model: User,
//                 attributes: ['username']
//             }
//             }
//         ]
//     }).then(dbRecipeData => {
//         const recipes = dbRecipeData.map(recipes => recipes.get({ plain: true }));
//         res.render('homepage', {
//             recipes,
//             loggedIn: req.session.loggedIn
//           });
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json(err)
//     });
// });

// router.get('/:id', (req, res) => {
//     Recipes.findOne({
//         attributes: ['id', 'recipe_title', 'image_url'],
//         include: [
//             {
//             model: Reviews,
//             attributes: ['review_text'],
//             include: {
//                 model: User,
//                 attributes: ['username']
//             }
//             }]
//     }).then(dbRecipeData => {
//         if (!dbRecipeData) {
//           res.status(404).json({ message: 'No recipe found with this id' });
//           return;
//         }
//         res.json(dbPostData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//  });
// //added delete [probably dont need]
//  router.delete('/:id', withAuth, (req, res) => {
//     console.log('id', req.params.id);
//     Recipes.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(dbRecipeData => {
//         if (!dbRecipeData) {
//           res.status(404).json({ message: 'No post found with this id' });
//           return;
//         }
//         res.json(dbRecipeData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

  //single recipe render
 
// module.exports = router;