
var https = require('https');

module.exports = QuandlWrapper;

function QuandlWrapper (key) {
    
    var self = this;

    var _key = key;

    var _host = 'www.quandl.com';

    /**
     * Returns information gathered from Tradier about a symbol
     * 
     * Handle:
     * api/getSymbolTimeSeries/AAPL
     */
    self.getSymbol = function(clientReq, clientRes) {

        var tReq = https.request({
            host: _host,
            port: 443,
            path: '/api/v3/datasets/WIKI/' + clientReq.params.symbol + '.json?api_key=' + _key,
            method: 'GET'
        }, function(tRes) {
            tRes.setEncoding('utf8');

            console.log('Quandl:getSymbolTimeSeries(' + clientReq.params.symbol + '): ' + tRes.statusCode + ' status');
            
            var data = "";
            tRes.on('data', function(d) {
               data += d;
            });

            tRes.on('end', function() {
               clientRes.send(data);
            });

        });

        tReq.end();

        tReq.on('error', function(e) {
            console.error('Error talking with Tradier: ', e);
            clientRes.send(e);
        });

    }

}
