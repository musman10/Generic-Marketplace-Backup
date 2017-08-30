angular.module('angularApp')
    .controller('SideMenuController', [ '$scope', 'app', function ($scope,app) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };
        $scope.appType = app.appType;
    }]);