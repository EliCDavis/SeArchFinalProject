
var app = require("angular").module('TradeNet');

app.service('Server',   require('./Server.js'));
app.service('User',   require('./User.js'));
app.factory('AuthService',   require('./AuthService.js'));
