angular.module('angularApp')
    .controller('TenantListController', [ '$scope','$filter','tenantListService','app','NgTableParams', function ($scope,$filter,tenantListService,app,NgTableParams) {
        $scope.description = {
            message: tenantListService.getPrivate()
        };
        $scope.result;
        $scope.pageTitle = "Tenants List ";
        /*
        $scope.tenantList=tenantListService.getTenantList().then(
            function(response){
                $scope.result= response.data;
            }
        );
*/
        $scope.tenantsTable = new NgTableParams({
            page: 1,
            count: 10

        }, {
            getData: function ( params) {
                tenantList=tenantListService.getTenantList().then(
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


    }]);