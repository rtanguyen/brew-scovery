const router = require('express').Router();
const { User, Reviews, List } = require('../models')
const withAuth = require('../utils/auth');

//on dashboard renders the user account with all reviews and their list
//my account page
router.get('/', (req, res) => {
    Reviews.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'review_text', 'user_id'],
        include: [{model: User,
            atrributes: ['username']},
        ]},
        {include: { model: List,
            atrributes: ['list_name', 'ingredients_name']}
        })
        .then(dbReviewsData => {
            const reviews = dbReviewsData.map(review => review.get({ plain: true }));
            //renders my account page
            res.render('myaccount', { reviews, loggedIn: true });
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
        include: [
            {
                model: List,
                attributes: ['list_name', 'ingredients_name']
            }
        ]
    }).then(dbReviewsData => {
        if (dbReviewsData) {
          const post = dbReviewsData.get({ plain: true });
          //include a view that renders an edit
          res.render('edit-post', {
            post,
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
module.exports = router;