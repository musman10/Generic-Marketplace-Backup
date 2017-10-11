angular.module('angularApp')
.controller('AdminLoginController', [ '$scope','$state','adminLoginService',  function ($scope,$state,adminLoginService) {
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : adminLoginService.getPrivate()
    };

    app.loginUser={};
    console.log("app.LoginUser: ");
    console.log(app.loginUser);


    $scope.login = function(){
        debugger;

        username = $scope.userNameAdmin;
        password = $scope.userPasswordAdmin;
        console.log(username + password);

        adminLoginService.getUserInformation(username , password).then(function(response){
            console.log(response);
            if(response.success == true){
                app.loginUser = response.data;
                console.log(JSON.stringify(app));
                $state.go("AdminHome");
                console.log("app.LoginUser: "+app.loginUser);
            }
            else{
                $scope.loginErrorMessage = response.error[0];
                $scope.loginError = true;
            }

        });

    }
}]);
