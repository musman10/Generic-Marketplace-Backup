angular.module('angularApp')
<<<<<<< HEAD
.controller('TenantLoginController', [ '$scope','$state','tenantLoginService','app',function ($scope,$state,tenantLoginService,app) {
=======
.controller('TenantLoginController', [ '$scope','$state', 'tenantLoginService', 'app',  function ($scope,$state,tenantLoginService,app) {
>>>>>>> saira
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : tenantLoginService.getPrivate()
    };

<<<<<<< HEAD
    $scope.userConfList = app.tenant.users;
=======
   /* $scope.userType = $stateParams.userType;
    $scope.user = mainService.getUserObjectByUserType($scope.userType);
    $scope.userConf = mainService.getUserConfByUserType($scope.userType);
    str = JSON.stringify($scope.user);
    console.log(str);
    console.log("Testing");*/
>>>>>>> saira

    $scope.signup = function(userTypeName){
        $state.go("TenantUserSignup", {
            userType: userTypeName
        });
    }
<<<<<<< HEAD
=======

    $scope.login = function(userTypeName){
        debugger;
        tenant_id = app.tenant._id;
        username = $scope.userName;
        password = $scope.userPassword;
        console.log(tenant_id + username + password);
        var loginUser = {
            tenant_id : tenant_id,
            username : username,
            password : password
        }

        tenantLoginService.getUserInformation(tenant_id, username , password).then(function(response){
            console.log(response);
            if(response.success == true){
                app.loginUser = response.data;
                console.log(JSON.stringify(app));
                $state.go("AdminHome");
            }
            else{
                $scope.loginError = true;
            }

        });

    }
>>>>>>> saira
}]);