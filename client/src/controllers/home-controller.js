
module.exports = homeController;

/* @ngInject */
function homeController($scope, $location, Server) {

    $scope.searchQuery = "";

    $scope.lastSearced = "";

    $scope.search = function() {
        var query = $scope.searchQuery.toUpperCase();
        Server.search(query);
        $scope.lastSearced = query;
    };

};
