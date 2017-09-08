angular.module('angularApp')
    .controller('TenantViewController', [ '$scope','$stateParams','tenantViewService','app',  function ($scope,$stateParams,tenantViewService,app) {

        $scope.description = {
            message: tenantViewService.getPrivate()
        };
        $scope.tenantID = $stateParams.tenantId;

        $scope.pageTitle = "Tenant Page";

        //alert("Tenant page controller. ");

    }]);