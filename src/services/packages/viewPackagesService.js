/**
 * Created by asd on 9/6/2017.
 */

angular.module('angularApp')
    .service('viewPackagesService', ['$http','$q', function ($http,$q) {

        //var thisIsPrivate = "viewPackagesService";

       /* this.getPrivate = function() {
            return thisIsPrivate;
        };*/

        this.view = function(tenantId){

            var deferred = $q.defer();
            var packageData = {
                tenantId: tenantId
            };
            $http.post(app.baseUrl + "/packages/view", packageData )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }


        this.insertUserPackges = function(userPackage){

            var deferred = $q.defer();
            $http.post(app.baseUrl + "/packages/userpackages/insert", userPackage )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

        this.insertUserBills = function(userBills){

            var deferred = $q.defer();
            $http.post(app.baseUrl + "/bills/userbills/insert", userBills )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }


        this.insertUserBillPackages = function(userBillPackages){

            var deferred = $q.defer();
            $http.post(app.baseUrl + "/bills/userbillpackages/insert", userBillPackages )
                .then(function(response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

        this.insertPayment = function(payment) {

            var deferred = $q.defer();
            $http.post(app.baseUrl + "/payment/insert", payment)
                .then(function (response) {
                    debugger;
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;

        }

        }]);