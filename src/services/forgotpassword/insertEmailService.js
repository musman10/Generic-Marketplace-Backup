angular.module('angularApp')
    .service('insertEmailService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "insertEmailService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.insertMail = function(baseUrl,userId,tenantId , emailId){

            var deferred = $q.defer();
            var user_data = {
                baseUrl:baseUrl,
                userId:userId,
                tenantId : tenantId,
                emailId : emailId,

            };

            $http.post(app.apiUrl + "/email/forgotPasswordInsertEmail" , user_data )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

    }]);