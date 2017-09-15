/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
.service('tenantLoginService', ['$http','$q', function ($http,$q) {

    var thisIsPrivate = "tenantLoginService";

    this.getPrivate = function() {
        return thisIsPrivate;
    };

    this.getUserInformation = function(tenant_id, username , password){

        var deferred = $q.defer();
        var login_data = {
            isAdmin : false,
            tenant_id : tenant_id,
            username : username,
            password : password
        };
        $http.post(app.baseUrl + "api/user/loginUser" , login_data )
            .then(function(response) {
                debugger;
                str = JSON.stringify(response);
                console.log(str);
                return deferred.resolve(response.data);
            });
        return deferred.promise;

    }

}]);
