/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
.service('tenantRegisterService', ['$http','$q', function ($http,$q) {

    var thisIsPrivate = "tenantRegisterService";
    
    this.getPrivate = function() {
        return thisIsPrivate;
    };

    this.register = function(tenant,baseUrl){
        
        var deferred = $q.defer();
        $http.post(app.baseUrl + "/tenant/register",tenant)
        .then(function(response) {
            str = JSON.stringify(response);
            console.log(str);
            return deferred.resolve(response.data);
        });
        return deferred.promise;
    };

}]);