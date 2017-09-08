angular.module('angularApp')
    .controller('UserListController', [ '$scope','$stateParams','userListService','app',  function ($scope,$stateParams,userListService,app) {
        $scope.description = {
            message: userListService.getPrivate()
        };
        $scope.tenantID=$stateParams.tenantId;
        $scope.result;
        $scope.pageTitle = " List Of Users";

        userListService.getUserList($scope.tenantID).then(
            function(response){
                $scope.result= response.data;
            }
        );
        //alert("my list user controller");

    }]);