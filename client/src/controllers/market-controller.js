
module.exports = homeController;

/* @ngInject */
function homeController($scope, $location, Server, $route) {

    $scope.searchQuery = "";

    $scope.lastSearced = "";

    $scope.showSymbolInfo$ = Server.tradierSymbol$.map(function(symbol){
        return symbol !== null && symbol.quotes.unmatched_symbols === undefined;
    }).merge(Server.lastSearched$.map(function(d){
        return false;
    })).startWith(false);


    $scope.showSymbolFailure$ = Server.tradierSymbol$.map(function(symbol){
        return symbol !== null && symbol.quotes.unmatched_symbols !== undefined;
    }).merge(Server.lastSearched$.map(function(d){
        return false;
    })).startWith(false);


    $scope.currentlySearching$ = Server.tradierSymbol$.map(function(symbol){
        return false;
    }).merge(Server.lastSearched$.map(function(d){
        return true;
    })).startWith(false);


    $scope.search = function() {
        $location.path('/market/'+$scope.searchQuery.trim().toUpperCase());
    };

    if($route.current.params.symbol){
        $scope.searchQuery = $route.current.params.symbol;
        var query = $scope.searchQuery.trim().toUpperCase();
        Server.search(query);
        $scope.lastSearced = query;
    }

}
