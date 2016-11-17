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

            self.name = 'spy';
            self.info = {};

            Server.getSymbol(self.name).safeApply($scope, function(data) {
                console.log('Info from directive: ', data);
                self.info = data.quotes.quote;
            }).subscribe();

        }
    };
}
