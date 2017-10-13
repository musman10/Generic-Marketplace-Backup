/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('requestGetService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "requestPostService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.getRequestByName = function(requestName){
            var deferred = $q.defer();
            $http.get(app.baseUrl + "/request/getByName/" + requestName)
                .then(function(response) {
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }

    }]);