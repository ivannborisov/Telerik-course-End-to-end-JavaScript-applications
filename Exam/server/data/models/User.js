var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

var requiredMessage = '{PATH} is required';
var defaultAvatar = 'images/avatars/default.png';

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        username: { type: String, required: requiredMessage, unique: true },
        salt: String,
        hashPass: String,
        firstName: { type: String, required: requiredMessage},
        lastName: { type: String, required: requiredMessage},
        phoneNumber: String,
        email: { type: String, required: requiredMessage},
        avatar: { type: String, default: 'defaultAvatar' },
        numRatedPlaylists: Number
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);


    var salt = encryption.generateSalt();
    var hashPass = encryption.generateHashedPassword(salt,'ivan');
    var newUser = new User({
        username: 'ivan',
        salt:salt,
        hashPass:hashPass,
        firstName:'Ivan',
        lastName:'Borisov',
        phoneNumber: '088888888',
        email:'ivan@abv.bg',
        numRatedPlaylists:3,
        avatar: 'defaultAvatar'

    });
    newUser.save(function(err){
        if(err) console.log(err);
        else {
            console.log('New user created.');
        }
    });
};


