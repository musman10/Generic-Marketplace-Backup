angular.module('angularApp')
    .controller('UserListRequestsController', [ '$scope','$state','requestPostService','requestGetService','requestUpdateService','mainService','createObjectService','userListRequestsService',  function ($scope,$state,requestPostService,requestGetService,requestUpdateService,mainService,createObjectService,userListRequestsService) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : requestPostService.getPrivate()
        };

        debugger;
        $scope.requests;
        $scope.requestConfigurations = app.tenant.requests;
        $scope.requestTypes = [];
        $scope.requestResponses = [];

        for(i=0;i<$scope.requestConfigurations.length;i++){
            for(j=0;j<$scope.requestConfigurations[i].viewUsers.length;j++){
                if($scope.requestConfigurations[i].viewUsers[j].name == 'jobseeker' && $scope.requestConfigurations[i].hasParent != "1"){
                    $scope.requestTypes.push($scope.requestConfigurations[i].name);
                    break;
                }
            }
        }

        for(i=0;i<$scope.requestConfigurations.length;i++){
            for(j=0;j<$scope.requestConfigurations[i].userResponses.length;j++){
                if($scope.requestConfigurations[i].userResponses[j].user.name == 'jobseeker'){
                    response = {
                        request:$scope.requestConfigurations[i],
                        responses:$scope.requestConfigurations[i].userResponses[j].responseRequests
                    }
                    $scope.requestResponses.push(response);
                    break;
                }
            }
        }

        $scope.listRequestsByRequestTypes = function(requestTypes){
            debugger;
            userListRequestsService.listRequestsByRequestTypes(requestTypes,app.loginUser._id).then(function(response){
                $scope.requests = response.data;
                for(i=0;i<$scope.requests.length;i++){
                    $scope.requests[i].userResponded = false;
                    for(j=0;j<$scope.requests[i].userResponses.length;j++){

                            if($scope.requests[i].userResponses[j].userId == app.loginUser._id){
                                $scope.requests[i].userResponded = true;
                            }
                            else{
                                $scope.requests[i].userResponses.splice(j,1);

                            }

                    }
                }
            });
        };

        $scope.listRequestsByRequestTypes($scope.requestTypes);

        $scope.respondRequest = function(request,responseRequestConf){
            responseRequestConf = JSON.parse(responseRequestConf);
            debugger;
            responseRequest = createObjectService.createFormObject(responseRequestConf);
            var formJSON = JSON.stringify(responseRequest);
            formJSON = formJSON.substring(0, formJSON.length - 1);
            formJSON = formJSON + ",";
            formJSON = formJSON + '"postUserId":' + '"' + app.loginUser._id + '",';
            formJSON = formJSON + '"userResponses":[],';
            formJSON = formJSON + '"requestType":' + '"' + responseRequestConf.name + '"';
            formJSON = formJSON + '}';
            responseRequest = JSON.parse(formJSON);
            responseRequest.name = request._id + app.loginUser._id;

            requestPostService.postRequest(responseRequest).then(function(response){
                var str = JSON.stringify(response);
                console.log(str);
                if(response.success == true){
                    //$state.go("TenantUserHome");
                    requestGetService.getRequestByName(responseRequest.name).then(function(response){
                        var str = JSON.stringify(response);
                        console.log(str);
                        if(response.success == true){
                            //$state.go("TenantUserHome");
                            var requestResponse = {
                                userId : app.loginUser._id,
                                requestId: response.data._id
                            }
                            requestUpdateService.addResponse(request._id, requestResponse).then(function(response){
                                var str = JSON.stringify(response);
                                console.log(str);
                                if(response.success == true){
                                    //$state.go("TenantUserHome");
                                    alert("your request is sent successfully");
                                }
                                else{
                                    alert(response.error[0]);
                                }
                            });
                        }
                        else{
                            alert(response.error[0]);
                        }
                    });
                }
                else{
                    alert(response.error[0]);
                }
            });

            console.log(formJSON);
        }
    }]);