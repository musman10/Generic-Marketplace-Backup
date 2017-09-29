angular.module('angularApp')
    .controller('IndexController', [ '$scope','$state',  function ($scope,$state) {


        $scope.signup = function(userTypeName){
            $state.go("TenantUserSignup", {
                userType: userTypeName
            });

        } ;
    }]);
