var jade = require('jade'),
    fs = require('fs');

module.exports = function (templateFilePath,model,callback) {
    fs.readFile(templateFilePath, 'utf-8', function(err, content) {
        if(err){
            throw err;
        }
        var template = jade.compile(content, {filename: templateFilePath });

        model.menuLinks = [{link:'/',text:'Home'},{link:'phones',text:'Phones'},{link:'tablets',text:'Tablets'},{link:'wearables',text:'Wearables'}];
        var output = template(model);

        return callback(output)
    });
};


