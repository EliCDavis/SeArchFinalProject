
var app = require("angular").module('TradeNet');

app.directive('tnToolbar',   require('./toolbar.js'));
app.directive('tnSymbolInfo',   require('./symbol-info.js'));
app.directive('tnSymbolTweets',   require('./symbol-tweets.js'));
app.directive('tnSymbolNews',   require('./symbol-news.js'));
