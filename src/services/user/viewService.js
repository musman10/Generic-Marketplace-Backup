angular.module('angularApp')
    .service('userViewService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "userViewService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.view = function(userId){

            var deferred = $q.defer();
            var userData = {
                userId: userId
            };
            $http.post(app.apiUrl + "/user/view" , userData)
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

    }]);