module.exports = SymbolOptionsDirective;

/**
 * @ngInject
 */
function SymbolOptionsDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-options.directive.html',
        'controllerAs': 'symbolOptions',
        'controller': /*@ngInject*/function ($scope, Server, User, $mdToast, observeOnScope) {

            var self = this;

            self.purchaseStock = function(x) {

                var amount = 1;
                if(!isNaN(x)){
                    amount = Math.max(0, Math.round(parseInt(x)));
                }

                if(amount === 0){
                    return;
                }

                var symbol = Server.tradierSymbol$.getValue();
                if(symbol === null){
                    return;
                }
                symbol = symbol.quotes.quote;

                Server.purchaseStock(symbol.symbol, symbol.prevclose, amount).subscribe(function(res){
                    console.log("Response for purchase: ", res);
                });
            };

            self.sellStock = function(x){

                var amount = 1;
                if(!isNaN(x)){
                    amount = Math.max(0, Math.round(parseInt(x)));
                } else {
                    $mdToast.showSimple("Error making sell");
                    return;
                }

                if(amount === 0){
                    $mdToast.showSimple("You must enter in atleast 1 stock to sell");
                    return;
                }

                var symbol = Server.tradierSymbol$.getValue();
                if(symbol === null){
                    return;
                }
                symbol = symbol.quotes.quote;

                Server.sellStock(symbol.symbol, symbol.prevclose, amount).subscribe(function(res){
                    console.log("Response for sell: ", res);
                });
            }

            self.ownOfStock$ = User.currentStocks$.combineLatest(
                Server.tradierSymbol$.filter(function(symbol){
                            return symbol !== null;
                        }).map(function(data) {
                            return data.quotes.quote;
                        }), 
                function(stocks, symbol){

                    for(var i  = 0; i < stocks.length; i ++){
                        if(stocks[i].symbol === symbol.symbol){
                            return stocks[i].amount;
                        }
                    }

                    return 0;

                });

            self.canSellStock$ = self.ownOfStock$.map(function(amount){
                return amount>0;
            });
                
            observeOnScope($scope, 'numStockToSell').combineLatest(
                self.ownOfStock$,
                function (change, amount){
                    return Math.max(0, Math.min(change.newValue, amount));
                }).safeApply($scope, function(change){
                    $scope.numStockToSell = change;
            }).subscribe();
            
        }
    };
}
