import Steam from '../models/UserSteamModels.js'

const pl = {};

pl.viewProfile = async (req, res) => {
  try {
    const steamId = req.query.steam;
    console.log("id recibido", steamId);
    const player = await Steam.findOne({ steamId: steamId });

    const steam = await Steam.find();
    steam.sort((a, b) => (b.elo || 800) - (a.elo || 800));

    console.log("player", player);

    res.render('player', { player, steam });
  } catch (error) {
    console.log(error);
  }
}

export default pl;