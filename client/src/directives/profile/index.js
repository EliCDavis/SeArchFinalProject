
var app = require("angular").module('TradeNet');

app.directive('tnBasicProfileInfo',   require('./basic-info.js'));
app.directive('tnTransactionHistory',   require('./transaction-history.js'));
app.directive('tnOwnedStock',   require('./owned-stock.js'));
