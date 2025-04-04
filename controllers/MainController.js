import Video from '../models/VideoModel.js'
import Steam from '../models/UserSteamModels.js';
import Game from '../models/GameModels.js';

const mn = {};

mn.index = async (req, res) => {
  try {
    const video_i = await Video.find();
    const steam = await Steam.find();
    const gm = await Game.find();

    // ID DE LOS ADMINS
    const aldoId = "76561199153288700";
    const ducksId = "76561199093444412";

    // logica para ver quien tiene mas elo
    steam.sort((a, b) => (b.elo || 800) - (a.elo || 800));

    const video_length = video_i.length;
    const steam_length = steam.length;
    const game_length = gm.length;
    video_i.reverse();


    const userId = req.session.steamId; // id session steam

    // Comparar si existe la id
    const showAdminButton = (userId === aldoId || userId === ducksId);

    res.render('main', { video_i, video_length, steam, steam_length, game_length, showAdminButton: showAdminButton });
  } catch (error) {
    console.log(error);
  }
}


export default mn;