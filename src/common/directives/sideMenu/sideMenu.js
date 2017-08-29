angular.module('angularApp')
    .directive('sideMenu', function () {
        return {
            restrict : "E",
            templateUrl : "src/common/directives/sideMenu/sideMenuTemplate.html",
            controller:"SideMenuController",
            scope:{
                appType:'@'
            }
        };
    });