angular.module('angularApp')
    .service('getUserInfoService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "getUserInfoService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.checkUserInfo = function(tenantId , emailId){

            var deferred = $q.defer();
            var user_data = {
                tenantId : tenantId,
                emailId : emailId
            };
            $http.post(app.apiUrl + "/user/getUser" , user_data )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

    }]);