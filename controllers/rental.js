const GameModelDB = require('../models/game');
const UserModelDB = require('../models/user');

exports.getRental = (req, res) => {
  GameModelDB
    .find()
    .then(games => {
      res.render('rental/index', {
        pageTitle: 'Rental',
        games
      });
    })
    .catch(err => console.log(err));
}

exports.getRentGameSelectUser = (req, res) => {
  const gameId = req.params.gameId;
  const pageStatus = req.query.pageStatus;

  res.render('rental/rent-game', {
    pageTitle: 'Rent',
    pageStatus: pageStatus,
    gameId
  });
}

exports.postRentGameNewUser = (req, res) => {
  const nameUser = req.body.name;
  const emailUser = req.body.email;
  const cpfUser = parseInt(req.body.cpf);
  const gameId = req.params.gameId;
  const rentalDate = req.body.rentalDate;
  const daysQuantity = req.body.daysQnt;
  
  const user = new UserModelDB({
    name: nameUser,
    email: emailUser,
    cpf: cpfUser
  });
  user
    .save()
    .then(user => {
      return user.rentGame(gameId, rentalDate, daysQuantity);
    })
    .then(() => {
      return GameModelDB.findByIdAndUpdate(gameId, { rentedBool: true });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.postRentGameOldUser = (req, res) => {
  const gameId = req.params.gameId;
  const userCpf = req.body.cpf;
  const rentalDate = req.body.rentalDate;
  const daysQuantity = req.body.daysQnt;

  UserModelDB
    .findOne({ cpf: userCpf })
    .then(user => {
      return user.rentGame(gameId, rentalDate, daysQuantity);
    })
    .then(() => {
      return GameModelDB.findByIdAndUpdate(gameId, { rentedBool: true });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.getFetchUser = (req, res) => {
  res.render('rental/fetch-user', {
    pageTitle: 'User Area',
    pageStatus: 'findUser'
  });
}

exports.postFetchUser = (req, res) => {
  const userCpf = req.body.cpf;
  
  UserModelDB
    .findOne({ cpf: userCpf })
    .populate('rentedGames.games.gameId')
    .exec()
    .then(user => {
      const games = user.rentedGames.games;
      const userData = { cpf: userCpf, name: user.name, email: user.email, games };

      res.render('rental/fetch-user', {
        pageTitle: user.name,
        pageStatus: 'userArea',
        user: userData
      });
    })
    .catch(err => console.log(err));
}

exports.postRemoveGameUser = (req, res) => {
  const gameId = req.body.gameId;
  const gameItemId = req.params.gameItemId;
  const userCpf = req.body.cpf;

  UserModelDB.findOne({ cpf: userCpf })
    .then((user) => {
      return user.removeGameFromRented(gameItemId);
    })
    .then(() => {
      return GameModelDB.findByIdAndUpdate({ _id: gameId }, {rentedBool: false});
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.getCheckInfoRentedGame = (req, res) => {
  const gameId = req.params.gameId;

  UserModelDB
    .find()
    .populate('rentedGames.games.gameId')
    .exec()
    .then(users => {
      let infoGame;

      users.forEach(user => {
        if(!infoGame){
          infoGame = user.findGameById(gameId);
        }
      });

      return infoGame;
    })
    .then((infoGame) => {
      res.render('rental/game-detail', {
        pageTitle: 'Game Detail',
        infoGame
      })
    })
    .catch(err => console.log(err));
}