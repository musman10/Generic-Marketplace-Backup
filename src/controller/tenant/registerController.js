/**
 * Created by Usman Irfan on 15.09.17.
 */
angular.module('angularApp')
.controller('TenantRegisterController', [ '$scope','tenantRegisterService','app','$q',  function ($scope,tenantRegisterService,app,$q) {
   
    $scope.userPropertyIds = 0;
    $scope.tenantuserIds = 0;
    $scope.tenantRequestIds = 0;
    $scope.requestPropertyIds = 0;

    $scope.tenant = {
        name:'',
        properties:[],
        users:[],
        requests:[]
    }

    $scope.addProperty = function(){
        property = {
            name:'',
            type:'',
            value:''
        }
        $scope.tenant.properties.push(property);
    };

    $scope.addUser = function(){
        $scope.tenantuserIds++;
        user = {
            id:$scope.tenantuserIds,
            properties:[{
                id: $scope.userPropertyIds,
                name: 'username',
                value:'',
                type:'text',
                min:'',
                max:'',
                required:'true',
                pattern:'',
                list:false,
                parentId:0,
                subProperties:[],
                hierarchyLevel:1
            },{
                id: $scope.userPropertyIds,
                name: 'password',
                value:'',
                type:'password',
                min:'',
                max:'',
                required:'true',
                pattern:'',
                list:false,
                parentId:0,
                subProperties:[],
                hierarchyLevel:1
            },{
                id: $scope.userPropertyIds,
                name: 'name',
                value:'',
                type:'text',
                min:'',
                max:'',
                required:'true',
                pattern:'',
                list:false,
                parentId:0,
                subProperties:[],
                hierarchyLevel:1
            }
        ]
        }
        $scope.tenant.users.push(user);
    }

    $scope.addUserProperty = function(user){
        $scope.userPropertyIds++;
        property = {
            id: $scope.userPropertyIds,
            name: '',
            value:'',
            type:'',
            min:'',
            max:'',
            required:'',
            pattern:'',
            list:false,
            parentId:0,
            subProperties:[],
            propertiesList:[],
            hierarchyLevel:1
        }
        user.properties.push(property);
    }
    
    $scope.addUserSubProperty = function(parentProperty,user){
        $scope.userPropertyIds++;

        property = {
            id:$scope.userPropertyIds,
            name: '',
            value:'',
            type:'',
            min:'',
            max:'',
            required:'',
            pattern:'',
            propertyGroup:'',
            list:false,
            parentId:parentProperty.id,
            subProperties:[],
            propertiesList:[],
            hierarchyLevel:2
        }
        parentProperty.subProperties.push(property);
        user.properties.push(property);
    }
    
    $scope.addRequest = function(){
        $scope.tenantRequestIds++;
        request = {
            id:$scope.tenantRequestIds,
            properties:[
                {
                    id: '',
                    name: 'name',
                    value:'',
                    type:'text',
                    min:'',
                    max:'',
                    required:'true',
                    pattern:'',
                    list:false,
                    parentId:0,
                    subProperties:[],
                    hierarchyLevel:1
                }
            ],
            postUsers:[],
            viewUsers:[],
            viewUserConditions:[],
            userResponses:[]
        }
        $scope.tenant.requests.push(request);
    }

    $scope.addRequestProperty = function(request){

        $scope.requestPropertyIds++;
        property = {
            id: $scope.requestPropertyIds,
            name: '',
            value:'',
            type:'',
            min:'',
            max:'',
            required:'',
            pattern:'',
            list:false,
            parentId:0,
            subProperties:[],
            propertiesList:[],
            hierarchyLevel:1
        }
        request.properties.push(property);
    }

    $scope.addRequestSubProperty = function(parentProperty,request){
        $scope.requestPropertyIds++;

        property = {
            id:$scope.requestPropertyIds,
            name: '',
            value:'',
            type:'',
            min:'',
            max:'',
            required:'',
            pattern:'',
            list:false,
            parentId:parentProperty.id,
            subProperties:[],
            propertiesList:[],
            hierarchyLevel:2
        }
        parentProperty.subProperties.push(property);
        request.properties.push(property);
    }
    
    $scope.addRequestPostUser = function(user,request){
        var postUser = JSON.parse(user);
        request.postUsers.push(postUser);
    }

    $scope.addRequestViewUser = function(user,request){
        var viewUser = JSON.parse(user);
        request.viewUsers.push(viewUser);
    }

    $scope.addRequestUserResponse = function(request){
        var response = {
            user:{},
            responseRequests:[]
        }
        request.userResponses.push(response);
    }

    $scope.addRequestResponseUser = function(user,response){
        debugger;
        var responseUser = JSON.parse(user);
        response.user = responseUser;
    }

    $scope.addRequestResponse = function(responseRequestJson,response){
        debugger;
        var responseRequest = JSON.parse(responseRequestJson);
        response.responseRequests.push(responseRequest);
    }

    $scope.addRequestUserViewCondition = function(request){
        var viewUserCondition = {
            user:{},
            properties:[]
        }
        request.viewUserConditions.push(viewUserCondition);
    }

    $scope.createUserConditionSubProperties = function(propertyName, subProperties,condition){
        for(i=0;i<subProperties.length;i++){
            if(subProperties[i].subProperties.length == 0){    
                var conditionUserProperty = {
                    name: propertyName + '-' + subProperties[i].name,
                    default:'',
                    allowRunTimeChange:'',
                    value:''
                }
                condition.properties.push(conditionUserProperty);
            }
            else{
                name = propertyName + '-' + subProperties[i].name;
                $scope.createUserConditionSubProperties(name,subProperties[i].subProperties,condition)
            }
        }
    }

    $scope.addRequestViewConditionUser = function(user,condition){
        var conditionUser = JSON.parse(user);
        condition.user = conditionUser;

        for(i=0;i<conditionUser.properties.length;i++){
            if(conditionUser.properties[i].parentId == 0){
                if(conditionUser.properties[i].subProperties.length == 0){
                    var conditionUserProperty = {
                        name: conditionUser.properties[i].name,
                        default:'',
                        allowRunTimeChange:'',
                        value:''
                    }
                    condition.properties.push(conditionUserProperty);
                }
                else{
                    $scope.createUserConditionSubProperties(conditionUser.properties[i].name,conditionUser.properties[i].subProperties,condition)
                }
            }
        }
    }

    $scope.registerTenant = function(){
        //console.log($scope.tenant.users.length);
        
        for(j=0;j<$scope.tenant.users.length;j++){
            var userPropertiesLength = $scope.tenant.users[j].properties.length;
            for(i=0;i<userPropertiesLength;i++){
                if($scope.tenant.users[j].properties[i].parentId != 0){
                    $scope.tenant.users[j].properties.splice(i,1);
                    userPropertiesLength--;
                    i--;
                }
            }
        }

        for(j=0;j<$scope.tenant.requests.length;j++){
            var requestPropertiesLength = $scope.tenant.requests[j].properties.length;
            for(i=0;i<requestPropertiesLength;i++){
                if($scope.tenant.requests[j].properties[i].parentId != 0){
                    $scope.tenant.requests[j].properties.splice(i,1);
                    requestPropertiesLength--;
                    i--;
                }
            }
        }
        str = JSON.stringify($scope.tenant);
        console.log(str);

        tenantRegisterService.register($scope.tenant,app.baseUrl).then(function(response){

        });
    }

    $scope.checkPropertyNameUnique = function(formField,propertyName,list){
        debugger;
        var fieldName = formField;
        if($scope.tenantRegistrationForm.hasOwnProperty(formField)){
            fieldName = formField;
        }
        else{
            propertyName = propertyName.substring(0, propertyName.length - 1);
            fieldName = formField + propertyName;
        }

        $scope.tenantRegistrationForm[fieldName].$viewValue;
        var matchCounter=0

            for(i=0;i<list.length;i++){
                if($scope.tenantRegistrationForm[fieldName].$viewValue == list[i].name) {
                    matchCounter++;
                    if(matchCounter == 2) {
                        $scope.tenantRegistrationForm[fieldName].$setValidity('unique', false);
                        break;
                    }
                }
                else{
                    $scope.tenantRegistrationForm[fieldName].$setValidity('unique', true);
                }
            }





    };

    $scope.test = function(){
        return "xyz";
    }
 
}]);
