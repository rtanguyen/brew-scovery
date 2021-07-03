const router = require('express').Router();
const { User, Reviews, List } = require('../models')


router.get('/homepage', (req, res) => {
  console.log("SESSION", req.session)
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'username',
      'user_image'
    ],
    include: [{
      model: Reviews,
      attributes: ['id', 'review_text', 'user_id']
    }]
  }).then(dbUserData => {
    const user = dbUserData;
    const userImage = dbUserData.dataValues.user_image
    console.log(userImage)
    res.render('homepage', {
      user,
      loggedIn: req.session.loggedIn
    });
  }) .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get for single recipe/:api id
router.get('/recipe/:id' , (req, res) => {
  Reviews.findAll({
    where: {
      api_id: req.params.id
  },
  attributes: ['id', 'review_text', 'user_id'],
  include: [{model: User,
      atrributes: ['username', 'user_image']},
  ]},
  {include: { model: List,
      atrributes: ['list_name', 'ingredients_name']}
  })
    // include: { 
    //     model: User,
    //     attributes: ['id', 'username', 'user_image']
    // }
  .then(dbReviewData => {
    
    const reviews = dbReviewData.map(review => review.get({ plain: true }))
    // console.log(reviews);
    res.render('recipe', {
      loggedIn: true,
      id: req.params.id,
      reviews
      //save user id to save new shopping list from recipe page
      // list_id: req.sessions.user_id
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

  // .catch(err => {
  //   console.log(err);
//   //   res.status(500).json(err);
// });
// })
//login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
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

// router.get('/myaccount', (req,res) => {
  // if (req.session.user_id) {
    // res.redirect('/myaccount');
  //   return;
  // }
//   res.render('myaccount')
// })

router.get('/', (req,res) => {
  res.render('landing')
})

router.get('/uhoh', (req,res) => {
  res.render('uhoh')
})

// router.get('/homepage', (req,res) => {
//   res.render('homepage')
// })

module.exports = router;