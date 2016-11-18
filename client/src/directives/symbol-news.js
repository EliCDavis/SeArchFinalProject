module.exports = SymbolNewsDirective;

/**
 * @ngInject
 */
function SymbolNewsDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-news.directive.html',
        'controllerAs': 'symbolnews',
        'controller': /*@ngInject*/function ($scope, Server) {

            var self = this;
            self.news = {};

            // Clear loaded news on search
            Server.lastSearched$.safeApply($scope, function(data) {
                self.news = {};
            }).subscribe();

            Server.symbolNews$.safeApply($scope, function(data) {
                console.log('Info from news directive: ', data.data.children);
                self.news = data.data.children;
            }).subscribe();

        }
    };
}
