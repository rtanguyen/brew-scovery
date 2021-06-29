const router = require('express').Router();
const { User, Reviews, List } = require('../models')


router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/landing');
    return;
  }

  res.render('homepage');
});

//get for single recipe /endpoint [maybe change the name]
router.get('/recipe/:id' , (req, res) => {
  res.render('recipe', {
    loggedIn: true,
    id: req.params.id,
    //save user id to save new shopping list from recipe page
    // list_id: req.sessions.user_id
  })
})
//login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req,res) => {
  res.render('signup')
})

router.get('/landing', (req,res) => {
  res.render('landing')
})

module.exports = router;