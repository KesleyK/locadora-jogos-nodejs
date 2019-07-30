const GameModelDB = require('../models/game');

exports.getAddGame = (req, res) => {
  res.render('admin/add-game', {
    pageTitle: 'Add Game'
  })
}

exports.postAddGame = (req, res) => {
  const gameName = req.body.name;
  const gamePrice = req.body.price;
  const gameDescription = req.body.description;

  const game = new GameModelDB({
    name: gameName,
    price: gamePrice,
    description: gameDescription,
    rentedBool: false
  });

  game
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}