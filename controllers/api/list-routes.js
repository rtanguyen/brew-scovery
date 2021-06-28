//LIST routes
const router = require('express').Router();
const { User, Recipes, Reviews, List } = require('../../models')
const withAuth = require('../../utils/auth');


//get all lists
router.get('/', (req, res) => {
    List.findAll()
    .then(dbListData => {
        res.json(dbListData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//get id and edit list
router.put('/:id', withAuth, (req, res) => {
    List.update({
        list_name: req.body.list_name,
        ingredients_name: req.body.ingredients_name
    },
    {
    where: {
        id: req.params.id }
    }).then(dbListData => {
        if(!dbListData) {
          res.status(404).json({ message: 'no review with this id' });
          return;
        } res.json(dbListData);
      }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
