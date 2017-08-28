/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
.service('tenantUserSignupService', ['$http','$q', function ($http,$q) {

    var thisIsPrivate = "tenantUserSignupService";
    
    this.getPrivate = function() {
        return thisIsPrivate;
    };

}]);