/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
.service('adminLoginService', ['$http','$q', function ($http,$q) {

    var thisIsPrivate = "adminLoginService";
    
    this.getPrivate = function() {
        return thisIsPrivate;
    };

   /* this.login = function(){
        return true;
    }*/
    this.getUserInformation = function(username , password){

        var deferred = $q.defer();
        var login_data = {
            isAdmin : true,
            username : username,
            password : password
        };
        $http.post(app.apiUrl + "/user/loginUser" , login_data )
            .then(function(response) {
                debugger;
                str = JSON.stringify(response);
                console.log(str);
                return deferred.resolve(response.data);
            });
        return deferred.promise;

    }

}]);