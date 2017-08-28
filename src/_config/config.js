/**
 * Created by semianchuk on 08.10.16.
 */
angular.module('angularApp')
    .config(['$locationProvider','$stateProvider','$httpProvider',function($locationProvider,$stateProvider,$httpProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url         : '/',
                templateUrl : 'public/templates/home.html',
                controller  : 'mainController'
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
            .state('AdminLogin', {
                url         : '/admin/login',
                templateUrl : 'public/templates/login/adminLogin.html',
                controller  : 'AdminLoginController'
            })
            .state('AdminHome', {
                url         : '/admin/home',
                templateUrl : 'public/templates/admin/home.html',
                controller  : 'AdminController'
            })
            .state('RegisterTenant', {
                url         : '/tenant/register',
                templateUrl : 'public/templates/tenant/register.html',
                controller  : 'TenantRegisterController'
            })

    }]);

    var app = {
        baseUrl:'',
        tenant:{},
        tenantUsers:[],
        tenantRequests:[],
        appType:'appAdmin'
    }

    angular.module('angularApp').value('app', app);