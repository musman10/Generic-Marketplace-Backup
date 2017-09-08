/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('requestPostService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "requestPostService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.postRequest = function(request){
            var deferred = $q.defer();
            request.tenantId = app.tenant._id;
            $http.post(app.baseUrl + "api/request/post",request)
                .then(function(response) {
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }

    }]);