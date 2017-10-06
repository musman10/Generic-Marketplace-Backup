angular.module('angularApp')
    .controller('UserListPostRequestsController', [ '$scope','$state','requestPostService','requestGetService','requestUpdateService','mainService','createObjectService','userListPostRequestsService',  function ($scope,$state,requestPostService,requestGetService,requestUpdateService,mainService,createObjectService,userListPostRequestsService) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : requestPostService.getPrivate()
        };


        $scope.requests;
        $scope.requestConfigurations = app.tenant.requests;
        $scope.requestTypes = [];
        $scope.requestResponses = [];
        $scope.userid = app.loginUser._id;

        debugger;
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


        $scope.listRequestsByUserId = function(userId){
            debugger;
            userListPostRequestsService.listPostRequestsByUserId(userId).then(function(response){
                $scope.requests = response.data;
                for(i=0;i<$scope.requests.length;i++){
                    //$scope.requests[i].datePosted = new Date($scope.requests[i].datePosted);
                    //$scope.requests[i].datePosted = $scope.requests[i].datePosted.toLocaleString();

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

        $scope.listRequestsByUserId(app.loginUser._id);
    }]);