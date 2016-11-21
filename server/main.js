var path = require('path');

// Grab configurations for launch
var config = require('../config.json');
var port = config.port || 3000;

// Grab our API wrappers
<<<<<<< HEAD
var TwitterWrapper = new(require('./wrappers/twitter'))();
var TradierWrapper = new(require('./wrappers/tradier'))(config.tradierKey);
var MailboxlayerWrapper = new(require('./wrappers/mailboxlayer'))(config.mailboxKey);
=======
var TwitterWrapper = new(require('./wrappers/twitter'))(config.tw_consumer_key, 
                                                        config.tw_consumer_secret, 
                                                        config.tw_access_token_key,
                                                        config.tw_access_token_secret);
var TradierWrapper = new(require('./wrappers/tradier'))(config.tradierKey);
var QuandlWrapper = new(require('./wrappers/quandl'))(config.quandlKey);
var RedditWrapper = new(require('./wrappers/reddit'))();
>>>>>>> master

// Dependencies for the server
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');

// Setup parsers for requests
app.use(cookieParser());
app.use(bodyParser.json());
app.use(validator());

// Connect to our database
mongoose.connect('mongodb://'+config.mongo+'/user-auth');
require('./config/passport');

// Allow express to keep up with user sessions
app.use(require('express-session')({
    secret: 'itsasecret',
    resave: false,
    saveUninitialized: false
}));

// Setup oAuth for users connecting using passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Map whatever we've built from our client's src to be served
app.use(express.static(path.join(__dirname, '../client/dist')));

// Setup API
app.get('/api/twitter/:symbol', TwitterWrapper.search);
app.get('/api/getSymbol/:symbol', TradierWrapper.getSymbol);
app.get('/api/reddit/:headline', RedditWrapper.getHeadlines);
app.get('/api/getSymbolTimeSeries/:symbol', QuandlWrapper.getSymbol);
app.use('/user/', require('./routes/login-api.js'));
app.use('/transaction/', require('./routes/transaction-api.js'));

// Launch server
app.listen(port, function() {
    console.log('Tradenet launched on port ' + port + '.');
});
