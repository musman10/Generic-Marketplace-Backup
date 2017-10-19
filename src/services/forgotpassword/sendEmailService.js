
angular.module('angularApp')
    .service('sendEmailService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "sendEmailService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.sendMail = function(baseUrl,userId,tenantId , emailId,_id){

            var deferred = $q.defer();
            var user_data = {
                baseUrl:baseUrl,
                userId:userId,
                tenantId : tenantId,
                emailId : emailId,
                _id:_id

            };


            $http.post(app.apiUrl + "/email/forgotPasswordUpdateEmail" , user_data )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

    }]);