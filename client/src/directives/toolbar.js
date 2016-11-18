module.exports = ToolbarDirective;

/**
 * @ngInject
 */
function ToolbarDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/toolbar.directive.html',
        'controllerAs': 'toolbar',
        'controller': /*@ngInject*/function ($scope) {

            var self = this;
            

        }
    };
}
