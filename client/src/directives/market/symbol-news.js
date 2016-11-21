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


            // Whether or not we've finished loading
            self.finnishedLoading$ = Server.lastSearched$.map(function(d){
                return false;
            }).merge(Server.symbolNews$.map(function (d) {
                return true;
            })).startWith(false).share();


            Server.symbolNews$.safeApply($scope, function(data) {
                self.news = data.data.children;
            }).subscribe();

        }
    };
}
