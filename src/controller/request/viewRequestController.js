/**
 * Created by asd on 9/6/2017.
 */

angular.module('angularApp')
    .controller('viewRequestController', [ '$scope','$state', 'app', '$stateParams', 'viewRequestService', 'mainService',  function ($scope,$state,app,$stateParams,viewRequestService,mainService) {
       /* $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : viewRequestController.getPrivate()
        };*/

        $scope.requestId = "59afc74a363277195c87fc6e";

        $scope.view = function(requestId){
            debugger;
            viewRequestService.view(requestId).then(function(response){
                console.log(response);
                $scope.result = response.data;
                //$scope.viewReq = requestId;
              //  $scope.requestConf = mainService.getRequestConfByRequestType($scope.result.requestType);
               //console.log(requestConf);
            });
        }


    }]);