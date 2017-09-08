/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('requestUpdateService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "requestPostService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.addResponse = function(requestId,response){
            var deferred = $q.defer();
            addResponsePayLoad = {
                requestId: requestId,
                response:response
            }
            $http.post(app.baseUrl + "api/request/update/addResponse",addResponsePayLoad)
                .then(function(response) {
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }

    }]);