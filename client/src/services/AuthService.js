
var Rx = require('rx');

module.exports = AuthService;

/*@ngInject*/
function AuthService ($q, $timeout, $http) {

    var loggedIn$ = new Rx.BehaviorSubject(null);

    function getUserStatus() {
        return $http.get('/user/status')
            // handle success
            .success(function(data) {

                console.log("get status", data);
                loggedIn$.onNext(data.status?data: null);

            })
            // handle error
            .error(function(data) {
                loggedIn$.onNext(null);
            });
    }

    function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/user/login', {
                username: username,
                password: password
            })
            // handle success
            .success(function(data, status) {
                if (status === 200 && data.status) {
                    console.log("Logged In: ", data);
                    deferred.resolve();
                } else {
                    deferred.reject();
                }

                loggedIn$.onNext(data.user);
                
            })
            // handle error
            .error(function(data) {
                loggedIn$.onNext(null);
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }

    function logout() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('/user/logout')
            // handle success
            .success(function(data) {
                deferred.resolve();
            })
            // handle error
            .error(function(data) {
                deferred.reject();
            });

        loggedIn$.onNext(null);

        // return promise object
        return deferred.promise;

    }

    function register(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/user/register', {
                username: username,
                password: password
            })
            // handle success
            .success(function(data, status) {
                console.log("Succesfully Created User");
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject(data);
                }
            })
            // handle error
            .error(function(data) {
                console.log("Error Creating User", data);
                deferred.reject(data);
            });

        // return promise object
        return deferred.promise;

    }

    // return available functions for use in the controllers
    return ({
        loggedIn$: loggedIn$,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register
    });

}
