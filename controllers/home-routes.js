const router = require('express').Router();
const { User, Reviews, List } = require('../models')


router.get('/', (req, res) => {
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
  })
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
  });
})

  // .catch(err => {
  //   console.log(err);
//   //   res.status(500).json(err);
// });
// })
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