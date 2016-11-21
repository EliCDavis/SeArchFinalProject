
module.exports = OwnedStockDirective;

/**
 * @ngInject
 */
function OwnedStockDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/owned-stock.directive.html',
        'controllerAs': 'ownedStock',
        'controller': /*@ngInject*/function ($scope, User) {

            var self = this;

            self.currentStock = [];

            User.currentStocks$.safeApply($scope, function(stock){
                self.currentStock = stock;
            }).subscribe();

        }
    };
}
