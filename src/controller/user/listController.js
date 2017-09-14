angular.module('angularApp')
    .controller('UserListController', [ '$scope','$filter','$stateParams','userListService','app','NgTableParams',  function ($scope,$filter,$stateParams,userListService,app,NgTableParams) {
        $scope.description = {
            message: userListService.getPrivate()
        };
        $scope.tenantID=$stateParams.tenantId;
        $scope.result;
        $scope.pageTitle = " Users List";



        $scope.userTable = new NgTableParams({
            page: 1,
            count: 10

        }, {
            getData: function ( params) {
                userListService.getUserList($scope.tenantID).then(
                    function(response){
                        $scope.result= response.data;
                        total= $scope.result.length;
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.result, params.orderBy()) : $scope.result;
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data;
                    }
                );

            }
        });
        //alert("my list user controller");

    }]);