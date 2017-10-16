/**
 * Created by semianchuk on 08.10.16.
 */
angular.module('angularApp')
    .controller('mainController', [ '$scope','$state', 'mainFactory', 'mainService', 'mainProvider', '$location','app', function ($scope, $state, mainFactory, mainService, mainProvider,$location,app) {
        debugger;
        $scope.location=$location;
        $scope.url = $scope.location.host();
        $scope.state = $state.current;
        var hostArr = $scope.url.split(".");
        //console.log(hostArr);
        //if(hostArr.length == 3){
        //    var tenantName = hostArr[1];
        //    mainService.getTenantConfiguration(tenantName,$scope.url).then(function(tenant){
        //        // app.baseUrl = "http://" + $scope.url + ":3000";
        //        app.tenant = tenant;
        //        app.appType = 'tenant';
        //        //str = JSON.stringify(app);
        //        //console.log(str);
        //        mainService.createTenantUserObjects();
        //        $state.go('TenantLogin');
        //    });
        //}
        //else{
            var tenantName = hostArr[0];
            app.baseUrl = "http://" + $scope.url + ":3000";
            app.appType = 'admin';
            $state.go('AdminLogin');
        //}

        $scope.getFactory  = mainFactory.getPrivate();
        $scope.getService  = mainService.getPrivate();
        $scope.getProvider = mainProvider.getPrivate();

    }]);
