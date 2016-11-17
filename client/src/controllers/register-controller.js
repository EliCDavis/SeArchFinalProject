module.exports = registerController;

/* @ngInject */
function registerController($scope, $location, AuthService) {

    $scope.register = function() {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
            // handle success
            .then(function() {
                $location.path('/login');
                $scope.disabled = false;
                $scope.registerForm = {};
            })
            // handle error
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Kaleb doesn't know what to do here";
                $scope.disabled = false;
                $scope.registerForm = {};
            });

    };

}
