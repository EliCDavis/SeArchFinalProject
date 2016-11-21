
module.exports = TransactionHistoryDirective;

/**
 * @ngInject
 */
function TransactionHistoryDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/transaction-history.directive.html',
        'controllerAs': 'transactionHistory',
        'controller': /*@ngInject*/function ($scope, Server) {

            var self = this;

            var _disposableSubscriptions = [];

            self.history = [];

            _disposableSubscriptions.push(Server.viewTransactions().safeApply($scope, function (purchases) {
                self.history = purchases.reverse();
            }).subscribe());

            $scope.$on('$destroy', function () {
                _disposableSubscriptions.forEach(function (subscription) {
                    subscription.unsubscribe();
                });
            });

        }
    };
}
