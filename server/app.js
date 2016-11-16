var path = require('path');

// Grab configurations for launch
var config = require('../config.json');
var port = config.port || 3000;

// Grab our API wrappers
var TwitterWrapper = new(require('./wrappers/twitter'))();
var TradierWrapper = new(require('./wrappers/tradier'))(config.tradierKey);
var MailboxlayerWrapper = new(require('./wrappers/mailboxlayer'))(config.mailboxKey);

// Dependencies
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var routes = require('./routes/api.js');

// mongoose
mongoose.connect('mongodb://localhost/mean-auth');

// User schema/model
var User = require('./models/user.js');

// Set up server
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

// Set up API
app.get('/api/twitter', TwitterWrapper.get);
app.get('/api/getSymbol/:symbol', TradierWrapper.getSymbol);
app.get('/api/validateEmail/:email', MailboxlayerWrapper.validateEmailRequest);

// Define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'itsasecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/user/', routes);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

module.exports = app;

// Launch server
app.listen(port, function() {
    console.log('Tradenet launched on port ' + port + '.');
});
