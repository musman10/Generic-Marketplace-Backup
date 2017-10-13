angular.module('angularApp')
    .service('requestListService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "requestListService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };
        this.getRequestList = function(tenantID){
            var deferred = $q.defer();
            $http.get(app.baseUrl + "/request/list/"+tenantID)
                .then(function(response) {
                    str = JSON.stringify(response);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }


    }]);