var Playlist = require('mongoose').model('Playlist');

var URL_START_WITH = 'https://www.youtube.com/watch?';

var cache = {
    expires: undefined,
    data: undefined
};

module.exports = {
    create: function(playlist,username,callback){
        playlist.creator = username;
        playlist.creationDate = new Date();
        if(playlist.private === 'on'){
            playlist.private = true;
        }
        else {
            playlist.private = false;
        }
        playlist.rating = 0;
        playlist.totalRating = 0;
        playlist.numRates = 0;

        Playlist.create(playlist, callback);
    },
    myPlaylists: function(username,callback) {
        Playlist.find()
            .where('creator').equals(username)
            .exec(function (err, data) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(err, data);
            });
    },
    getOne: function (id, callback){
        Playlist.findOne()
            .where('_id').equals(id)
            .exec(function (err, playlist){
                if (err) {
                    callback(err);
                    return;
                }
                callback(err, playlist);
            });
    },
    addUrls: function (numRatedPlaylists, urls,playlistId, callback){

        Playlist.findOne({ _id: playlistId }, function (err, playlist){
            if (err) {
                callback(err);
                return;
            }
            var newUrls = [];
            var currUrl;
            for(var i =1; i < 5; i++){
                currUrl = urls['url'+i];
                if(currUrl !== ''){

                    if(currUrl.slice(0, URL_START_WITH.length) == URL_START_WITH){
                        newUrls.push(urls['url'+i]);
                    }
                    else{
                        callback('Url ' + i + ' is invalid');
                        return;
                    }

                }
            }
            if(numRatedPlaylists < 10 && (playlist.videoUrls.length + newUrls.length) > 10 ){
                callback('You can add only 10 urls.You had added '+ playlist.videoUrls.length + '/10 videos.' );
                return;
            }

            playlist.videoUrls = playlist.videoUrls.concat(newUrls);
            playlist.save();
            callback(err,playlist);
        });
    },
    rate: function (rating, callback){
        Playlist.findOne({ _id: rating.plid }, function (err, playlist){
            if (err) {
                callback(err);
                return;
            }

            playlist.totalRating = playlist.totalRating + parseInt(rating.rating);
            playlist.numRates = playlist.numRates + 1;
            playlist.rating = playlist.totalRating/ playlist.numRates;
            playlist.save();
            callback(err,playlist);
        });
    },
    mostRated: function(num, callback){


        if (cache.expires && cache.expires > new Date()) {
            callback(null, cache.data);
            return;
        }

        Playlist
            .find({private: false})
            .sort({
                rating: 'desc'
            })
            .limit(num)
            .exec(function(err,data){
                if (err) {
                    callback(err);
                    return;
                }

                callback(err, data);

                cache.data = data;
                var newDate = new Date();
                newDate.setMinutes(newDate.getMinutes() + 5);
                cache.expires =  newDate;


            });
    }


};
