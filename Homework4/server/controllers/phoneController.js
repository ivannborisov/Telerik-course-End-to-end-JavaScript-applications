var Phones = require('../models/Phones');


module.exports = {
    getPhones: function(req,res){
        var model = {
            title: 'Phones',
            phones: Phones.listPhones()
        }
        res.render('phones', model);
    },
    addPhone: function (req,res){
        var model = {
            title: 'Add new phone'
        }
        res.render('addphone', model);
    },
    createPhone:function (req,res){

        var new_phone = {
            name:req.body.model,
            year: req.body.year,
            review:req.body.review,
            pic: 'uploads/'+req.file.filename
        };
        Phones.addPhone(new_phone);

        res.redirect('/phones');
    }

}