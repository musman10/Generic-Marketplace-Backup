angular.module('angularApp')
    .service('requestViewService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "requestViewService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

    }]);