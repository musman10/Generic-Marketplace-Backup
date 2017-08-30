angular.module('angularApp')
    .controller('TopNavController', [ '$scope', 'app', function ($scope,app) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };
        $scope.appType = app.appType;
        if($scope.appType == "admin") {
            $scope.headTitle = "Generic Marketplace";
        }
        else if($scope.appType == "tenant"){
            $scope.headTitle = app.tenant.name;
        }
    }]);