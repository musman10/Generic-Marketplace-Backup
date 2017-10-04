angular.module('angularApp')
    .controller('UserListController', [ '$scope','$filter','$stateParams','userListService','app','NgTableParams',  function ($scope,$filter,$stateParams,userListService,app,NgTableParams) {
        $scope.description = {
            message: userListService.getPrivate()
        };
        $scope.tenantID=$stateParams.tenantId;
        $scope.result;
        $scope.pageTitle = " Users List";

        userListService.getUserList($scope.tenantID).then(
            function(response){
                for(var i=0;i<response.data.length;i++){
                    response.data[i].dateCreated = new Date(response.data[i].dateCreated).toLocaleString();
                    response.data[i].dateLastModified = new Date(response.data[i].dateLastModified).toLocaleString();
                }
                $scope.userTable = new NgTableParams({count: 2}, { dataset: response.data});
            }
        );

    }]);