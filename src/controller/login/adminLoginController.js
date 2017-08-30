angular.module('angularApp')
.controller('AdminLoginController', [ '$scope','$state','adminLoginService',  function ($scope,$state,adminLoginService) {
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : adminLoginService.getPrivate()
    };

    $scope.username;
    $scope.password;
    $scope.login = function(){
        var loginSuccess = adminLoginService.login($scope.username,$scope.password);
        if(loginSuccess == true)
            $state.go("AdminHome");
    }
}]);