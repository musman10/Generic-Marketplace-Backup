/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('userListRequestsService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "requestPostService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.listRequestsByRequestTypes = function(requestTypes,userid){
            var deferred = $q.defer();
            var listRequestPayload = {
                requestTypes: requestTypes,
                userid:userid
            };
            $http.post(app.baseUrl + "api/request/user/list/requestTypes/",listRequestPayload)
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }

    }]);