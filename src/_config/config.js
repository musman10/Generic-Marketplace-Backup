/**
 * Created by semianchuk on 08.10.16.
 */
angular.module('angularApp')
    .config(['$locationProvider','$stateProvider','$httpProvider',function($locationProvider,$stateProvider,$httpProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('main', {
                url         : '/',
                controller  : 'mainController'
            })
            .state('MasterLayout', {
                //abstract: true,
                templateUrl: 'public/templates/shared/masterLayout.html',
                controller:'MasterLayoutController'
            })
            .state('AdminLogin', {
                url         : '/admin/login',
                templateUrl : 'public/templates/login/adminLogin.html',
                controller  : 'AdminLoginController',
            })
            .state('AdminHome', {
                url         : '/admin/home',
                templateUrl : 'public/templates/admin/home.html',
                controller  : 'AdminController',
                parent:'MasterLayout'
            })
            .state('RegisterTenant', {
                url         : '/tenant/register',
                templateUrl : 'public/templates/tenant/register.html',
                controller  : 'TenantRegisterController',
                parent:'MasterLayout'
            })
            .state('ViewRequest', {
                url         : '/request/view/:requestId',
                templateUrl : 'public/templates/request/viewRequest.html',
                controller  : 'viewRequestController',
                parent:'MasterLayout'
            })
            .state('ListTenant', {
                url         : '/tenant/list',
                templateUrl : 'public/templates/tenant/list.html',
                controller  : 'TenantListController',
                parent:'MasterLayout'
            })
            .state('ViewTenant', {
                url         : '/tenant/view/:tenantId',
                templateUrl : 'public/templates/tenant/view.html',
                controller  : 'TenantViewController',
                parent:'MasterLayout'
            })
            .state('ListRequest', {
                url         : '/request/list/:tenantId',
                templateUrl : 'public/templates/request/list.html',
                controller  : 'RequestListController',
                parent:'MasterLayout'
            })
            .state('ListUser', {
                url         : '/user/list/byTenantId/:tenantId',
                templateUrl : 'public/templates/user/list.html',
                controller  : 'UserListController',
                parent:'MasterLayout',
                params:{
                    tenantId:''
                }
            })
            .state('ViewUser', {
                url         : '/user/view/:userId',
                templateUrl : 'public/templates/user/view.html',
                controller  : 'UserViewController',
                parent:'MasterLayout'
            })
	        .state('TenantUserCreation', {
                url         : '/user/create/:tenantId',
                templateUrl : 'public/templates/user/create.html',
                controller  : 'CreateController',
                parent:'MasterLayout',
                params:{
                    userType:''
                }
            })
            .state('ViewPackages', {
                url         : '/packages/view',
                templateUrl : 'public/templates/packages/viewPackages.html',
                controller  : 'ViewPackagesController',
                parent:'MasterLayout'
            })
            .state('CreatePackages', {
                url         : '/packages/createPackages/:tenantId',
                templateUrl : 'public/templates/packages/createPackages.html',
                controller  : 'CreatePackageController',
                parent:'MasterLayout'
            })

}]);

    var app = {
        baseUrl:'http://localhost:3000',
        tenant:{},
        tenantUsers:[],
        tenantRequests:[],
        appType:'admin'
    }

    angular.module('angularApp').value('app', app);
