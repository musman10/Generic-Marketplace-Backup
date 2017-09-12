angular.module('angularApp')
    .directive('propertyConfiguration', function () {
        return {
            restrict : "E",
            templateUrl : "src/common/directives/propertyConfiguration/propertyConfigurationTemplate.html",
            require: ['^form'],
            scope: {
                property: '='
            },
            controller:"PropertyConfigurationController",
            link: function(scope, element, attrs, ctrls) {
                scope.tenantRegistrationForm = ctrls[0];

            }
        };
    });