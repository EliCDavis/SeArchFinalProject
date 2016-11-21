var express = require('express');
var router = express.Router();
var passport = require('passport');
<<<<<<< HEAD
=======
var config = require('../../config.json');

var MailboxlayerWrapper = new (require('../wrappers/mailboxlayer'))(config.mailboxKey);
>>>>>>> master

var User = require('../models/user.js');

// Registration
<<<<<<< HEAD
router.post('/register', function(req, res) {
    User.register(new User({
            username: req.body.username
        }),
        req.body.password,
        function(err, account) {
            if (err) {
=======
router.post('/register', function(req, res, next) {

    MailboxlayerWrapper.validateEmail(req.body.email, function(succ) {

        if (succ.smtp_check === false) {
            return res.status(500).json({
                err: "Invalid email"
            });
        }

        passport.authenticate('local.signup', function(err, user, info) {

            if (err) {
                console.log("Error Registering Account: (", err, ")");
>>>>>>> master
                return res.status(500).json({
                    err: err
                });
            }
<<<<<<< HEAD
            passport.authenticate('local')(req, res, function() {
                return res.status(200).json({
                    status: 'New user registered'
                });
            });
        });
=======

            if (user === false) {
                console.log("Error Registering Account: (", info, ")");
                return res.status(500).json({
                    err: info.message
                });
            }

            return res.status(200).json({
                status: 'New user registered'
            });

        })(req, res, next);

    }, function(err) {
        console.log("Error hitting mailbox, err: ", err);
        return res.status(500).json({
            err: err
        });
    });


>>>>>>> master
});

// Login
router.post('/login', function(req, res, next) {
<<<<<<< HEAD
    passport.authenticate('local', function(err, user, info) {
=======
    passport.authenticate('local.signin', function(err, user, info) {

>>>>>>> master
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
<<<<<<< HEAD
                status: 'User signed in'
            });
=======
                status: 'User signed in',
                user: {
                    "email": user.username
                }
            });
            console.log("User:LoggedIn(", user,")");
>>>>>>> master
        });
    })(req, res, next);
});

// Log Out
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'User signed out'
    });
});

// Login authentication
// Will return false if username or password do not match, and true if both do
router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
<<<<<<< HEAD
    res.status(200).json({
        status: true
=======

    res.status(200).json({
        status: true,
        user: req.user
>>>>>>> master
    });
});


module.exports = router;
