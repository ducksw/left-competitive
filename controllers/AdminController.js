const adm = {};
const Steam = require('../models/UserSteamModels');
const Game = require('../models/GameModels');

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
    const game = await Game.find();

    res.render('admins/teams', { game });
  } catch (error) {
    console.log(error);
  }
}

module.exports = adm;