var http = require('http'),
    url = require('url'),
    templateRender = require('./render'),
    information = require('./inf');

var port = 1234;


http.createServer(function(req,res){

    var parsedUrl = url.parse(req.url);
    var model;
    switch (parsedUrl.path) {
        case  '/':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            model = {
                title: 'Mobile devices',
            };
            templateRender('views/home.jade',model, function (content) {
                res.write(content);
                res.end();
            });
            break;
        case  '/phones':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            model = {
                title: 'Phones',
                phones: information.phones
            };
            templateRender('views/phones.jade',model, function (content) {
                res.write(content);
                res.end();
            });
            break;
        case  '/tablets':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            model = {
                title: 'Tablets',
                tablets: information.tablets
            };
            templateRender('views/tablets.jade',model, function (content) {
                res.write(content);
                res.end();
            });
            break;
        case  '/wearables':
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            model = {
                title: 'Wearables',
                wearables: information.wearables
            };
            templateRender('views/wearables.jade',model, function (content) {
                res.write(content);
                res.end();
            });
            break;
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.write('404 page not found <a href="/">Back to Home page</a>');
            res.end();
            break;
    }
}).listen(port);
console.log('Server listening on port:' + port);
