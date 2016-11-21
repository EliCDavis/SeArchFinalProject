module.exports = SymbolInfoDirective;

/**
 * @ngInject
 */
function SymbolInfoDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-info.directive.html',
        'controllerAs': 'symbolInfo',
        'controller': /*@ngInject*/function ($scope, Server) {

            var self = this;
            self.info = {};

            Server.tradierSymbol$.filter(function(symbol){
                return symbol !== null;
            }).safeApply($scope, function(data) {
                self.info = data.quotes.quote;
            }).subscribe();

        }
    };
}
