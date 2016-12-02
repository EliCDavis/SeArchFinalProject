module.exports = SymbolGraphingDirective;

/**
 * @ngInject
 */
function SymbolGraphingDirective() {

    return {
        'restrict': 'E',
        'templateUrl': 'partial/symbol-graph.directive.html',
        'controllerAs': 'symbolGraph',
        'controller': /*@ngInject*/function ($scope, Server) {

            var self = this;

            $scope.finnishedLoading = false;

            Server.symbolTimeSeries$.safeApply($scope, function(data){
                $scope.finnishedLoading = true;
            }).subscribe();
            

            // Extracting time series data on load
            Server.symbolTimeSeries$.filter(function (data) {
                return data.quandl_error === undefined && data.dataset && data.dataset.data;
            }).map(function (data) {

                data = data.dataset;

                if(!data.data || data.data.length < 20){
                    return null;
                }

                var newData = [];
                for (var i = 0; i < data.data.length; i +=10) {
                    newData.push(data.data[i]);
                }
                data.data = newData;

                data.data.reverse();

                var closeIndex = data.column_names.indexOf("Adj. Close");
                var dateIndex = data.column_names.indexOf("Date");
                
                // The fucking data sometimes comes in reversed and sometimes not so we need to check and correct it before being displayed
                if(data.data[0][dateIndex] > data.data[1][dateIndex]) {
                    data.data.reverse();
                }

                var lineData = data.data.map(function(entry){
                    return entry[closeIndex];
                });

                var graphData = {
                    datasets: [
                        {
                            label: data.dataset_code,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: lineData,
                            spanGaps: false,
                        }
                    ]
                };

                graphData.labels = data.data.map(function(entry){
                    return entry[dateIndex];
                });

                return graphData;

            }).safeApply($scope, function (data) {

                if(data === null){
                    self.noDataToDisplay = true;
                    return;
                }

                self.info = data;
                $scope.myData = data;
            }).subscribe();

            $scope.myData = {};

            $scope.myOptions = {};

        }
    };
}
