angular.module('angularApp')
    .service('tenantViewService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "tenantViewService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

    }]);