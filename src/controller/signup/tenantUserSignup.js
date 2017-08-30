angular.module('angularApp')
<<<<<<< HEAD
.controller('TenantUserSignupController', [ '$scope','$stateParams','tenantUserSignupService','mainService','$state','app',  function ($scope,$stateParams,tenantUserSignupService,mainService,$state,app) {
=======
.controller('TenantUserSignupController', [ '$scope','$stateParams','tenantUserSignupService','mainService',  function ($scope,$stateParams,tenantUserSignupService,mainService) {
>>>>>>> saira
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : tenantUserSignupService.getPrivate()
    };
    
    $scope.userType = $stateParams.userType;
<<<<<<< HEAD
    //$scope.user = mainService.getUserObjectByUserType($scope.userType);
    $scope.user;
    $scope.userConf = mainService.getUserConfByUserType($scope.userType);
    str = JSON.stringify($scope.user);
    console.log(str);

    $scope.signup = function(){
        debugger;
        $scope.formObject();
        str = JSON.stringify($scope.user);
        console.log(str);
        tenantUserSignupService.signup($scope.user,app).then(function(response){
            var str = JSON.stringify(response);
            console.log(str);
            if(response.success == true){
                $state.go("TenantUserHome");
            }
            else{
                alert(response.error[0]);
            }
        });

    }

    $scope.formObject = function(){
        $scope.user = tenantUserSignupService.createFormObject($scope.userConf);
        //console.log($scope.user);
=======
    $scope.user = mainService.getUserObjectByUserType($scope.userType);
    $scope.userConf = mainService.getUserConfByUserType($scope.userType);
    str = JSON.stringify($scope.user);
    console.log(str);
    console.log("Testing");

    $scope.signup = function(){
        str = JSON.stringify($scope.user);
        console.log(str);
        console.log("Testing");
>>>>>>> saira
    }

}]);