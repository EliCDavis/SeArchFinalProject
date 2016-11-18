

var Rx = require('rx');

module.exports = Server;

/*
 * @ngInject
 */
function Server($http) {

    var self = this;

    self.lastSearched$ = new Rx.ReplaySubject(1);

    self.tradierSymbol$ = new Rx.ReplaySubject(1);

    self.symbolTweet$ = new Rx.ReplaySubject(1);

    self.symbolNews$ = new Rx.ReplaySubject(1);
    
    /**
     * Grabs information about a specific symbol and pushes information
     * through an observable to be subscribed to.
     * 
     * Returns Rx.Observable<SymbolInformation>
     */
    self.getSymbol = function(symbol) {
        
        $http({
            method: 'GET',
            url: '/api/getSymbol/' + symbol
        }).then(function(x){
            self.tradierSymbol$.onNext(x.data);
        });

    }


    self.getSymbolTweets = function(symbol) {
        
        $http({
            method: 'GET',
            url: '/api/twitter/$' + symbol
        }).then(function(x){
            self.symbolTweet$.onNext(x.data);
        });

    }

    self.getSymbolNews = function(symbol) {
        
        $http({
            method: 'GET',
            url: '/api/reddit/$' + symbol
        }).then(function(x){
            self.symbolNews$.onNext(x.data);
        });

    }

    self.search = function (symbol) {
        self.lastSearched$.onNext(symbol);
        self.getSymbol(symbol);
        self.getSymbolTweets(symbol);
        self.getSymbolNews(symbol);
    }

}