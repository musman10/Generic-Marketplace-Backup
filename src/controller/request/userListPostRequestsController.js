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
                    $scope.requests[i].datePosted = new Date($scope.requests[i].datePosted);
                    $scope.requests[i].datePosted = $scope.requests[i].datePosted.toLocaleString();
                }
            });
        };

        $scope.listRequestsByUserId(app.loginUser._id);
    }]);