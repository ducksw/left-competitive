const mn = {};
const Video = require('../models/VideoModel');
const Steam = require('../models/UserSteamModels');

mn.index = async (req, res) => {
  try {
    const videos = await Video.find();
    const steam = await Steam.find();

    const video_length = videos.length;
    const steam_length = steam.length;

    videos.reverse();
    console.log("videos encontrados", videos, video_length);
    console.log("USUARIOS STEAM", steam);

    res.render('main', { videos, video_length, steam, steam_length });
  } catch (error) {
    console.log(error);
  }
}

module.exports = mn;