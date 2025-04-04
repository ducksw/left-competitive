import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SteamUserSchema = new Schema({
  steamId: { type: String, required: true, unique: true },
  displayName: { type: String },
  avatar: { type: String },
  profileurl: { type: String },
  elo: { type: String, default: "800" },
  damage: { type: String, default: "0"},
  kills: { type: String, default: "0"},
  win: { type: String, default: "0" },
  loser: { type: String, default: "0" },
  timecreated: { type: Date },
  personastate: { type: String },
  realname: { type: String },
});

SteamUserSchema.pre('save', function(next) {
  if (this.timecreated) {
    let date = new Date(this.timecreated);
    this.timecreated = date;
  }
  next();
});

export default model('UserSteamModel', SteamUserSchema);