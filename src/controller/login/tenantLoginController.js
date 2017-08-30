angular.module('angularApp')
.controller('TenantLoginController', [ '$scope','$state','tenantLoginService','app',function ($scope,$state,tenantLoginService,app) {
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : tenantLoginService.getPrivate()
    };

    $scope.userConfList = app.tenant.users;

    $scope.signup = function(userTypeName){
        $state.go("TenantUserSignup", {
            userType: userTypeName
        });
    }
}]);