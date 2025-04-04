import Video from '../models/VideoModel.js'

const vd = {};

vd.video_create = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      //return res.send("Debes iniciar sesión con Steam para subir clips");
      return res.render('errors/sign_in');
    }

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
    const videos = await Video.findById({ _id: video_id });
    const all_clip = await Video.find();
    all_clip.reverse();
    res.render('clips', { videos, all_clip, video_id });
  } catch (error) {
    console.log(error);
  }
}

export default vd;