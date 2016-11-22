
var Rx = require('rx');

module.exports = Server;

/*
 * @ngInject
 */
function Server($http, AuthService) {

    var self = this;

    self.lastSearched$ = new Rx.ReplaySubject(1);

    self.tradierSymbol$ = new Rx.BehaviorSubject(null);

    self.symbolTweet$ = new Rx.ReplaySubject(1);

    self.symbolNews$ = new Rx.ReplaySubject(1);

    self.symbolTimeSeries$ = new Rx.ReplaySubject(1);
    
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

    };


    self.getSymbolTweets = function(symbol) {
        
        $http({
            method: 'GET',
            url: '/api/twitter/$' + symbol
        }).then(function(x){
            self.symbolTweet$.onNext(x.data);
        });

    };

    self.getSymbolNews = function(symbol) {
        
        $http({
            method: 'GET',
            url: '/api/reddit/$' + symbol
        }).then(function(x){
            self.symbolNews$.onNext(x.data);
        });

    };

    self.getSymbolTimeSeries = function(symbol) {
        
        $http({
            method: 'GET',
            url: '/api/getSymbolTimeSeries/' + symbol
        }).then(function(x){
            self.symbolTimeSeries$.onNext(x.data);
        });

    };

    self.search = function (symbol) {
        self.lastSearched$.onNext(symbol);
        self.getSymbol(symbol);
        self.getSymbolTweets(symbol);
        self.getSymbolNews(symbol);
        self.getSymbolTimeSeries(symbol);
    };

    self.purchaseStock = function(symbol, price, amount){

        var resp = new Rx.ReplaySubject(1);

        $http.post('/transaction/purchase', {
                symbol: symbol,
                price: price,
                amount: amount
            })
            .success(function(data, status) {
                resp.onNext({
                    data: data,
                    status: status
                });
                AuthService.getUserStatus();
            })
            .error(function(data) {
                resp.onNext({
                    error: true,
                    data: data
                });
            });

        return resp;
    };

    self.viewTransactions = function() {

        var resp = new Rx.ReplaySubject(1);

        $http({
            method: 'GET',
            url: '/transaction/view'
        }).then(function(x){
            resp.onNext(x.data);
        });

        return resp;
    };

    self.makeDeposit = function(amount){

        var resp = new Rx.ReplaySubject(1);

        $http.post('/transaction/deposit', {
                amount: amount
            })
            .success(function(data, status) {
                resp.onNext({
                    data: data,
                    status: status
                });
                AuthService.getUserStatus();
            })
            .error(function(data) {
                resp.onNext({
                    error: true,
                    data: data
                });
            });

        return resp;
    };

}