const mn = {};
const Video = require('../models/VideoModel');
const Steam = require('../models/UserSteamModels');
const Game = require('../models/GameModels');

mn.index = async (req, res) => {
  try {
    const video_i = await Video.find();
    const steam = await Steam.find();
    const gm = await Game.find();

    const video_length = video_i.length;
    const steam_length = steam.length;
    const game_length = gm.length;
    video_i.reverse();

    const { code } = req.query;
    let game = null;
    let isCreator = false;

    if (code) {
      game = await Game.findOne({ code });
      if (game) {
        const userSteamId = req.session.steamId;
        isCreator = game.players.length > 0 && game.players[0].steamId === userSteamId;
      }
    }

    res.render('main', { video_i, video_length, steam, steam_length, game, isCreator, game_length });
  } catch (error) {
    console.log(error);
  }
};

module.exports = mn;