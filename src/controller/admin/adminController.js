angular.module('angularApp')
.controller('AdminController', [ '$scope','$state','adminService',  function ($scope,$state,adminService) {
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : adminService.getPrivate()
    };

}]);