/**
 * Created by asd on 9/6/2017.
 */

angular.module('angularApp')
    .controller('viewRequestController', [ '$scope','$state', 'app', '$stateParams', 'viewRequestService', 'mainService','NgTableParams','$filter',  function ($scope,$state,app,$stateParams,viewRequestService,mainService,NgTableParams,$filter) {
       /* $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : viewRequestController.getPrivate()
        };*/

        var requestId = $stateParams.requestId;
        viewRequestService.view(requestId).then(function(response){
            console.log(response);
           // $scope.result = response.data;
            var information_to_print = response.data[0];
            var information_to_print2 = response.data2[0];
            debugger;
            delete information_to_print._id;
            delete information_to_print.postUserId;
            information_to_print.postusername = information_to_print.username.username;
            delete information_to_print.username;
            delete information_to_print.user_response;
            delete information_to_print.userResponses;
            delete information_to_print.tenantId;
            delete information_to_print.post_user_id;
            information_to_print.tenantname = information_to_print2.tenantname.name;
            $scope.result = information_to_print;

           // $scope.requestTable = new NgTableParams({count: 10}, { dataset: $scope.result});
        });
        

        $scope.viewResponse = function(){
            debugger;
            viewRequestService.viewResponse(requestId).then(function(response){
                $scope.responses = response.data;
            });
        };

    }]);