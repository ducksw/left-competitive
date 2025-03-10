const express = require('express');
const connectDB = require('./database');

const app = express();
const port = 3000;

// ### CONFIG HBS ###
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set('view engine', 'hbs');

// CONNECT DATABASE
connectDB();

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/prueba', (req, res) => {
  res.send("prueba")
});

app.listen(port, () => {
  console.log(`The app listening on port http://localhost:${port}/`);
});