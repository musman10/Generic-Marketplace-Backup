/**
 * Created by asd on 9/12/2017.
 */
angular.module('angularApp').factory('usernameservice', function($q, $http) {
    return function(username) {
        var deferred = $q.defer();
        $http.get(app.apiUrl + '/tenant/' + username).then(function(response) {
            debugger;
                str = JSON.stringify(response);
                if(response.data.tenant.length > 0){
                    deferred.reject();
                }
                else{
                    deferred.resolve();
                }
            });

        return deferred.promise;
    }
});