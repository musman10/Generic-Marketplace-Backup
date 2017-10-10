angular.module('angularApp')
    .controller('TopNavController', [ '$scope', 'app','mainService', function ($scope,app,mainService) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };
        $scope.userID = app.loginUser._id;
        $scope.appType = app.appType;
        if($scope.appType == "admin") {
            $scope.headTitle = "Generic Marketplace";
        }
        else if($scope.appType == "tenant"){
            $scope.headTitle = app.tenant.name;
        }

        if($scope.appType == "tenant"){
            $scope.postRequestPermission = mainService.checkPostRequestPermission();
            $scope.viewRequestPermission = mainService.checkViewRequestPermission();
        }
    }]);