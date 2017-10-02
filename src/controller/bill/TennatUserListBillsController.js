angular.module('angularApp')
    .controller('TennatUserListBillsController', [ '$scope','$state','tennatUserListBillsService','app','NgTableParams',  function ($scope,$state,tennatUserListBillsService,app,NgTableParams) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : tennatUserListBillsService.getPrivate()
        };

        $scope.getUserBills = function(){
            debugger;
            userid = app.loginUser._id;
            tennatUserListBillsService.getUserBills(userid).then(function(response){
                $scope.userBills = response.data;
                for(i=0;i<$scope.userBills.length;i++){
                    $scope.userBills[i].dateCreated = new Date($scope.userBills[i].dateCreated).toLocaleString();
                }
                $scope.BillTable = new NgTableParams({count: 10}, { dataset: $scope.userBills});
            });
        };

        $scope.getUserBills();
    }]);