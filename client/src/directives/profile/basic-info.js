
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
        'controller': /*@ngInject*/function ($scope, Server, AuthService) {

            var self = this;

            $scope.email$ = AuthService.loggedIn$.filter(function(d){
                return d !== null && !!d.user;
            }).map(function(d){
               return d.user.email; 
            });

            $scope.emailHash = "";

            $scope.emailHash$ = $scope.email$.map(md5).safeApply($scope, function(hash){
                $scope.emailHash = hash;
            }).subscribe();

        }
    };
}
