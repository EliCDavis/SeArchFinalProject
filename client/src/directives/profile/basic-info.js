module.exports = BasicInfoDirective;

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
                return d.email;
            }).map($scope, function(user){
               return d.email; 
            });

        }
    };
}
