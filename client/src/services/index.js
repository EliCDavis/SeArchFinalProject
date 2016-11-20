
var app = require("angular").module('TradeNet');

app.service('Server',   require('./Server.js'));
app.factory('AuthService',   require('./AuthService.js'));
