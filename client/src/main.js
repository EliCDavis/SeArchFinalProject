var angular = require('angular');

require('angular-material');
require('rx-angular');
require('angular-route');

var app = angular.module('TradeNet', ['ngMaterial', 'rx', 'ngRoute'])

require('./services');
require('./directives');
require('./controllers');
console.log("Before routing");
app.config(function($routeProvider) {

    console.log("route: ", $routeProvider);

    $routeProvider
        .when('/', {
            templateUrl: 'partial/home.html',
            access: {
                restricted: true
            }
        })
        .when('/login', {
            templateUrl: 'partial/login.html',
            controller: 'loginController',
            access: {
                restricted: false
            }
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {
                restricted: true
            }
        })
        .when('/register', {
            templateUrl: 'partial/register.html',
            controller: 'registerController',
            access: {
                restricted: false
            }
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});




angular.bootstrap(document, ['TradeNet']);
