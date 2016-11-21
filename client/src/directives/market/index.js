
var app = require("angular").module('TradeNet');

app.directive('tnSymbolInfo',   require('./symbol-info.js'));
app.directive('tnSymbolTweets',   require('./symbol-tweets.js'));
app.directive('tnSymbolNews',   require('./symbol-news.js'));
app.directive('tnSymbolGraph',   require('./symbol-graph.js'));
app.directive('tnSymbolOptions',   require('./symbol-options.js'));
