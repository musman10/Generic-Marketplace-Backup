angular.module('angularApp')
    .directive('requestResponseExpansion', function () {
        return {
            restrict : "E",
            templateUrl : "src/common/directives/requestResponseExpansion/requestResponseExpansionTemplate.html",
            scope: {
                response: '='
            },
            controller:"RequestResponseExpansionController"
        };
    });