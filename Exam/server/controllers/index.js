var UsersController = require('./UsersController'),
    HomeController = require('./HomeController'),
    PlaylistsController = require('./PlaylistsController');

module.exports = {
    users: UsersController,
    playlists: PlaylistsController,
    home:HomeController
};