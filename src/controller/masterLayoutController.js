angular.module('angularApp')
    .controller('MasterLayoutController', [ '$scope','$state','app',function ($scope,$state,app) {

        $scope.appType = app.appType;
    }]);