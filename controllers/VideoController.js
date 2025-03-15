const vd = {};
const Video = require('../models/VideoModel');

vd.index = async (req, res) => {
  try {
    const videos = await Video.find();
    const video_length = videos.length;

    videos.reverse();
    console.log("videos encontrados", videos, video_length);

    res.render('main', { videos, video_length });
  } catch (error) {
    console.log(error);
  }
}

vd.video_create = async (req, res) => {
  try {
    const { title_link, link_yt } = req.body;

    const newVideo = new Video({
      title_link,
      link_yt,
    });

    console.log(newVideo);
    await newVideo.save();

    res.redirect('play.html');
  } catch (error) {
    console.log(error);
  }
}

module.exports = vd;