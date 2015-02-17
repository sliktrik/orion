var mongoose = require('mongoose');

var clientSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Client', clientSchema);