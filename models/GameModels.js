const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GameSchema = new Schema({ 
  code: { type: String, unique: true, require: true },
  players: [{ steamId: String, displayName: String, avatar: String }],
  teamA: [{ steamId: String, displayName: String, avatar: String, points: { type: Number, default: 0 } }],
  teamB: [{ steamId: String, displayName: String, avatar: String, points: { type: Number, default: 0 } }],
});

module.exports = model('GameModel', GameSchema);
