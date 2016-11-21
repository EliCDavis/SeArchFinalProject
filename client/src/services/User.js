
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

    var _user$  = AuthService.loggedIn$.filter(function (d) {
        return d !== null && !!d.user;
    }).map(function(d){
        return d.user;
    }).share();

    self.currentStocks$ = _user$.map(function (user) {
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

    self.moneyHistory$ = _user$.map(function(user){
        return user.transactions.map(function(transaction){
            return { transaction: transaction };
        }).concat(user.checking.map(function(check){
            return { check : check };
        })).sort(function(a, b) {
            a = new Date(a.check? a.check.date: a.transaction.date);
            b = new Date(b.check? b.check.date: b.transaction.date);
            return a>b ? -1 : a<b ? 1 : 0;
        });
    }).subscribe(function(history){
        console.log(history);
    });

}