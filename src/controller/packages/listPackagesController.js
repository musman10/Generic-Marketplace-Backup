/**
 * Created by asd on 9/6/2017.
 */

angular.module('angularApp')
    .controller('ListPackagesController', [ '$scope','$state', 'app', '$stateParams', 'viewPackagesService', 'mainService',  function ($scope,$state,app,$stateParams,viewPackagesService,mainService) {

        viewPackagesService.view($stateParams.tenantId).then(function(response){
            debugger;
            console.log(response);
            $scope.packages = response.packages;
            for(p in $scope.packages){
                $scope.checkboxes.push(false);
            }
        });
        var packageInformation = $scope.packages;

    }]);