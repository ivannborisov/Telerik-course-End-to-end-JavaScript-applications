var User = require('mongoose').model('User');

module.exports = {
    create: function(user, callback) {

        user.numRatedPlaylists = 0;
        User.create(user,callback);
    },
    increaseRates: function(user,callback){
        User.findOne({ username: user }, function (err, user) {
            if (err) {
                callback(err);
                return;
            }
            user.numRatedPlaylists =  user.numRatedPlaylists + 1;
            user.save();
        });
    },
    profile: function (user,callback) {
        User.findOne({ username: user }, function (err, user) {
            if (err) {
                callback(err);
                return;
            }
            callback(err,user);
        });
    }
};