var path = require('path');

// Grab configurations for launch
var config = require('../config.json');
var port = config.port || 3000;

// Grab our API wrappers
var TwitterWrapper = new(require('./wrappers/twitter'))();
var TradierWrapper = new(require('./wrappers/tradier'))(config.tradierKey);
var MailboxlayerWrapper = new(require('./wrappers/mailboxlayer'))(config.mailboxKey);

// Setup for our server
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));

// Setup API
app.get('/api/twitter', TwitterWrapper.get);
app.get('/api/getSymbol/:symbol', TradierWrapper.getSymbol);
app.get('/api/validateEmail/:email', MailboxlayerWrapper.validateEmailRequest);

// Launch server
app.listen(port, function() {
    console.log('Tradenet launched on port ' + port + '.');
});
