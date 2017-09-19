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
            .state('TenantLogin', {
                url         : '/login',
                templateUrl : 'public/templates/login/tenantLogin.html',
                controller  : 'TenantLoginController'
            })
            .state('TenantUserSignup', {
                url         : '/signup',
                templateUrl : 'public/templates/signup/tenantUserSignup.html',
                controller  : 'TenantUserSignupController',
                params:{
                    userType:''
                }
            })
            .state('TenantUserHome', {
                url         : '/user/home',
                templateUrl : 'public/templates/home/tenantUserHome.html',
                controller  : 'TenantUserHomeController',
                parent:'MasterLayout'
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
 	        .state('ViewMyProfile', {
                url         : '/profile/viewmyprofile',
                templateUrl : 'public/templates/profile/viewMyProfile.html',
                controller  : 'viewMyProfileController',
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
           /* .state('ViewRequest', {
                url         : '/request/view/:requestId',
                templateUrl : 'public/templates/request/view.html',
                controller  : 'RequestViewController',
                parent:'MasterLayout'
            })*/
            .state('ListUser', {
                url         : '/user/list/byTenantId/:tenantId',
                templateUrl : 'public/templates/user/list.html',
                controller  : 'UserListController',
                parent:'MasterLayout'
            })
            .state('ViewUser', {
                url         : '/user/view/:userId',
                templateUrl : 'public/templates/user/view.html',
                controller  : 'UserViewController',
                parent:'MasterLayout'
            })
    	    .state('PostRequest', {
                url         : '/post/request',
                templateUrl : 'public/templates/request/post.html',
                controller  : 'RequestPostController',
                parent:'MasterLayout'
            })
            .state('TennatUserListRequests', {
                url         : '/user/list/request',
                templateUrl : 'public/templates/request/userListRequests.html',
                controller  : 'UserListRequestsController',
                parent:'MasterLayout'
            })
            .state('TennatUserListPostRequests', {
                url         : '/user/list/post/request',
                templateUrl : 'public/templates/request/userListPostRequests.html',
                controller  : 'UserListPostRequestsController',
                parent:'MasterLayout'
            })
            .state('Table', {
                url         : '/table/table',
                templateUrl : 'public/templates/table/table.html',
                controller  : 'TableController',
                parent:'MasterLayout'
            })
}]);

    var app = {
        baseUrl:'',
        tenant:{},
        tenantUsers:[],
        tenantRequests:[],
        appType:'admin'
    }

    angular.module('angularApp').value('app', app);
