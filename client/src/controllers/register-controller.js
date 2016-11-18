module.exports = registerController;

/* @ngInject */
function registerController($scope, $location, AuthService) {

    $scope.login = function(){
        $location.path('/login');
    }

    $scope.register = function() {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        if($scope.registerForm.password !== $scope.registerForm.password2){
            $scope.error = true;
            $scope.errorMessage = "Passwords do not match!";
            return;
        }

        // call register from service
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
            // handle success
            .then(function() {
                $location.path('/login');
                $scope.disabled = false;
                $scope.registerForm = {};
            })
            // handle error
            .catch(function(data) {
                $scope.error = true;
                $scope.errorMessage = "Error registering user: "+data.err;
                $scope.disabled = false;
                $scope.registerForm = {};
            });

    };

}
