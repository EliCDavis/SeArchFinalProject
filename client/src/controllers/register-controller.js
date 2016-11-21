module.exports = registerController;

/* @ngInject */
function registerController($scope, $location, AuthService) {

<<<<<<< HEAD
=======
    $scope.login = function(){
        $location.path('/login');
    }

>>>>>>> master
    $scope.register = function() {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

<<<<<<< HEAD
=======
        if($scope.registerForm.password !== $scope.registerForm.password2){
            $scope.error = true;
            $scope.errorMessage = "Passwords do not match!";
            return;
        }

>>>>>>> master
        // call register from service
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
            // handle success
            .then(function() {
                $location.path('/login');
                $scope.disabled = false;
                $scope.registerForm = {};
            })
            // handle error
<<<<<<< HEAD
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Kaleb doesn't know what to do here";
=======
            .catch(function(data) {
                $scope.error = true;
                $scope.errorMessage = "Error registering user: "+data.err;
>>>>>>> master
                $scope.disabled = false;
                $scope.registerForm = {};
            });

    };

}
