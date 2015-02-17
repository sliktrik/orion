var User = require('../models/user');
var md5 = require('MD5');

var service = {};

service.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    
    var pass = md5(password);
    email = email.toLowerCase();

    process.nextTick(function () {
        User.findOne({
            'email': email
        }, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return next(err, null, "Query Error");

            // if no user is found, return the message
            if (!user)
                return next(null, false, "No user found.");
            
            if (user.password != pass)
                return next(null, false, "Inccorect password.");

            // all is well, return user
            else{
                updateSession(req,user,true);
                return next(null, user, "user found.");
            }
        });
    });
}

service.logout = function (req, next) {
    
    req.session.isAuthenticated = false;
    req.session.user = null;
    
    next();
}

service.register = function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    email = email.toLowerCase();

    User.findOne({
        'email': email
    }, function (err, user) {
        // if there are any errors, return the error
        if (err)
            return next(err, null, "Query Error");

        // if no user is found, return the message
        if (user) {
            return next(null, false, "That email is already taken.");
        } else {
            
            var u = new User();
            u.firstname = firstname;
            u.lastname = lastname;
            u.email = email;
            u.password = md5(password);

            u.save(function (err) {
                if (err)
                    return done(err);
                
                updateSession(req,u,true);
                return next(null, u, "User successfully registered");
            });
        }
    });

}

service.authenticated = function (req, res, next) {
    
    if (req.session.isAuthenticated)
        return next();

    res.redirect('/login');
}

function updateSession(req, user, authenticated){

    var hour = 6400000
    req.session.cookie.expires = new Date(Date.now() + hour)
    req.session.cookie.maxAge = hour
    
    req.session.user = user;
    req.session.isAuthenticated = authenticated;
}

module.exports = service;