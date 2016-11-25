module.exports = SymbolInfoDirective;

/**
 * @ngInject
 */
function SymbolInfoDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-info.directive.html',
        'controllerAs': 'symbolInfo',
        'controller': /*@ngInject*/function ($scope, Server, User) {

            var self = this;
            self.info = {};

            Server.tradierSymbol$.filter(function(symbol){
                return symbol !== null;
            }).safeApply($scope, function(data) {
                self.info = data.quotes.quote;
            }).subscribe();

            // how many we own of the current symbol we're looking at
            self.own$ = User.currentStocks$.combineLatest(
                Server.tradierSymbol$.filter(function(symbol){
                    return symbol !== null;
                }),
                function(currentStocks, currentSymbol){

                    for(var i = 0; i < currentStocks.length; i++){
                        if(currentStocks[i].symbol === currentSymbol.quotes.quote.symbol){
                            return currentStocks[i].amount;
                        }
                    }

                    return 0;
                }
            );


            // Whether or not we display how much we own
            self.displayOwn$ = self.own$.map(function(amount){
                return amount > 0;
            });

        }
    };
}
