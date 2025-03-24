const express = require('express');
const router = express.Router();

const VIDEO = require('./controllers/VideoController');
//const STEAM = require('./controllers/UserSteamController');
const MAIN = require('./controllers/MainController');
const GAME = require('./controllers/GameController');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  router.post('/play.html', VIDEO.video_create);
  router.get('/play.html', MAIN.index);
  router.get('/play.html/clip', VIDEO.video_view);
  router.post('/play.html/createGame', GAME.createGame);
  router.post('/joinGame', GAME.joinGame);
  router.get('/play.html/game', GAME.allAgame);
  router.get('/play.html/versus', GAME.indexGame);
  router.post('/deletePlayer', GAME.deletePlayer);
  router.post('/match', GAME.match);
  router.get('/play.html/match', GAME.matchView);
  router.get('/play.html/stats', GAME.stats);

  // ADMIN
  router.get('/play.html/admin', GAME.adminBoard);

  app.use(router);
}
