const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SteamUserSchema = new Schema({
  steamId: { type: String, required: true, unique: true },
  displayName: { type: String },
  avatar: { type: String },
  profileurl: { type: String },
  elo: { type: String, default: "800" },
  //point: { type: String },
});

module.exports = model('UserSteamModel', SteamUserSchema);
