var https = require('https');
module.exports = RedditAPI;

function RedditAPI() {

    var self = this;
	           
	var _host = 'www.reddit.com';
	
    self.getHeadlines = function(clientReq, clientRes) {

        var tReq = https.request({
            host: _host,
            port: 443,
			path: "/r/finance/search.json?q=" + clientReq.params.headline + "&restrict_sr=on",
            method: 'GET'
        }, function(tRes) {
            tRes.setEncoding('utf8');
			
			console.log('Reddit:getTitle(' + clientReq.params.headline + '): ' + tRes.statusCode + ' status');
			
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
            console.error('Error talking with Reddit: ', e);
            clientRes.send(e);
        });

    }

}