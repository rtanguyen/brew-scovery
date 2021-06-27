const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../models')


router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('homepage');
});

//get for single recipe /endpoint [maybe change the name]
router.get('/recipes' , (req, res) => {
  //renders the recipees handlebar that hosts the dynamically created front end JS
  
  res.render('recipes')
})
//login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
module.exports = router;