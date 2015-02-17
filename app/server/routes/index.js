var express = require('express');
var am = require('../services/AuthenticationManager');
var router = express.Router();

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res) {

    am.login(req, res, function (err, user, msg) {
        if(user)
            res.redirect('/');
        else
            res.json(msg);
    });

});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {

    am.register(req, res, function (err, user, msg) {

        if (user) {
            console.log(req.user);
        }

        res.json(msg);
    });

});

router.get('/logout', am.authenticated, function (req, res) {

    am.logout(req, function () {
        res.redirect('/login');
    });

});

router.get('/', am.authenticated, function (req, res) {
    console.log(req.session.user)
    res.render('index', {user:req.session.user});
});

module.exports = router;