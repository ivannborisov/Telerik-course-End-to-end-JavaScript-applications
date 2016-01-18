db = require('../config/db');

exports.listPhones = function () {
    return db.phones;
};

exports.addPhone = function (phone) {
    db.phones_id = db.phones_id + 1;
    phone.id = db.phones_id;
    db.phones[phone.id] = phone;
};

exports.getPhoneById = function (id) {
    return db.phones[id];
};

exports.deletePhone = function (id) {
    db.phones[id].remove();
};

exports.updatePhone = function (phone) {
    db.phones[phone.id] = phone;
};
