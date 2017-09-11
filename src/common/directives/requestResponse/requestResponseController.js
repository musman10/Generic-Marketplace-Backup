angular.module('angularApp')
    .controller('RequestResponseController', [ '$scope', function ($scope) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };

    }]);