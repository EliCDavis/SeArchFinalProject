
module.exports = BasicInfoDirective;

var md5 = require('md5');

/**
 * @ngInject
 */
function BasicInfoDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/basic-info.directive.html',
        'controllerAs': 'basicInfo',
        'controller': /*@ngInject*/function ($scope, Server, AuthService, $filter, User) {

            var self = this;

            var _user$ = AuthService.loggedIn$.filter(function(d){
                return d !== null && !!d.user;
            });

            $scope.email$ = _user$.map(function(d){
               return d.user.email; 
            });

            $scope.balance$ = _user$.map(function(d){
               return $filter('currency')(d.user.balance); 
            });

            $scope.emailHash = "";

            $scope.emailHash$ = $scope.email$.map(md5).safeApply($scope, function(hash){
                $scope.emailHash = hash;
            }).subscribe();

            self.deposit = function(x){
                console.log("Depositing ", x, " money..");
            };

        }
    };
}
