angular.module('angularApp')
    .service('getService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "getService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.getTenantConf=function(tenantId){
            var deferred = $q.defer();
            //user.tenantId = tenantId;
            /*tenantId = "";*/
                $http.get(app.apiUrl + "/tenant/tenantId/"+tenantId)
                .then(function(response) {
                     debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
            });
            return deferred.promise;
        }

    }]);