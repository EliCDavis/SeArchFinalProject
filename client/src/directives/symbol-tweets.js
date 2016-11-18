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

            Server.symbolTweet$.safeApply($scope, function(data) {
                console.log('Info from tweets directive: ', data.statuses);
                self.tweets = data.statuses;
            }).subscribe();

        }
    };
}
