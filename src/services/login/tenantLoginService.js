/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
.service('tenantLoginService', ['$http','$q', function ($http,$q) {

    var thisIsPrivate = "tenantLoginService";
    
    this.getPrivate = function() {
        return thisIsPrivate;
    };

}]);