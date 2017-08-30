/**
 * Created by semianchuk on 08.10.16.
 */
angular.module('angularApp')
    .config(['$locationProvider','$stateProvider','$httpProvider',function($locationProvider,$stateProvider,$httpProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
<<<<<<< HEAD
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
=======
            .state('home', {
                url         : '/',
                templateUrl : 'public/templates/home.html',
                controller  : 'mainController'
            })            
            .state('TenantLogin', {
                url         : '/login',
                templateUrl : 'public/templates/login/tenantLogin.html',
                controller  : 'TenantLoginController'
>>>>>>> saira
            })
            .state('TenantUserSignup', {
                url         : '/signup',
                templateUrl : 'public/templates/signup/tenantUserSignup.html',
                controller  : 'TenantUserSignupController',
                params:{
                    userType:''
<<<<<<< HEAD
                },
            })
            .state('TenantUserHome', {
                url         : '/user/home',
                templateUrl : 'public/templates/home/tenantUserHome.html',
                controller  : 'TenantUserHomeController',
                parent:'MasterLayout'
=======
                }
>>>>>>> saira
            })
            .state('AdminLogin', {
                url         : '/admin/login',
                templateUrl : 'public/templates/login/adminLogin.html',
<<<<<<< HEAD
                controller  : 'AdminLoginController',
=======
                controller  : 'AdminLoginController'
>>>>>>> saira
            })
            .state('AdminHome', {
                url         : '/admin/home',
                templateUrl : 'public/templates/admin/home.html',
<<<<<<< HEAD
                controller  : 'AdminController',
                parent:'MasterLayout'
=======
                controller  : 'AdminController'
>>>>>>> saira
            })
            .state('RegisterTenant', {
                url         : '/tenant/register',
                templateUrl : 'public/templates/tenant/register.html',
<<<<<<< HEAD
                controller  : 'TenantRegisterController',
                parent:'MasterLayout'
=======
                controller  : 'TenantRegisterController'
>>>>>>> saira
            })

    }]);

    var app = {
        baseUrl:'',
        tenant:{},
        tenantUsers:[],
        tenantRequests:[],
<<<<<<< HEAD
        appType:'admin'
=======
        appType:'appAdmin'
>>>>>>> saira
    }

    angular.module('angularApp').value('app', app);