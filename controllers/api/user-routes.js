const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../../models')

//get all users without pw
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }).then(dbUser => res.json(dbUser))
.catch(err => {
    console.log(err);
    res.status(500).json(err) });
});

//get all by id
router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Recipes,
          attributes: ['id', 'recipe_title', 'ingredients', 'instructions']
        },
        {
          model: List,
          attributes: ['id', 'list_name', 'ingredients_name'],
          include: [
          {
            model: Post,
            attributes: ['title']
          },
          {
            model: Reviews,
            attributes:['id', 'review_text', 'user_id', 'recipe_id']
          }
        ]
        },
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
