module.exports = SymbolOptionsDirective;

/**
 * @ngInject
 */
function SymbolOptionsDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-options.directive.html',
        'controllerAs': 'symbolOptions',
        'controller': /*@ngInject*/function ($scope, Server) {

            
        }
    };
}
