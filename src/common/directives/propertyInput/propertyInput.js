angular.module('angularApp')
.directive('propertyInput', function () {
    return {
        restrict : "E",
        templateUrl : "src/common/directives/propertyInput/propertyInputTemplate.html",
        scope: {
            property: '='
        },
        controller:"PropertyInputController"
    };
});