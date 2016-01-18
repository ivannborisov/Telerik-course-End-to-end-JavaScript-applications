var playlists = require('../data/playlists');

module.exports = {

    homePage: function(req, res) {
        playlists.mostRated(8, function(err,playlists){
            if(err){
                console.log('Error with most rated playlists' + err);
            }
            res.render('index', {mostRatedPl: playlists});
        });



    }
}
