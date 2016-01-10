var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

var Message = require('./models/Message');
var User = require('./models/User');

module.exports = {
    registerUser: function (user){
        var new_user = new User ({
            user: user.user,
            password: user.pass
        });
        new_user.save(function(err){
            if(err) throw err;
            console.log('New user created.');
        });
    },
    sendMessage: function(mess){
        var new_mess = new Message({
            from: mess.from,
            to: mess.to,
            text: mess.text
        });
        new_mess.save(function(err){
            if(err) throw err;
            console.log('New message created.');
        });
    },
    getMessages: function (users){

       return Message.find()
            .where('from') .equals(users.with)
            .where('to').equals(users.and)
            .exec(function (err,mess){
                if(err) throw err;


            });

    }
}

