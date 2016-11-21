module.exports = SymbolInfoDirective;

/**
 * @ngInject
 */
function SymbolInfoDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-tweets.directive.html',
        'controllerAs': 'symboltweet',
        'controller': /*@ngInject*/function ($scope, Server) {

            var self = this;
            self.tweets = {};

            // Clear loaded news on search
            Server.lastSearched$.safeApply($scope, function(data) {
                self.tweets = {};
            }).subscribe();

            // Whether or not we've finished loading
            self.finnishedLoading$ = Server.lastSearched$.map(function(d){
                return false;
            }).merge(Server.symbolTweet$.map(function (d) {
                return true;
            })).startWith(false).share();

            Server.symbolTweet$.safeApply($scope, function(data) {
                // console.log('Info from tweets directive: ', data.statuses);
                self.tweets = data.statuses;
            }).subscribe();

        }
    };
}
