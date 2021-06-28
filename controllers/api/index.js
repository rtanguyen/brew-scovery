const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const reviewRoutes = require('./review-routes');
const recipes = require('./recipe-routes');
const List = require('../../models/List.js');


router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
//the shopping list?
router.use('/recipes', recipes);

module.exports = router;


