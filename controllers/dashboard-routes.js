const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../models')
const withAuth = require('../../utils/auth');

//on dashboard renders the user account with all reviews and their list

router.get('/', (req, res) => {
    Reviews.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'review_text', 'user_id', 'recipe_id'],
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

module.exports = router;