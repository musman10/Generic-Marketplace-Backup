angular.module('angularApp')
    .directive('propertyConfiguration', function () {
        return {
            restrict : "E",
            templateUrl : "src/common/directives/propertyConfiguration/propertyConfigurationTemplate.html",
            scope: {
                property: '='
            },
            controller:"PropertyConfigurationController"
        };
    });