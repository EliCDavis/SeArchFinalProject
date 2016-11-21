
var Rx = require('rx');

module.exports = User;

/*
 * A collection of Rx.Observables that will keep the application
 * up to date with the current state of our user.
 * 
 * @ngInject
 */
function User(Server, AuthService) {

    var self = this;

    self.currentStocks$ = AuthService.loggedIn$.filter(function (d) {
        return d !== null && !!d.user;
    }).map(function(d){
        return d.user;
    }).map(function (user) {
        var stocksObj = {};

        user.transactions.forEach(function (transaction) {

            if (stocksObj[transaction.symbol] === undefined) {
                stocksObj[transaction.symbol] = 0;
            }

            stocksObj[transaction.symbol] += transaction.amount * (transaction.transactionType === "purchase" ? 1 : -1);

        });

        var stocks = [];
        for (var key in stocksObj) {
            if (stocksObj[key] > 0){
                stocks.push({
                    symbol: key,
                    amount: stocksObj[key]
                });
            }
        }

        return stocks;

    });

}