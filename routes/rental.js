const express = require('express');

const rentalController = require('../controllers/rental');

const router = express.Router();

router.get('/', rentalController.getRental);

router.get('/rent-game/:gameId', rentalController.getRentGameSelectUser);

router.post('/rent-game/:gameId/newUser', rentalController.postRentGameNewUser);

router.post('/rent-game/:gameId/oldUser', rentalController.postRentGameOldUser);

router.get('/user', rentalController.getFetchUser);

router.post('/user', rentalController.postFetchUser);

router.post('/remove-game-user/:gameItemId', rentalController.postRemoveGameUser);

router.get('/check-info/:gameId', rentalController.getCheckInfoRentedGame);

module.exports = router;