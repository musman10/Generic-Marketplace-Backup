angular.module('angularApp')
    .controller('UserViewController', [ '$scope','$stateParams','userViewService','app',  function ($scope,$stateParams,userViewService,app) {
        $scope.description = {
            message: userViewService.getPrivate()
        };

        $scope.pageTitle = "User Page ";
        $scope.userID=$stateParams.userId;

        //alert("View User controller");

    }]);