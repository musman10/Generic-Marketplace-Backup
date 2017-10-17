angular.module('angularApp')
    .service('createPackageService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "createPackageService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };
        this.createPackage = function(packageName,packagePrice,packageDescription,packageDays,packageRequests,tenantId){
            var billPackage= {
                packageName : packageName,
                packagePrice : packagePrice,
                packageDescription: packageDescription,
                packageDays: packageDays,
                packageRequests:packageRequests,
                packageReqType:"recruitment",
                tenantId:tenantId

            }

            var deferred = $q.defer();
            $http.post(app.baseUrl + "/packages/createPackages/insert" , billPackage )
                .then(function(response) {
                    debugger;
                    console.log(packageName);
                    console.log(packagePrice);
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;



        }


    }]);