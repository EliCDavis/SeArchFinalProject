
var app = require("angular").module('TradeNet');

require("./market");
require("./profile");
app.directive('tnToolbar',   require('./toolbar.js'));
