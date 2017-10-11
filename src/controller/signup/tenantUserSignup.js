angular.module('angularApp')
.controller('TenantUserSignupController', [ '$scope','$stateParams','tenantUserSignupService','tenantLoginService','mainService','$state','app',  function ($scope,$stateParams,tenantUserSignupService,tenantLoginService ,mainService,$state,app) {
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : tenantUserSignupService.getPrivate()
    };

    $scope.tenantName = app.tenant.name;
    $scope.userType = $stateParams.userType;
    //$scope.user = mainService.getUserObjectByUserType($scope.userType);
    $scope.user = {};
    if($scope.userType == "Company"){
        $scope.user.email = "";
        $scope.user.fullName = "";
        $scope.user.password = "";
        $scope.user.phoneNumber = "";
        $scope.user.name = "";
        $scope.user.countryName = "";
        $scope.user.source = "";
        $scope.user.numberOfEmployees = "";
        $scope.username = "";
        $scope.password = "";

    }
    else if($scope.userType == "Sider"){
        $scope.user.name = "";
        //$scope.user.lastName = "";
        $scope.user.gender = "I am a";
        $scope.user.email = "";
        $scope.user.phoneNumber = "";
        $scope.user.age = "How old are you?";
        $scope.user.source = "How did you hear about npDemo?";
        $scope.user.availability = "What's your general weekly availability?";
        $scope.user.isStudent = "Are you a student";
        $scope.username = "";

    }
    //$scope.userConf = mainService.getUserConfByUserType($scope.userType);
    //str = JSON.stringify($scope.user);
    //console.log(str);

    $scope.signup = function(){
        debugger;
        /*$scope.formObject();
        str = JSON.stringify($scope.user);
        console.log(str);*/
        $scope.user.userType = $scope.userType ;
        tenantUserSignupService.signup($scope.user,app).then(function(response){
            var str = JSON.stringify(response);
            console.log(str);
            if(response.success == true){

                $scope.loginInfo();
                //$state.go("TenantUserHome");
            }
            else{
                alert(response.error[0]);
            }
        });

    }

    $scope.formObject = function(){
        $scope.user = tenantUserSignupService.createFormObject($scope.userConf);
    }

    $scope.loginInfo = function(){
        debugger;
        tenant_id = app.tenant._id;
        username = $scope.user.username;
        password = $scope.user.password;
        console.log("tenantId="+tenant_id + " Username="+username + " password="+password);
        var loginUser = {
            tenant_id : tenant_id,
            username : username,
            password : password
        }

        tenantLoginService.getUserInformation(tenant_id, username , password).then(function(response){
            console.log(response);
            if(response.success == true){
                app.loginUser = response.data;
                console.log(JSON.stringify(app.loginUser));
                $state.go("TenantUserHome");
            }
            else{
                $scope.loginErrorMessage = response.error[0];
                $scope.loginError = true;
            }

        });

    }

}]);
