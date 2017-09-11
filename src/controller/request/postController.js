angular.module('angularApp')
.controller('RequestPostController', [ '$scope','$state','requestPostService','mainService','createObjectService',  function ($scope,$state,requestPostService,mainService,createObjectService) {
    $scope.description = {
        message1  : 'My first Angular app',
        message2 : 'developing for testing',
        message3 : requestPostService.getPrivate()
    };

    $scope.requestType = "";
    $scope.requestConf;

    $scope.loadPostRequestForm = function(){
        debugger;
        $scope.requestConf = mainService.getRequestConfByRequestType($scope.requestType);
    };

    $scope.post = function(){
        $scope.request = createObjectService.createFormObject($scope.requestConf);
        var formJSON = JSON.stringify($scope.request);
        formJSON = formJSON.substring(0, formJSON.length - 1);
        formJSON = formJSON + ",";
        formJSON = formJSON + '"postUserId":' + '"' + app.loginUser._id + '",';
        formJSON = formJSON + '"userResponses":[],';
        formJSON = formJSON + '"requestType":' + '"' + $scope.requestType + '"';
        formJSON = formJSON + '}';
        $scope.request = JSON.parse(formJSON);
        requestPostService.postRequest($scope.request).then(function(response){
            var str = JSON.stringify(response);
            console.log(str);
            if(response.success == true){
                $state.go("TenantUserHome");
            }
            else{
                alert(response.error[0]);
            }
        });
        console.log(formJSON);
    };



}]);