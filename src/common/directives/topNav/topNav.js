angular.module('angularApp')
    .directive('topNav', function () {
        return {
            restrict : "E",
            templateUrl : "src/common/directives/topNav/topNavTemplate.html",
            controller:"TopNavController",
            scope:{
                appType:'@'
            }
        };
    });