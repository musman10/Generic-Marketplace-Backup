angular.module('angularApp')
    .controller('TenantListController', [ '$scope','tenantListService','app',  function ($scope,tenantListService,app) {
        $scope.description = {
            message: tenantListService.getPrivate()
        };
        $scope.result;
        $scope.pageTitle = " List Of Tenants ";

        tenantListService.getTenantList().then(
                function(response){
                    $scope.result= response.data;
                }
        );

       // alert("my list tenant controller");

    }]);