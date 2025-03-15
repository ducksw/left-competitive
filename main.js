const express = require('express');
const connectDB = require('./database');
const routes = require('./route');

const app = express();
const port = 3000;

// ### CONFIG HBS ###
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNECT DATABASE
connectDB();

// rutas 
routes(app);

app.listen(port, () => {
  console.log(`The app listening on port http://localhost:${port}/`);
});