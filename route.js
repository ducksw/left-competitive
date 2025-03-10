const express = require('express');
const router = express.Router();

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.use(router);
}