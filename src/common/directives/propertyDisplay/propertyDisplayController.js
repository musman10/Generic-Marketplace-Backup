/**
 * Created by asd on 9/6/2017.
 */
angular.module('angularApp')
    .controller('PropertyDisplayController', [ '$scope','NgTableParams','$filter', function ($scope,NgTableParams,$filter) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };
        debugger;

        $scope.isArray=function(type) {
            if (angular.isArray(type)) {
            $scope.columns = type.length;
            $scope.lastColumnWidth = 100 - [($scope.columns - 1) * 20];
            $scope.columnWidth = (100 - $scope.lastColumnWidth)/($scope.columns - 1);
                $scope.lastColumnWidth = $scope.lastColumnWidth.toString() + "%;";
                $scope.columnWidth = $scope.columnWidth.toString() + "%;";
            return true;
            }
            else
               return false;
        }

        $scope.isObject=function(type){
            if( angular.isObject(type))
                return true;
            else
                return false;
        }

        /**/

    }]);