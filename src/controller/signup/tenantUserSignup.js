angular.module('angularApp')
.controller('TenantUserSignupController', [ '$scope','$stateParams','tenantUserSignupService','mainService',  function ($scope,$stateParams,tenantUserSignupService,mainService) {
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : tenantUserSignupService.getPrivate()
    };
    
    $scope.userType = $stateParams.userType;
    $scope.user = mainService.getUserObjectByUserType($scope.userType);
    $scope.userConf = mainService.getUserConfByUserType($scope.userType);
    str = JSON.stringify($scope.user);
    console.log(str);
    console.log("Testing");

    $scope.signup = function(){
        str = JSON.stringify($scope.user);
        console.log(str);
        console.log("Testing");
    }

}]);