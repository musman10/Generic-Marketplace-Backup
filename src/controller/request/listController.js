angular.module('angularApp')
    .controller('RequestListController', [ '$scope','$stateParams','requestListService','app',  function ($scope,$stateParams,requestListService,app) {
        $scope.description = {
            message: requestListService.getPrivate()
        };
        $scope.tenantID=$stateParams.tenantId;
        $scope.result;
        $scope.pageTitle = " List Of Requests";

        requestListService.getRequestList($scope.tenantID).then(
            function(response){
                $scope.result= response.data;
            }
        );
        //alert("my list request controller");

    }]);