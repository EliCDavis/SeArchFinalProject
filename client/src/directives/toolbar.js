module.exports = ToolbarDirective;

/**
 * @ngInject
 */
function ToolbarDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/toolbar.directive.html',
        'controllerAs': 'toolbar',
        'controller': /*@ngInject*/function ($scope, AuthService, $location) {

            var self = this;

            self.loggedIn$ = AuthService.loggedIn$;

            self.logout = function () {

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                    });

            };

        }
    };
}
