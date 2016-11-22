module.exports = SymbolOptionsDirective;

/**
 * @ngInject
 */
function SymbolOptionsDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-options.directive.html',
        'controllerAs': 'symbolOptions',
        'controller': /*@ngInject*/function ($scope, Server, User) {

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
                console.log("Sell: ", x);
            }

            self.canSellStock$ = User.currentStocks$.combineLatest(
                Server.tradierSymbol$.filter(function(symbol){
                            return symbol !== null;
                        }).map(function(data) {
                            return data.quotes.quote;
                        }), 
                function(stocks, symbol){

                    for(var i  = 0; i < stocks.length; i ++){
                        if(stocks[i].symbol === symbol.symbol){
                            return true;
                        }
                    }

                    return false;

                });
            
        }
    };
}
