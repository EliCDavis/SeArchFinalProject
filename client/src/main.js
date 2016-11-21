var angular = require('angular');
var rxDecorateDirective = require('./3rdParty/rxDecorateDirective');

require('angular-material');
require('rx-angular');
require('angular-route');
<<<<<<< HEAD

var app = angular.module('TradeNet', ['ngMaterial', 'rx', 'ngRoute'])
=======
require('tc-angular-chartjs');

var app = angular.module('TradeNet', ['ngMaterial', 'rx', 'ngRoute', 'tc.chartjs']);
>>>>>>> master

require('./services');
require('./directives');
require('./controllers');
<<<<<<< HEAD
console.log("Before routing");
app.config(function($routeProvider) {

    console.log("route: ", $routeProvider);

    $routeProvider
        .when('/', {
            templateUrl: 'partial/home.html',
=======

app.config(['$provide', function ($provide) {
    rxDecorateDirective($provide, 'ngShow');
    rxDecorateDirective($provide, 'ngHide');
    rxDecorateDirective($provide, 'ngDisabled');
    rxDecorateDirective($provide, 'ngIf');
    rxDecorateDirective($provide, 'ngBind');
}]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/market', {
            templateUrl: 'partial/market.html',
            controller: 'marketController',
            access: {
                restricted: true
            }
        })
        .when('/market/:symbol', {
            templateUrl: 'partial/market.html',
            controller: 'marketController',
            access: {
                restricted: true
            }
        })
        .when('/profile', {
            templateUrl: 'partial/profile.html',
            controller: 'profileController',
            access: {
                restricted: true
            }
        })
        .when('/profile/:userName', {
            templateUrl: 'partial/profile.html',
            controller: 'profileController',
>>>>>>> master
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
<<<<<<< HEAD
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



=======
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getUserStatus()
                .then(function () {
                    if (!next.access || (next.access.restricted && AuthService.loggedIn$.getValue() === null) ) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});

>>>>>>> master

angular.bootstrap(document, ['TradeNet']);
