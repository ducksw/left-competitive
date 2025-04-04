import { fileURLToPath } from 'url';
import path from 'path';
import SteamUser from './models/UserSteamModels.js';
import express from 'express';
import connectDB from './database.js';
import routes from './route.js';
import routesSteam from './routeSteam.js';
import session from 'express-session';
import passport from 'passport';
import SteamStrategy from 'passport-steam';
import moment from 'moment';
import hbs from 'hbs';


//const SteamStrategy = require("passport-steam").Strategy;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// @index + 1
hbs.registerHelper('increment', function(value) {
	return value + 1;
});

hbs.registerHelper('timeago', function(timecreated) {
    return moment(timecreated).format('DD/MM/YYYY');
});


// lte -> detecta los 3 primero de la tabla
hbs.registerHelper('lte', function (a, b, options) {
    return a <= b ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('eq', function(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});


// ### CONFIG HBS ###
hbs.registerPartials(path.join(__dirname, '/views/partials'), function () {});
app.use(express.static(path.join(__dirname, '/public')));
app.set("views", path.join(__dirname, '/views'));
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
						timecreated: new Date(profile._json.timecreated * 1000),
						personastate: profile._json.personastate,
						realname: profile._json.realname,
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
