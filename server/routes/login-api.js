var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../../config.json');

var MailboxlayerWrapper = new (require('../wrappers/mailboxlayer'))(config.mailboxKey);

var User = require('../models/user.js');

// Registration
router.post('/register', function(req, res, next) {

    MailboxlayerWrapper.validateEmail(req.body.email, function(succ) {

        console.log(succ);

        if (succ.format_valid === false) {
            return res.status(500).json({
                err: "Invalid email"
            });
        }

        passport.authenticate('local.signup', function(err, user, info) {

            if (err) {
                console.log("Error Registering Account[local.signup.err]: (", err, ")");
                return res.status(500).json({
                    err: "User already exists!"
                });
            }

            if (user === false) {
                console.log("Error Registering Account[local.signup.user]: (", info, ")");
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


});

// Login
router.post('/login', function(req, res, next) {
    passport.authenticate('local.signin', function(err, user, info) {

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
                status: 'User signed in',
                user: {
                    "email": user.username
                }
            });
            console.log("User:LoggedIn(", user,")");
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

    res.status(200).json({
        status: true,
        user: req.user
    });
});


module.exports = router;
