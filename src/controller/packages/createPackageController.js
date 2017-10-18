angular.module('angularApp')
    .controller('CreatePackageController', [ '$scope','$state','$stateParams','createPackageService','app','$q', function ($scope,$state,$stateParams,createPackageService,app,$q) {
        $scope.description = {
            message: createPackageService.getPrivate()
        };

        $scope.pageTitle = "Create Package";

        debugger;

        /*$scope.selectOption()=function(){
            $scope.myOption
        }*/
        $scope.getTenantRequestTypes=function(){

            createPackageService.getTenantRequestTypes($stateParams.tenantId).then(function(response){
                if(response.success == true){
                    debugger;
                    console.log(response.tenantRequestTypes);
                    $scope.requestTypes = response.tenantRequestTypes;
                }
            });
        };
        $scope.getTenantRequestTypes();

        $scope.createPackage = function(){
            createPackageService.createPackage($scope.packageName,$scope.packagePrice,$scope.packageDescription,$scope.packageDays,$scope.packageRequests, $scope.requestType,$stateParams.tenantId).then(function(response){
                console.log(response);
                if(response.success == true){
                    debugger;
                    console.log(response);
                    $state.go("AdminHome");
                }
                else{
                    $scope.submissionErrorMessage = response.error[0];
                    $scope.submissionError = true;
                }

            });
        }
    }]);