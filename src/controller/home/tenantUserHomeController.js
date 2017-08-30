angular.module('angularApp')
    .controller('TenantUserHomeController', [ '$scope','$state','tenantLoginService','app',function ($scope,$state,tenantLoginService,app) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : tenantLoginService.getPrivate()
        };
    }]);