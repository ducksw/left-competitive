const vd = {};
const Video = require('../models/VideoModel');

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

vd.video_view = async (req, res) => {
  try {
    const video_id = req.query.id;
    const videos = await Video.findById({_id: video_id});
    res.render('clips', { video_id, videos });
  } catch (error) {
    console.log(error);
  }
}

module.exports = vd;