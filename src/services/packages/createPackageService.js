angular.module('angularApp')
    .service('createPackageService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "createPackageService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };
        this.getTenantRequestTypes=function(tenantId){
            var deferred = $q.defer();
            $http.get(app.baseUrl + "/tenant/tenantRequestTypes/"+tenantId)
                .then(function(response) {
                    str = JSON.stringify(response);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }

        this.createPackage = function(packageName,packagePrice,packageDescription,packageDays,packageRequests,requestType,tenantId ){
            var billPackage= {
                packageName : packageName,
                packagePrice : packagePrice,
                packageDescription: packageDescription,
                packageDays: packageDays,
                packageRequests:packageRequests,
                packageReqType:requestType,
                tenantId:tenantId

            }

            var deferred = $q.defer();
            $http.post(app.baseUrl + "/packages/createPackages/insert" , billPackage )
                .then(function(response) {
                    debugger;
                    console.log(requestType);
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;



        }


    }]);