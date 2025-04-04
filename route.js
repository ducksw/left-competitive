import express from 'express';
const router = express.Router();

import VIDEO from './controllers/VideoController.js';
import MAIN from './controllers/MainController.js';
import GAME from './controllers/GameController.js';
import ADMIN from './controllers/AdminController.js';
import PLAYER from './controllers/PlayerController.js';

export default (app) => {
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
	router.get('/play.html/player', PLAYER.viewProfile);

	// ADMIN
	router.get('/play.html/admin', ADMIN.adminBoard);
	router.get('/play.html/admin/steam', ADMIN.userClick);
	router.post('/play.html/admin/steam/update', ADMIN.update);
	router.get('/play.html/match', GAME.matchView);
	router.get('/play.html/admin/teams', ADMIN.all_game);

	router.get('/play.html/admin/tm', ADMIN.gameViews);
	router.post('/play.html/admin/updateGame', ADMIN.updateGame);

	app.use(router);
}
