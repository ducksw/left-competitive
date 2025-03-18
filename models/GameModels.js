const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GameSchema = new Schema({ 
  code: { type: String, unique: true, require: true },
  players: [{ steamId: String, displayName: String, avatar: String }],
  //players: [{ displayName: { type: String, required: true }, steamId: { type: String, required: true} }],
});

module.exports = model('GameModel', GameSchema);