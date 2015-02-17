var Client = require('../models/client');

var service = {};

service.getClients = function(next){
    
    Client.find().exec(function(err, clients){
        next(err, clients);
    });

}

service.addClient = function(firstname,lastname,email,phone,next){
    
    email = email.toLowerCase();
    
    Client.findOne({
        'phone':phone
    }, function (err, user) {
        
        if (err)
            return next(err, null, "Query Error");

        if (user) {
            return next(null, false, "That phone number is already taken.");
            
        } else {
            
            var c = new Client();
            c.firstname = firstname;
            c.lastname = lastname;
            c.email = email;
            c.phone = phone;

            c.save(function (err) {
                if (err)
                    return done(err);
                
                return next(null, c, null);
            });
        }
    });
}

module.exports = service;