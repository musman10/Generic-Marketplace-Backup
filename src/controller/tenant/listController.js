angular.module('angularApp')
    .controller('TenantListController', [ '$scope','$filter','tenantListService','app','NgTableParams','$q', function ($scope,$filter,tenantListService,app,NgTableParams,$q) {
        $scope.description = {
            message: tenantListService.getPrivate()
        };
        //$scope.result = [{name:'usman'},{name:'usman'},{name:'usman'},{name:'usman'},{name:'usman'},{name:'usman'}];
        $scope.pageTitle = "Tenants List ";
        $scope.tenantsTable;

        debugger;

        $scope.tenantList = tenantListService.getTenantList().then(
            function(response){
                for(var i=0;i<response.data.length;i++){
                    response.data[i].dateCreated = new Date(response.data[i].dateCreated).toLocaleString();
                    response.data[i].dateLastModified = new Date(response.data[i].dateLastModified).toLocaleString();
                }
                $scope.tenantsTable = new NgTableParams({count: 20}, { dataset: response.data});
            }
        );
    }]);