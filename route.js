const express = require('express');
const router = express.Router();

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/play.html', (req, res) => {
    res.render('main');
  });

  app.use(router);
}
