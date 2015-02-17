var express = require('express');
var am = require('../services/AuthenticationManager');
var cm = require('../services/ClientManager');
var router = express.Router();

router.get('/', am.authenticated, function (req, res) {

    cm.getClients(function (e, c) {
        res.render('clients', {
            errors: e,
            clients: c
        });
    });

});

router.get('/add', am.authenticated, function (req, res) {
    res.render('clients-add');
});

router.post('/add', am.authenticated, function (req, res) {

    //perform validation
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;

    cm.addClient(firstname, lastname, email, phone, function (e, c, m) {
        res.render('clients-add', {
            errors: e,
            message: m,
            client: c
        });
    });
});

module.exports = router;