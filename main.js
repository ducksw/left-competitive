const express = require('express');
const connectDB = require('./database');
const routes = require('./route');
const routesSteam = require('./routeSteam');

const session = require("express-session");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;

const SteamUser = require("./models/UserSteamModels");

const app = express();

// @index + 1
const hbs = require('hbs');
hbs.registerHelper('increment', function(value) {
  return value + 1;
});

// ### CONFIG HBS ###

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ### STEAM ###
app.use(
  session({
    secret: "secreto_super_seguro",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.displayName = req.session.displayName;
  res.locals.avatar = req.session.avatar;
  res.locals.profileurl = req.session.profileurl;
  next();
});

// #### Configurar Passport con Steam ####

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: process.env.API_STEAM,
    },
    async (identifier, profile, done) => {
      try {
        console.log("Profile recibido:", JSON.stringify(profile, null, 2));

        let user = await SteamUser.findOne({ steamId: profile.id });

        if (!user) {
          user = new SteamUser({
            steamId: profile.id,
            displayName: profile.displayName,
            profileurl: profile._json.profileurl,
            elo: profile.elo,
            avatar: profile.photos[2].value,
          });

          await user.save();
          console.log("Usuario guardado en la base de datos.");
        } else {
          console.log("Usuario ya registrado.");
        }

        return done(null, user);
      } catch (error) {
        console.error("Error al autenticar:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

// CONNECT DATABASE
connectDB();

// rutas 
routes(app);
routesSteam(app);

app.listen(process.env.PORT, () => {
  console.log(`The app listening on port http://localhost:${process.env.PORT}/`);
});
