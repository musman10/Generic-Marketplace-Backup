angular.module('angularApp')
    .controller('UserListRequestsController', [ '$scope','$state','requestPostService','requestGetService','requestUpdateService','mainService','createObjectService','userListRequestsService','$mdDialog','$mdToast',  function ($scope,$state,requestPostService,requestGetService,requestUpdateService,mainService,createObjectService,userListRequestsService,$mdDialog,$mdToast) {
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
                if($scope.requestConfigurations[i].viewUsers[j].name == app.loginUser.userType && $scope.requestConfigurations[i].hasParent != "1"){
                    $scope.requestTypes.push($scope.requestConfigurations[i].name);
                    break;
                }
            }
        }

        for(i=0;i<$scope.requestConfigurations.length;i++){
            for(j=0;j<$scope.requestConfigurations[i].userResponses.length;j++){
                if($scope.requestConfigurations[i].userResponses[j].user.name == app.loginUser.userType){
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
                for(i=0;i<$scope.requests.length;i++) {
                    $scope.requests[i].userResponded = false;
                    for (j = 0; j < $scope.requests[i].userResponses.length; j++) {

                        if ($scope.requests[i].userResponses[j].userId == app.loginUser._id) {
                            $scope.requests[i].userResponded = true;
                        }
                        else {
                            $scope.requests[i].userResponses.splice(j, 1);

                        }

                    }
                    debugger;
                    $scope.requests[i].datePosted = new Date($scope.requests[i].datePosted);

                    var seconds = parseInt((new Date() - $scope.requests[i].datePosted) / (1000));
                    var minutes = Math.floor(seconds / 60);
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours / 24);
                    //var days = parseInt((new Date() - $scope.requests[i].datePosted) / (1000 * 60 * 60 * 24));
                    var months = Math.floor(days / 31);
                    var years = Math.floor(months / 12);
                    if (years != 0) {
                        $scope.requests[i].datePosted = years + " years ago";
                    }
                    else if(months != 0 && years == 0){
                        $scope.requests[i].datePosted = months + " months ago";
                    }
                    else if(days != 0 && months == 0 && years == 0){
                        $scope.requests[i].datePosted =days + " days ago";
                    }
                    else if(hours != 0 && days == 0 && months == 0 && years == 0){
                        $scope.requests[i].datePosted = hours + " hours ago";
                    }
                    else if(minutes != 0 && hours == 0 && days == 0 && months == 0 && years == 0){
                        $scope.requests[i].datePosted =  minutes + " minutes ago";
                    }
                    else if(seconds != 0 && minutes == 0 && hours == 0 && days == 0 && months == 0 && years == 0){
                        $scope.requests[i].datePosted =  seconds + " seconds ago";
                    }
                    else if(seconds == 0 && minutes == 0 && hours == 0 && days == 0 && months == 0 && years == 0){
                        $scope.requests[i].datePosted =  "Just now";
                    }

                }
            });
        };

        $scope.listRequestsByRequestTypes($scope.requestTypes);

        $scope.respondRequest = function(request,responseRequestConf){
            $mdDialog.show({
                //targetEvent: $event,
                template:
                '<md-dialog aria-label="List dialog" style="text-align:center;height:250px;height:300px;padding:20px">' +
                '  <md-dialog-content style="text-align:center;height:100%;width:100%;padding:0px">'+
                '       <h3>Posting Request ...</h3>' +
                '       <div style="text-align:center;height:200px;width:100%;padding:60px">'+
                '           <md-progress-circular class="md-hue-2" md-diameter="70"></md-progress-circular>' +
                '       </div>'+
                '  </md-dialog-content>' +
                '</md-dialog>'
            });

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
                                $mdDialog.hide();
                                var str = JSON.stringify(response);
                                console.log(str);
                                if(response.success == true){
                                    //$state.go("TenantUserHome");
                                    var last = {
                                        bottom: false,
                                        top: true,
                                        left: false,
                                        right: true
                                    };
                                    $scope.getToastPosition = function() {
                                        //sanitizePosition();

                                        return Object.keys($scope.toastPosition)
                                            .filter(function(pos) { return $scope.toastPosition[pos]; })
                                            .join(' ');
                                    };

                                    $scope.toastPosition = angular.extend({},last);

                                    var pinTo = $scope.getToastPosition();
                                    $mdToast.show(
                                        $mdToast.simple()
                                            .textContent('Request Posted Successfully!')
                                            .position(pinTo )
                                            .hideDelay(3000)
                                    );
                                    //alert("your request is sent successfully");
                                }
                                else{
                                    $mdDialog.hide();
                                    alert(response.error[0]);
                                }
                            });
                        }
                        else{
                            $mdDialog.hide();
                            alert(response.error[0]);
                        }
                    });
                }
                else{
                    $mdDialog.hide();
                    alert(response.error[0]);
                }
            });

            console.log(formJSON);
        }
    }]);