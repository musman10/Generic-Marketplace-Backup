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

        var requestId = $stateParams.requestId;
        viewRequestService.view(requestId).then(function(response){
            console.log(response);
           // $scope.result = response.data;
            var information_to_print = response.data[0];
            var information_to_print2 = response.data2[0];
            debugger;
            //delete information_to_print._id;
            //delete information_to_print.postUserId;
            information_to_print.postusername = information_to_print.username.username;
            //delete information_to_print.username;
            //delete information_to_print.user_response;
            //delete information_to_print.tenantId;
            //delete information_to_print.post_user_id;
            information_to_print.tenantname = information_to_print2.tenantname.name;
            $scope.result = information_to_print;
       /*     debugger;
            $scope.requests;
            $scope.requestConfigurations = $scope.result;
            $scope.requestTypes = [];
            $scope.requestResponses = [];

            for(i=0;i<$scope.requestConfigurations.length;i++){
                for(j=0;j<$scope.requestConfigurations[i].viewUsers.length;j++){
                    if($scope.requestConfigurations[i].viewUsers[j].name == 'Jobseeker' && $scope.requestConfigurations[i].hasParent != "1"){
                        $scope.requestTypes.push($scope.requestConfigurations[i].name);
                        break;
                    }
                }
            }

            for(i=0;i<$scope.requestConfigurations.length;i++){
                for(j=0;j<$scope.requestConfigurations[i].userResponses.length;j++){
                    if($scope.requestConfigurations[i].userResponses[j].user.name == 'Jobseeker'){
                        response = {
                            request:$scope.requestConfigurations[i],
                            responses:$scope.requestConfigurations[i].userResponses[j].responseRequests
                        }
                        $scope.requestResponses.push(response);
                        break;
                    }
                }
            }*/

        });




        $scope.viewResponse = function(){
            debugger;
            viewRequestService.viewResponse(requestId).then(function(response){
                $scope.responses = response.data;
              /*  for(i=0;i<$scope.requests.length;i++){
                    $scope.requests[i].userResponded = false;
                    for(j=0;j<$scope.requests[i].userResponses.length;j++){

                        if($scope.requests[i].userResponses[j].userId == app.loginUser._id){
                            $scope.requests[i].userResponded = true;
                        }
                        else{
                            $scope.requests[i].userResponses.splice(j,1);

                        }

                    }
                }*/
            });
        };



    }]);