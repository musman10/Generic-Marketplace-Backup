angular.module('angularApp')
    .directive('requestResponse', function () {
        return {
            restrict : "E",
            templateUrl : "src/common/directives/requestResponse/requestResponseTemplate.html",
            scope: {
                response: '='
            },
            controller:"RequestResponseController"
        };
    });