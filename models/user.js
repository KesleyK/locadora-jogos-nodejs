const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cpf: {
    type: Number,
    required: true
  },
  rentedGames: {
    games: [{
      gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
      rentalDate: { type: Date, required: true},
      daysQnt: { type: Number, required: true}
    }]
  }
});

userSchema.methods.rentGame = function(gameId, rentalDate, daysQnt){
  this.rentedGames.games.push({
    gameId,
    rentalDate,
    daysQnt
  });

  this.save();
}

userSchema.methods.removeGameFromRented = function(gameItemId){
  const updatedRentedGames = this.rentedGames.games.filter(game => game._id != gameItemId);
  this.rentedGames.games = updatedRentedGames;

  this.save();
}

userSchema.methods.findGameById = function(gameId){
  const game = this.rentedGames.games.find(game => {
    return game.gameId._id == gameId
  });

  if(game){
    return { 
      cpfUser: this.cpf,
      game: game 
    };
  }
}

module.exports = mongoose.model('User', userSchema);