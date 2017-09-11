/**
 * Created by asd on 9/6/2017.
 */
angular.module('angularApp')
    .controller('PropertyDisplayController', [ '$scope', function ($scope) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };

        $scope.isArray=function(type){
           if( angular.isArray(type))
               return true;
            else
               return false;
        }

        $scope.isObject=function(type){
            if( angular.isObject(type))
                return true;
            else
                return false;
        }

    }]);