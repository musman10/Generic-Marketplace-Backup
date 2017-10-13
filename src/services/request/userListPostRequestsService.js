/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('userListPostRequestsService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "requestPostService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.listPostRequestsByUserId = function(userid){
            var deferred = $q.defer();

            $http.get(app.baseUrl + "/user/post/request/list/userid/" + userid)
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }

    }]);