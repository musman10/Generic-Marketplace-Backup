/**
 * Created by asd on 9/12/2017.
 */
angular.module('angularApp').directive('unique', function(usernameservice) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.unique = usernameservice;
        }
    };
});
