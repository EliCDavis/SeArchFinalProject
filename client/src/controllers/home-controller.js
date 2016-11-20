
module.exports = homeController;

/* @ngInject */
function homeController($scope, $location, Server) {

    $scope.searchQuery = "";

    $scope.lastSearced = "";

    $scope.showSymbolInfo$ = Server.tradierSymbol$.map(function(symbol){
        return symbol.quotes.unmatched_symbols === undefined;
    }).merge(Server.lastSearched$.map(function(d){
        return false;
    })).startWith(false);

    $scope.showSymbolFailure$ = Server.tradierSymbol$.map(function(symbol){
        return symbol.quotes.unmatched_symbols !== undefined;
    }).merge(Server.lastSearched$.map(function(d){
        return false;
    })).startWith(false);

    $scope.currentlySearching$ = Server.tradierSymbol$.map(function(symbol){
        return false;
    }).merge(Server.lastSearched$.map(function(d){
        return true;
    })).startWith(false);

    $scope.search = function() {
        var query = $scope.searchQuery.toUpperCase();
        Server.search(query);
        $scope.lastSearced = query;
    };

    Server.tradierSymbol$.subscribe(function(symbol){
        console.log("Symbol: ", symbol);
    });

};
