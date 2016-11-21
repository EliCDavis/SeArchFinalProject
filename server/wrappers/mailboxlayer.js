
var https = require('https');

module.exports = MailboxLayer;

//https://mailboxlayer.com/documentation
function MailboxLayer(key) {

    var self = this;

    var _key = key;

    self.validateEmailRequest = function(clientReq, clientRes) {
        self.validateEmail(clientReq.params.email, function(data) {
            clientRes.send(data);
        }, function(data) {
            clientRes.send(data);
        });
    }

    self.validateEmail = function(email, successCallback, errorCallback) {

        var tReq = https.request({
            host: 'apilayer.net',
            port: 443,
            path: '/api/check?access_key=' + _key + '&email=' + email,
            method: 'GET'
        }, function(tRes) {
            tRes.setEncoding('utf8');

            console.log('MailboxLayer:validateEmail(' + email + '): ' + tRes.statusCode + ' status');
            
            tRes.on('data', function(d) {
               successCallback(JSON.parse(d));
            });

        });

        tReq.end();

        tReq.on('error', function(e) {
            console.error('Error talking with MailboxLayer: ', e);
            errorCallback(e);
        });

    }

}
