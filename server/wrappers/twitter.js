
module.exports = TwitterAPI;

var Twitter = require('twitter');

function TwitterAPI(ck, cs, ak, as) {

    var self = this;

    var _twitterClient = new Twitter({
        consumer_key: ck,
        consumer_secret: cs,
        access_token_key: ak,
        access_token_secret: as
    });

    self.search = function(clientReq, clientRes) {
        _twitterClient.get('search/tweets', {q: clientReq.params.symbol}, function(error, tweets, response) {
            clientRes.send(tweets);
        });
    }

}





