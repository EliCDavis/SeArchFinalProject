module.exports = SymbolOptionsDirective;

/**
 * @ngInject
 */
function SymbolOptionsDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-options.directive.html',
        'controllerAs': 'symbolOptions',
        'controller': /*@ngInject*/function ($scope, Server) {

            var self = this;

            self.purchaseStock = function() {

                console.log(Server.tradierSymbol$.getValue());

                var symbol = Server.tradierSymbol$.getValue();
                if(symbol === null){
                    return;
                }
                symbol = symbol.quotes.quote;

                Server.purchaseStock(symbol.symbol, symbol.prevclose, 1).subscribe(function(res){
                    console.log("Response for purchase: ", res);
                });
            };
            
        }
    };
}
