angular.module('angularApp')
    .controller('UserViewController', [ '$scope','$stateParams','userViewService','app', 'userListPostRequestsService',  function ($scope,$stateParams,userViewService,app,userListPostRequestsService) {
        $scope.description = {
            message: userViewService.getPrivate()
        };

        var userId = $stateParams.userId;
        userViewService.view(userId).then(function(response){
            console.log(response);
            // $scope.result = response.data;
            var information_to_print = response.data[0];
            debugger;
            information_to_print.tenantName = information_to_print.tenantName.name;
            delete information_to_print.tenantId;
            delete information_to_print._id;
            information_to_print.dateCreated =  new Date(information_to_print.dateCreated).toLocaleString();
            information_to_print.dateLastModified = new Date(information_to_print.dateLastModified).toLocaleString();
            $scope.result = information_to_print;

            // $scope.requestTable = new NgTableParams({count: 10}, { dataset: $scope.result});
        });

        $scope.listRequestsByUserId = function(userId){
            debugger;
            userListPostRequestsService.listPostRequestsByUserId(userId).then(function(response){
                $scope.requests = response.data;
                for(i=0;i<$scope.requests.length;i++){
                    $scope.requests[i].datePosted = new Date($scope.requests[i].datePosted);
                    $scope.requests[i].datePosted = $scope.requests[i].datePosted.toLocaleString();
                    console.log($scope.requests[i]);
                    $scope.requestResponses = [];
                }
            });
        };
        $scope.listRequestsByUserId(userId);

        //alert("View User controller");

    }]);