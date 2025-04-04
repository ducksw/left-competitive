import Steam from '../models/UserSteamModels.js';
import Game from '../models/GameModels.js';

const adm = {};

adm.adminBoard = async (req, res) => {
  const steam = await Steam.find();
  steam.sort((a, b) => (b.elo || 800) - (a.elo || 800));
  console.log(steam);
  res.render('admins/admin', { steam });
}

adm.userClick = async (req, res) => {
  try {
    const steamId = req.query.id;
    const users = await Steam.findOne({ steamId: steamId});
    const all_user = await Steam.find();

    all_user.sort((a, b) => (b.elo || 800) - (a.elo || 800));
    console.log("ALL USER", all_user);

    res.render('admins/user', { users, all_user });
  } catch (error) {
    console.log(error);
  }
}

adm.edit = async (req, res) => {
  try {
    const steamId = req.query.id;
    const user = await Steam.findOne({steamId: steamId});

    res.render('admins/user', { user });
  } catch (error) {
    console.log(error);
  }
}

adm.update = async (req, res) => {
  try {
    const steamId = req.query.id;
    const updateData = req.body;

    await Steam.findOneAndUpdate({ steamId: steamId }, updateData, { new: true });

    res.redirect(`/play.html/admin/steam?id=${steamId}`);

  } catch (error) {
    console.log(error);
  }
}

adm.all_game = async (req, res) => {
  try {
    const games = await Game.find();
    games.reverse();

    console.log(games);

    res.render('admins/teams', { games });
  } catch (error) {
    console.log(error);
  }
}

adm.gameViews = async (req, res) => {
  try {
    const gameId = req.query.id;
    const game = await Game.findOne({ code: gameId });

    console.log(game);

    res.render('admins/teams-code', { game });

  } catch (error) {
    console.log(error);
  }
}

adm.updateGame = async (req, res) => {
  try {
    const gameId = req.query.id;
    console.log("game id", gameId);
    const updateData = req.body;

    await Game.findOneAndUpdate({ code: gameId }, updateData, { new: true });
    res.redirect(`/play.html/admin/tm?id=${gameId}`);
    //res.redirect(`/play.html/admin/teams`);
    //res.render("team-code", { game: updatedGame });
  } catch (error) {
    console.log(error);
  }
}


export default adm;
