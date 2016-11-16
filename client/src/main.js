var angular = require('angular');

require('angular-material');
require('rx-angular');

var app = angular.module('TradeNet', ['ngMaterial', 'rx', 'ngRoute'])

require('./services');
require('./directives');

angular.bootstrap(document, ['TradeNet']);

app.config(function($routeProvider) {
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
