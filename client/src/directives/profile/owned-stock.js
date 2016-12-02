
module.exports = OwnedStockDirective;

/**
 * @ngInject
 */
function OwnedStockDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/owned-stock.directive.html',
        'controllerAs': 'ownedStock',
        'controller': /*@ngInject*/function ($scope, User, $location) {

            var self = this;

            self.currentStock = [];

            User.currentStocks$.safeApply($scope, function(stock){
                self.currentStock = stock;
            }).subscribe();

            self.viewStock = function(symbol){
                $location.path('/market/'+symbol);
            };

        }
    };
}
