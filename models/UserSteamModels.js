const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SteamUserSchema = new Schema({
  steamId: { type: String, required: true, unique: true },
  displayName: { type: String },
  avatar: { type: String },
});

module.exports = model('UserSteamModel', SteamUserSchema);