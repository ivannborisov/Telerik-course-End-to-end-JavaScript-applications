var playlists = require('../data/playlists'),
    users = require('../data/users'),
    constants = require('../common/constants');

var CONTROLLER_NAME = 'playlists';

module.exports = {

    getCreate: function(req,res){
        res.render(CONTROLLER_NAME + '/create', {
            categories: constants.categories
        });
    },
    postCreate: function(req,res) {
        var playlist = req.body;
        var user = req.user;

        playlists.create(
            playlist,
            user.username,
            function (err, event) {
                if (err) {
                    var data = {
                        categories: constants.categories,
                        errorMessage: err
                    };
                    res.render(CONTROLLER_NAME + '/create', data);
                }
                else {
                    console.log(event);
                    res.redirect('/');
                }
            }
        );
    },
    getMyPlaylists: function(req,res){
        playlists.myPlaylists(req.user.username,function(err, data) {
            res.render(CONTROLLER_NAME + '/myplaylists', {
                playlists: data
            });
        });
    },
    getOnePlaylist: function(req,res){

        playlists.getOne(req.params.id,function(err,playlist){
            if(err){
                console.log(err);
                return;
            }
            if(playlist.private === true && req.user && playlist.visibleFor.indexOf(req.user.username) < 0){
                res.redirect('/');
            }
            if(playlist.private === true  ){
                res.redirect('/login');
            }

            res.render(CONTROLLER_NAME + '/details', {
                playlist: playlist
            });
        });

    },
    getAddUrls: function(req,res){
        res.render(CONTROLLER_NAME + '/addurls', {urls:{url1: '',url2: '', url3: '', url4: '', url5:''}});
    },
    postAddUrls: function(req,res){
        var urls = req.body;
        var playlistId = req.params.id;


        playlists.addUrls(req.user.numRatedPlaylists, urls,playlistId, function(err,playlist){
            if(err){
                errorMessage = err;
                res.render(CONTROLLER_NAME + '/addurls', {urls: urls, errorMessage:errorMessage});
            }
            else {
                res.redirect('/playlist/details/'+playlistId );
            }

        });
    },
    ratePlaylist:function(req,res){
        var rating = req.body;

        playlists.rate(rating,function(err,playlist){
            if(err){
                console.log(err);
            }
            users.increaseRates(req.user.username, function (err){
                if(err){
                    console.log(err);
                }
            });
            res.redirect('/playlist/details/'+playlist._id );
        });

    }


}