angular.module('angularApp')
    .service('userListService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "userListService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };
        this.getUserList = function(tenantID){
            var deferred = $q.defer();
            $http.get(app.apiUrl + "/user/list/"+tenantID)
                .then(function(response) {
                    str = JSON.stringify(response);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }


    }]);