angular.module('angularApp')
    .service('tenantListService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "tenantListService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };
        this.getTenantList = function(){
            //return "List Tenant Service executed!";
            var deferred = $q.defer();
            $http.get(app.baseUrl + "api/tenant/get/list")
                .then(function(response) {
                    str = JSON.stringify(response);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }


}]);
