const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  rentedBool: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Game', gameSchema);