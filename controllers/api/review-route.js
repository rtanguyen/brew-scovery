const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../../models')
const withAuth = require('../../utils/auth');

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
router.post('/', withAuth, (req, res) => {
    Reviews.create({
        title: req.body.title,
        review: req.body.review
    }).then(dbReviews => res.json(dbReviews))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//add a PUT
router.put('/:id', withAuth, (req, res) => {
  Reviews.update({
    title: req.body.title,
    review_text: req.body.review_text
  },
  {
    where: {id: req.params.id}
  }).then(dbReviews => {
    if(!dbReviews) {
      res.status(404).json({ message: 'no review with this id' });
      return;
    } res.json(dbReviews);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})
//delete review
router.delete('/:id', withAuth, (req, res) => {
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