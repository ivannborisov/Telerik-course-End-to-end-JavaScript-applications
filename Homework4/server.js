var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    http = require('http'),
    jade = require('jade');

var app = express();

app.set('port', process.env.PORT || 3000);


app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

require('./server/config/routes.js')(app);


var server = http.createServer(app);
server.listen(app.get('port'),function (){
   console.log('Server listening on port: ' + app.get('port'));
});




