/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('tennatUserListBillsService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "adminService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.login = function(){
            return true;
        }

        this.getUserBills = function(userid){
            var deferred = $q.defer();
            $http.get(app.baseUrl + "/bill/getUserBillList/ByUserId/" + userid)
                .then(function(response) {
                    str = JSON.stringify(response);
                    console.log(str);
                    return deferred.resolve(response.data);
                });
            return deferred.promise;
        }
    }]);