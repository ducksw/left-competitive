const gm = {};
const Game = require('../models/GameModels');
const Video = require('../models/VideoModel');
const Steam = require('../models/UserSteamModels');

const { randomNumber } = require('../helpers/random');

gm.indexGame = async (req, res) => {
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

    res.render('versus', { game, isCreator, video_i, steam, gm, video_length, steam_length, game_length });
  } catch (error) {
    console.log(error);
  }
}

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

    res.redirect(`/play.html/versus?code=${code}`);
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

    res.redirect(`/play.html/versus?code=${code}`);
  } catch (error) {
    console.error("Error al unirse a la partida:", error);
    res.status(500).send("Error al unirse a la partida.");
  }
}

gm.deletePlayer = async (req, res) => {
  try {
    const { code, playerSteamId } = req.body;

    if (!code || !playerSteamId) {
      return res.status(400).json({ message: "Faltan datos: código de partida o SteamID." });
    }

    const game = await Game.findOne({ code });

    if (!game) {
      return res.status(404).json({ message: "Partida no encontrada." });
    }

    const creatorSteamId = game.players[0].steamId;

    if (req.session.steamId !== creatorSteamId) {
      return res.status(403).json({ message: "No tienes permisos para eliminar jugadores." });
    }

    const initLength = game.players.length;
    game.players = game.players.filter(player => player.steamId !== playerSteamId);

    if (game.players.length === initLength) {
      return res.status(404).json({ message: "El jugador no está en la partida." });
    }

    await game.save();

    return res.status(200).json({ success: true, message: "Jugador eliminado con éxito." });

  } catch (error) {
    console.error(error);
  }
}

gm.allAgame = async (req, res) => {
  try {
    const games = await Game.find();
    console.log(games);

    res.render('games', { games });
  } catch (error) {
    console.log(error);
  }
}

gm.match = async (req, res) => {
  try {
    const { code } = req.body;

    const game = await Game.findOne({ code });

    let players = [...game.players];

    if (players.length < 2) {
      return res.send("NO HAY SUFICIENTES JUGADORES");
    }

    players = players.sort(() => Math.random() - 0.5); // combinar judaores aleatoriamente

    const teamA = players.slice(0, Math.ceil(players.length / 2));
    const teamB = players.slice(Math.ceil(players.length / 2));

    game.teamA = teamA;
    game.teamB = teamB;

    await game.save();

    console.log("Emparejamiento completado:");
    console.log("Team A:", teamA);
    console.log("Team B:", teamB);

    res.json({ teamA, teamB });

  } catch (error) {
    console.log(error);
  }
}

module.exports = gm;
