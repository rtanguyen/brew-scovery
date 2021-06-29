const router = require('express').Router();
const { User, Reviews, List } = require('../../models')
const withAuth = require('../../utils/auth');
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
          model: List,
          attributes: ['id', 'list_name', 'ingredients_name'],
          include: [
          {
            model: Post,
            attributes: ['title']
          },
          {
            model: Reviews,
            attributes:['id', 'review_text', 'user_id']
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

  //user post
  router.post('/', withAuth, (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
      user_image: req.body.user_image
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.username
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });
  
  router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
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
  
  router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
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
  
  //logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  })
  
  module.exports = router;
  