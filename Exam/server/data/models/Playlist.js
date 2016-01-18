var mongoose = require('mongoose');

var requiredMessage = '{PATH} is required';

module.exports.init = function() {

    var playlistSchema = mongoose.Schema({
        title: { type: String, required: requiredMessage},
        description: String,
        category: {type: String, required: requiredMessage},
        videoUrls: [String],
        creator: { type: String, required: requiredMessage },
        creationDate: {type: Date, required: requiredMessage},
        private: {type: Boolean, required:requiredMessage},
        totalRating: {type: Number},
        rating: {type: Number},
        numRates: {type: Number},
        visibleFor: [
            {user: String}
        ]
    });



    //Sample DATA


    var Playlist = mongoose.model('Playlist', playlistSchema);

    var newPlaylist = new Playlist({
        title: 'Playlist 1',
        description: 'First Playlist',
        category: 'Hip Hop',
        videoUrls: [
            'https://www.youtube.com/watch?v=HF2JSmH256U',
            'https://www.youtube.com/watch?v=HF2JSmH256U',
            'https://www.youtube.com/watch?v=HF2JSmH256U'
        ],
        creator: 'ivan',
        creationDate: new Date(),
        private: false,
        totalRating: 10,
        rating: 5,
        numRates: 2,
        visibleFor: []
    });
    newPlaylist.save(function(err){
        if(err) console.log(err);
        else {
            console.log('New playlist created.');
        }
    });
    newPlaylist = new Playlist({
        title: 'Playlist 2',
        description: 'Second Playlist',
        category: 'Other',
        videoUrls: [
            'https://www.youtube.com/watch?v=HF2JSmH256U',
            'https://www.youtube.com/watch?v=HF2JSmH256U',
            'https://www.youtube.com/watch?v=HF2JSmH256U'
        ],
        creator: 'ivan',
        creationDate: new Date(),
        private: false,
        totalRating: 12,
        rating: 4,
        numRates: 3,
        visibleFor: []
    });
    newPlaylist.save(function(err){
        if(err) console.log(err);
        else {
            console.log('New playlist created.');
        }
    });
    newPlaylist = new Playlist({
        title: 'Playlist 3',
        description: 'Thirth Playlist',
        category: 'Movies',
        videoUrls: [
            'https://www.youtube.com/watch?v=HF2JSmH256U',
            'https://www.youtube.com/watch?v=HF2JSmH256U',
            'https://www.youtube.com/watch?v=HF2JSmH256U'
        ],
        creator: 'ivan',
        creationDate: new Date(),
        private: false,
        totalRating: 10,
        rating: 5,
        numRates: 2,
        visibleFor: []
    });
    newPlaylist.save(function(err){
        if(err) console.log(err);
        else {
            console.log('New playlist created.');
        }
    });


}