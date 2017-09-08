angular.module('angularApp')
    .service('userViewService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "userViewService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

    }]);