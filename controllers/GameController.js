const gm = {};
const Game = require('../models/GameModels');
const { randomNumber } = require('../helpers/random');

gm.createGame = async (req, res) => {
  try {
    if (!req.session.steamId) {
      return res.status(401).send("Debes iniciar sesión con Steam para crear una partida.");
    }

    const code = randomNumber();
    const userSteamId = req.session.steamId;
    const displayName = req.session.displayName;
    const avatar = req.session.avatar;

    const newGame = new Game({
      code,
      players: [{ steamId: userSteamId, displayName, avatar }],
    });

    await newGame.save();
    console.log(`Partida creada (${code}) por ${displayName}`);

    res.redirect(`/play.html?code=${code}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear la partida.");
  }
}

gm.joinGame = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/auth/steam');
    }

    const { code } = req.body;
    const steamId = req.session.steamId;
    const displayName = req.session.displayName;
    const avatar = req.session.avatar;
    console.log(steamId);

    const game = await Game.findOne({ code });

    if (!game) {
      console.error("Código de partida inválido.");
      return res.status(404).send("Partida no encontrada.");
    }

    if (game.players.length >= 8) {
      console.log("LA PARTIDA YA ESTA LLENA");
      return 0;
    }

    if (game.players.some(player => player.steamId === steamId)) {
      console.log(`${displayName} ya esta en la partida`);
    } else {
      game.players.push({steamId, displayName, avatar});
      await game.save();
      console.log(game.players.length,"/8");
      console.log(`${displayName} se unio a la partida ${code}`);
    }

    res.redirect(`/play.html?code=${code}`);
  } catch (error) {
    console.error("Error al unirse a la partida:", error);
    res.status(500).send("Error al unirse a la partida.");
  }
};

module.exports = gm;