/**
 * Created by asd on 9/6/2017.
 */

angular.module('angularApp')
    .service('viewRequestService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "viewRequestService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.view = function(requestId){

            var deferred = $q.defer();
            var reqData = {
                requestId: requestId
            };
            $http.post(app.baseUrl + "/request/view" , reqData)
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

        this.viewResponse = function(requestId){
            var deferred = $q.defer();
            var listRequestPayload = {
                requestId:requestId
            };
            $http.post(app.baseUrl + "/request/response/",listRequestPayload)
                .then(function(response) {
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }

    }]);