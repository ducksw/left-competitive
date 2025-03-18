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

  app.use(router);
}