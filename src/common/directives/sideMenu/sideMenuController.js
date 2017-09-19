angular.module('angularApp')
    .controller('SideMenuController', [ '$scope', 'app','mainService', function ($scope,app,mainService) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };
        $scope.appType = app.appType;

        if($scope.appType == "tenant"){
            $scope.postRequestPermission = mainService.checkPostRequestPermission();
            $scope.viewRequestPermission = mainService.checkViewRequestPermission();
        }

    }]);

