angular.module('angularApp')
    .controller('RequestViewController', [ '$scope','$stateParams','requestViewService','app',  function ($scope,$stateParams,requestViewService,app) {
        $scope.description = {
            message: requestViewService.getPrivate()
        };

        $scope.pageTitle = "Request Page ";
        $scope.requestID=$stateParams.requestId;

        //alert("View Request controller");

    }]);