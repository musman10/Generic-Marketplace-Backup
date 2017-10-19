/**
 * Created by asd on 8/30/2017.
 */

angular.module('angularApp')
    .service('viewMyProfileService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "viewMyProfileService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.updateUserProfile = function(updatedUser){

            var deferred = $q.defer();
            $http.post(app.apiUrl + "/user/updateUser" , updatedUser )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

    }]);