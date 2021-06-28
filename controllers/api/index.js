const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const reviewRoutes = require('./review-route');
const recipes = require('./recipe-routes');
const listRoutes = require('./list-routes');


router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/lists', listRoutes)
router.use('/recipes', recipes);

module.exports = router;


