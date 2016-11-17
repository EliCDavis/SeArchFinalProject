var https = require('https');
module.exports = RedditAPI;

function RedditAPI() {

    var self = this;
	           
	var _host = 'www.reddit.com';
	
    self.getHeadlines = function(clientReq, clientRes) {

        var tReq = https.request({
            host: _host,
            port: 443,
			path: "/r/finance/.json",
            method: 'GET'
        }, function(tRes) {
            //tRes.setEncoding('utf8');
			
			console.log('Reddit:getTitle(' + clientReq.params.headline + '): ' + tRes.statusCode + ' status');
			
            tRes.on('data', function(d) {
               clientRes.send(d);
            });
        });

        tReq.end();

        tReq.on('error', function(e) {
            console.error('Error talking with Reddit: ', e);
            clientRes.send(e);
        });

    }

}