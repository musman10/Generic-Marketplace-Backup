/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
.service('adminService', ['$http','$q', function ($http,$q) {

    var thisIsPrivate = "adminService";
    
    this.getPrivate = function() {
        return thisIsPrivate;
    };

    this.login = function(){
        return true;
    }

}]);