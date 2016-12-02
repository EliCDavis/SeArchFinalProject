module.exports = ToolbarDirective;

/**
 * @ngInject
 */
function ToolbarDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/toolbar.directive.html',
        'controllerAs': 'toolbar',
        'controller': /*@ngInject*/function($scope, $filter, $mdDialog, AuthService, $location) {

            var self = this;

            self.loggedIn$ = AuthService.loggedIn$;

            self.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };
 
            self.toMarket = function(){
                $location.path('/market');
            };

            self.logout = function() {

                // call logout from service
                AuthService.logout()
                    .then(function() {
                        $location.path('/login');
                    });

            };

            self.viewProfile = function() {
                $location.path('/profile');
            };

            self.buttonTitle$ = AuthService.loggedIn$.filter(function(d){
                return d !== null && d.user;
            }).map(function(d){
                return d.user.email + " ( " + $filter('currency')(d.user.balance) + " )";
            });

        }
    };
}
