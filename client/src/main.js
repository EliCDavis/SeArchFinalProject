var angular = require('angular');
var rxDecorateDirective = require('./3rdParty/rxDecorateDirective');

require('angular-material');
require('rx-angular');
require('angular-route');
require('tc-angular-chartjs');

var app = angular.module('TradeNet', ['ngMaterial', 'rx', 'ngRoute', 'tc.chartjs']);

require('./services');
require('./directives');
require('./controllers');

app.config(['$provide', function ($provide) {
    rxDecorateDirective($provide, 'ngShow');
    rxDecorateDirective($provide, 'ngHide');
    rxDecorateDirective($provide, 'ngDisabled');
    rxDecorateDirective($provide, 'ngIf');
    rxDecorateDirective($provide, 'ngBind');
}]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'partial/home.html',
            controller: 'homeController',
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
                .then(function () {
                    if (next.access.restricted && !AuthService.loggedIn$.getValue()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});


angular.bootstrap(document, ['TradeNet']);
