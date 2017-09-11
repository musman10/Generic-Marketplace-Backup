/**
 * Created by semianchuk on 08.10.16.
 */
angular.module('angularApp')
    .config(['$locationProvider','$stateProvider','$httpProvider',function($locationProvider,$stateProvider,$httpProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('main', {
                url         : '/',
                controller  : 'mainController',
            })
            .state('MasterLayout', {
                //abstract: true,
                templateUrl: 'public/templates/shared/masterLayout.html',
                controller:'MasterLayoutController'
            })
            .state('TenantLogin', {
                url         : '/login',
                templateUrl : 'public/templates/login/tenantLogin.html',
                controller  : 'TenantLoginController',
            })
            .state('TenantUserSignup', {
                url         : '/signup',
                templateUrl : 'public/templates/signup/tenantUserSignup.html',
                controller  : 'TenantUserSignupController',
                params:{
                    userType:''
                },
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
                url         : '/request/view',
                templateUrl : 'public/templates/request/viewRequest.html',
                controller  : 'viewRequestController',
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
