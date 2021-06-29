const router = require('express').Router();
const { User, Reviews, List } = require('../../models')
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
        review_text: req.body.review,
        api_id: req.body.api_id,
        user_id: req.session.user_id
    }).then(dbReviews => res.json(dbReviews))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add a PUT
router.put('/:id', withAuth, (req, res) => {
  Reviews.update({
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