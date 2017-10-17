angular.module('angularApp')
    .controller('RequestResponseController', [ '$scope','createObjectService', function ($scope,createObjectService) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };
        debugger;
        if($scope.response.requestDetails.hasOwnProperty('datePosted')){
            $scope.response.requestDetails.datePosted = new Date($scope.response.requestDetails.datePosted);
            $scope.response.requestDetails.datePosted = $scope.response.requestDetails.datePosted.toLocaleString();
        }

        if($scope.response.hasOwnProperty('requestDetails')){
            $scope.response.requestDetails.userResponded = false;
            for(i=0;i<$scope.response.requestDetails.userResponses.length;i++){



                if($scope.response.requestDetails.userResponses[i].userId == $scope.userid){
                    $scope.response.requestDetails.userResponded = true;
                }

            }
        }


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
            responseRequest.name = request.requestId + $scope.userid;

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
                            requestUpdateService.addResponse(request.requestId, requestResponse).then(function(response){
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