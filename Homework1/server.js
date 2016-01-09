/**
 * Created by Ivan on 1/6/2016.
 */
var http = require('http'),
    formidable = require('formidable'),
    url = require('url'),
    fs = require('fs');

var port = 1234;

http.createServer(function(req, res) {

    var parsedUrl = url.parse(req.url);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });


    if(parsedUrl.path === '/'){

        res.write('Upload File');
        res.write('<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="userfile" />'+
                  '<input type="submit" value="Upload"></form>'
        );
    }
    if(req.method.toLowerCase() == 'post' && parsedUrl.path === '/upload'){
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname + "/files";
        var uploadDirLen = form.uploadDir.length + 1;
        form.keepExtensions = true;
        var fileName;
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/html'});
            fileName = files['userfile'].path.substring(uploadDirLen);
            res.write('Successful upload! You can download your file from <a href="/file/'+ fileName + '">Here </a>');
            res.end();
        });

        return;
    }
    var splitUrl = parsedUrl.path.substring(1).split('/');
    if( splitUrl[0] === 'file' && splitUrl.length === 2){
        var fileName = splitUrl[1];

        fs.readdir('./files', function (err, files) {
            if (err) {
                res.write('Error: '+ err);
                res.end()
            }

            for(var i =0; i< files.length; i++){
                if(files[i] === fileName) {
                    res.writeHead(200, {
                        'Content-Disposition': 'attachment; filename='+fileName+';'
                    });

                    var readStream = fs.createReadStream('./files/'+fileName);
                    readStream.pipe(res);
                    return;
                }
            }
            res.end("File not found!");

        });


    }


}).listen(port);
console.log('Server running on port' + port);

