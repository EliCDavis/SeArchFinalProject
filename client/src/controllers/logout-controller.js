module.exports = logoutController;

/* @ngInject */
function logoutController($scope, $location, AuthService) {

    console.log("Logout controller up!");

    $scope.logout = function() {

        // call logout from service
        AuthService.logout()
            .then(function() {
                $location.path('/login');
            });

    };

}
