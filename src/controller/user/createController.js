angular.module('angularApp')
    .controller('CreateController', [ '$scope','$stateParams','createService','getService','mainService','$state','app',  function ($scope,$stateParams,createService,getService,mainService,$state,app) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : createService.getPrivate(),
            message4 : getService.getPrivate()
        };
        debugger;
        $scope.userType='';
        $scope.tenantConf = {};
        $scope.userConfList = [];
        $scope.userConf = {};

        $scope.getTenantConfiguration = function() {
            debugger;
            getService.getTenantConf($stateParams.tenantId).then(
                function (response) {
                    debugger;
                    $scope.tenantConf = response.tenant[0];
                    $scope.userConfList = $scope.tenantConf.users;
                });
        };

        $scope.getTenantConfiguration();
        $scope.loadSignUpForm = function(){
            for(i=0;i<$scope.tenantConf.users.length;i++){
                    if($scope.tenantConf.users[i].name == $scope.userType)
                        $scope.userConf = $scope.tenantConf.users[i];
            }
        };
        str = JSON.stringify($scope.user);
        console.log(str);

        $scope.signup = function(){
            debugger;
            $scope.formObject();
            str = JSON.stringify($scope.user);
            console.log(str);
            $scope.user.userType = $scope.userType ;
            $scope.user.tenantId = $stateParams.tenantId;
            createService.signup($scope.user,app).then(function(response){
                debugger;
                var str = JSON.stringify(response);
                console.log(str);
                if(response.success == true){
                    $state.go("ListUser", {'tenantId': $stateParams.tenantId});
                }
                else{
                    alert(response.error[0]);
                }
            });

        }

        $scope.formObject = function(){
            $scope.user = createService.createFormObject($scope.userConf);

        }

    }]);