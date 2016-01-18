var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/user/profile/:username',controllers.users.profile);

    app.get('/playlist/create',auth.isAuthenticated ,controllers.playlists.getCreate);
    app.post('/playlist/create',auth.isAuthenticated ,controllers.playlists.postCreate);

    app.get('/playlist/own', auth.isAuthenticated, controllers.playlists.getMyPlaylists);
    app.get('/playlist/details/:id', controllers.playlists.getOnePlaylist);

    app.get('/playlist/addurls/:id', auth.isAuthenticated, controllers.playlists.getAddUrls);   // To do middleware currUser == playlist Owner
    app.post('/playlist/addurls/:id', auth.isAuthenticated, controllers.playlists.postAddUrls); // To do middleware currUser == playlist Owner

    app.post('/playlist/rate',auth.isAuthenticated, controllers.playlists.ratePlaylist );

    app.get('/', controllers.home.homePage );

    app.get('*', function(req, res) {
        res.render('index');
    });
};