angular.module('angularApp')
.directive('propertyInput', function () {
    return {
        restrict : "E",
        require: ['^form'],
        templateUrl : "src/common/directives/propertyInput/propertyInputTemplate.html",
        scope: {
            property: '='
        },
        controller:"PropertyInputController",
        link: function(scope, element, attrs, formCtrl) {
            console.log(formCtrl);
            scope.form = formCtrl[0];
        }
    };
});