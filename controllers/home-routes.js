const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../models')
const withAuth = require('../../utils/auth');
const { post } = require('./api');

//get all the recipes 
router.get('/', (req, res) => {
    Recipes.findAll({
        attributes: ['id', 'recipe_title', 'ingredients','instructioins'],
        include: [
            {
            model: Reviews,
            attributes: ['review_text'],
            include: {
                model: User,
                attributes: ['username']
            }
            }
        ]
    }).then(dbRecipeData => {
        const recipes = dbRecipeData.map(recipes => recipes.get({ plain: true }));
        res.render('homepage', {
            recipes,
            loggedIn: req.session.loggedIn
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err)
    });
});


//login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
module.exports = router;