const express = require('express');
const router = express.Router();

const VIDEO = require('./controllers/VideoController');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  router.post('/play.html', VIDEO.video_create);
  router.get('/play.html', VIDEO.index);

  app.use(router);
}