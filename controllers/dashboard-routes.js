const router = require('express').Router();
const { User, Reviews, List } = require('../models')
const withAuth = require('../utils/auth');

//on dashboard renders the user account with all reviews and their list
//my account page
router.get('/',withAuth, (req, res) => {
    Reviews.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'review_text', 'user_id'],
        include: [{model: User,
            atrributes: ['username', 'user_image']},
        ]},
        {include: { model: List,
            atrributes: ['ingredients_name']}
        })
        .then(dbReviewsData => {
            const reviews = dbReviewsData.map(review => review.get({ plain: true }));
            console.log(reviews);
            //renders my account page
            res.render('myaccount', { reviews, loggedIn: true});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//edit reviews
router.get('/edit/:id', withAuth, (req, res) => {
    Reviews.findOne({
        where: {id: req.params.id },
        attributes:  ['id', 'review_text', 'user_id'],
        // include: [
        //     {
        //         model: List,
        //         attributes: ['list_name', 'ingredients_name']
        //     }
        // ]
    }).then(dbReviewsData => {
        if (dbReviewsData) {
          const review = dbReviewsData.get({ plain: true });
          //include a view that renders an edit
          res.render('single-review', {
            review,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
})
//delete reviews



router.get('/list/:id', withAuth, (req, res) => {
  List.findOne({
      where: {id: req.session.user_id },
      attributes:  ['ingredients_name'],
      // include: [
      //     {
      //         model: List,
      //         attributes: ['list_name', 'ingredients_name']
      //     }
      // ]
  })
  .then(dbListData => {
    const ingredientsList = dbListData
    // .map(ingredient => ingredient.get({ plain: true }));
    ;
    console.log(ingredientsList)
      res.render('shopping-list', {
          list,
          loggedIn: true
        });
      });
    });
  
module.exports = router;