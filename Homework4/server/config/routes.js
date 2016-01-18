var phoneController= require('../controllers/phoneController');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // modified here  or user file.mimetype
    }
});

module.exports = function (app) {
    app.get('/',function (req,res){
        res.render('home', {title:'Smart phones'});
    });
    app.get('/phones',phoneController.getPhones);

    app.get('/addphone',phoneController.addPhone);

    app.post('/phones/create',multer({ storage: storage }).single('picture'), phoneController.createPhone );

}