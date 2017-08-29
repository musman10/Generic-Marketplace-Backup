/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
.service('adminLoginService', ['$http','$q', function ($http,$q) {

    var thisIsPrivate = "adminLoginService";
    
    this.getPrivate = function() {
        return thisIsPrivate;
    };

    this.login = function(){
        return true;
    }

}]);