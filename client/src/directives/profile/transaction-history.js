
module.exports = TransactionHistoryDirective;

/**
 * @ngInject
 */
function TransactionHistoryDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/transaction-history.directive.html',
        'controllerAs': 'transactionHistory',
        'controller': /*@ngInject*/function ($scope, Server, User) {

            var self = this;

            var _disposableSubscriptions = [];

            self.history = [];

            _disposableSubscriptions.push(User.moneyHistory$.safeApply($scope, function (purchases) {
                self.history = purchases;
            }).subscribe());

            $scope.$on('$destroy', function () {
                _disposableSubscriptions.forEach(function (subscription) {
                    subscription.dispose();
                });
                _disposableSubscriptions = [];
            });

        }
    };
}
