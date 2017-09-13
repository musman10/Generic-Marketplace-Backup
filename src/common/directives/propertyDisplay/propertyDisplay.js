/**
 * Created by asd on 9/6/2017.
 */
angular.module('angularApp')
    .directive('propertyDisplay', function () {
        return {
            restrict : "E",
            templateUrl : "src/common/directives/propertyDisplay/propertyDisplayTemplate.html",
            scope: {
                property: '=',
                data: '='
            },
            controller:"PropertyDisplayController"
        };
    });