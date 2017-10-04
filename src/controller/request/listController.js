angular.module('angularApp')
    .controller('RequestListController', [ '$scope','$filter','$stateParams','requestListService','app','NgTableParams',  function ($scope,$filter,$stateParams,requestListService,app,NgTableParams) {
        $scope.description = {
            message: requestListService.getPrivate()
        };
        $scope.tenantID=$stateParams.tenantId;
        $scope.result;
        $scope.pageTitle = "Requests List";

        //requestListService.getRequestList($scope.tenantID).then(
        //    function(response){
        //        $scope.result= response.data;
        //    }
        //);

        requestListService.getRequestList($scope.tenantID).then(
            function(response){
                debugger;
                var result= response.data;
                $scope.result=[];
                for (var i = 0; i < result.length; i++) {
                    var reqname = result[i].name;
                    var req_id = result[i]._id;
                    var username = "";
                    var dateposted=new Date(result[i].datePosted).toLocaleString();

                    var datelastmodified=new Date(result[i].dateLastModified).toLocaleString();
                       /* response.data[i].dateCreated = new Date(response.data[i].dateCreated).toLocaleString();
                        response.data[i].dateLastModified = new Date(response.data[i].dateLastModified).toLocaleString();*/


                    if(result[i].hasOwnProperty("requestdetails")){
                        var username = result[i].requestdetails.name;
                    }
                    var temp =
                    {
                        _id : req_id,
                        reqname : reqname,
                        username : username,
                        dateposted:dateposted,
                        datelastmodified:datelastmodified
                    };
                    $scope.result.push(temp);
                }
                $scope.requestTable = new NgTableParams({count: 10}, { dataset: $scope.result});
            }
        );


        //$scope.requestTable = new NgTableParams({
        //    page: 1,
        //    count: 10
        //
        //}, {
        //    getData: function ( params) {
        //        requestListService.getRequestList($scope.tenantID).then(
        //            function(response){
        //                var result= response.data;
        //                $scope.result=[];
        //                for (var i = 0; i < result.length; i++) {
        //                    var reqname = result[i].reqname;
        //                    var username = result[i].requestdetails.username;
        //                    var temp =
        //                    {
        //                        reqname : reqname,
        //                        username : username
        //                    };
        //                    $scope.result.push(temp);
        //                }
        //                console.log("result"+result);
        //                total= $scope.result.length;
        //                $scope.data = params.sorting() ? $filter('orderBy')($scope.result, params.orderBy()) : $scope.result;
        //                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
        //                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
        //                return $scope.data;
        //            }
        //        );
        //
        //    }
        //});
        //alert("my list request controller");

    }]);