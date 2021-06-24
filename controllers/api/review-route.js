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

//delete review [needs to be the person that posted, use some type of authentication]
router.delete('/:id', (req, res) => {
    Reviews.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbReviews => {
        if (!dbReviews) {
          res.status(404).json({ message: 'No review found with this id!' });
          return;
        }
        res.json(dbReviews);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;