const router = require('express').Router();
const { User, Reviews, List } = require('../models')


router.get('/', (req, res) => {
  User.findOne({
    where: {
      id: req.session.id
    },
    attributes: [
      'username',
      'user_image'
    ]
  }).then(dbUserData => {
    const user = dbUserData;
    res.render('homepage', {
      user,
      loggedIn: req.session.LoggedIn
    });
  })
});

//get for single recipe/:api id
router.get('/recipe/:id' , (req, res) => {
  Reviews.findAll({
    where: { id: req.body.api_id
    },
    attributes: ['id', 'review_text', 'api_id', 'user_id', 'created_at'],
    include: { 
        model: User,
        attributes: ['id', 'username', 'user_image']
    }
  }).then(dbReviewData => {
    const reviews = dbReviewData.map(review => review.get({ plain: true }))
    res.render('recipe', {
      loggedIn: true,
      id: req.params.id,
      //save user id to save new shopping list from recipe page
      // list_id: req.sessions.user_id
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
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
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup')
})

router.get('/landing', (req,res) => {
  res.render('landing')
})

module.exports = router;