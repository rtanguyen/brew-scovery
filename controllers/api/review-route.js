const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../../models')

router.get('/', (req, res) => {
    Reviews.findAll()
    .then(dbReviews => {
        res.json(dbReviews)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//create a review
router.post('/', (req, res) => {
    Reviews.create({
        title: req.body.title,
        review: req.body.review
        //user authentication?
    }).then(dbOfferData => res.json(dbOfferData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});


