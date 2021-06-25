const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../models')




//login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
module.exports = router;