/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('mainService', ['$http','$q','app', function ($http,$q,app) {

        var thisIsPrivate = "mainService";
        
        this.getPrivate = function() {
            return thisIsPrivate;
        };
        
        this.getUsers = function(){
            var deferred = $q.defer();
            $http.get("http://localhost:8080/api/users")
            .then(function(response) {
                str = JSON.stringify(response);
                console.log(str);
                return deferred.resolve(response.data);
            });
            return deferred.promise;
        }

        this.getTenantConfiguration = function(tenantName,url){
            var deferred = $q.defer();
            $http.get("http://" + url + ":8080/api/tenant/" + tenantName)
            .then(function(response) {
                //str = JSON.stringify(response.data.tenant[0]);
                //console.log(str);
                return deferred.resolve(response.data.tenant[0]);
            });
            return deferred.promise;
        }

        this.createTenantUserObjects = function(){
            var userJson = "";
            for(iter=0;iter<app.tenant.users.length;iter++){
                userJson = this.createTenantUserJson(app.tenant.users[iter]);
                app.tenantUsers.push(JSON.parse(userJson));
                var userTemp = JSON.parse(userJson);
                //str = JSON.stringify(userTemp);
                //console.log(str);
            }
        }

        this.createTenantUserJson = function(userConf){
            var userJson = "{";  
            
            for(i=0;i<userConf.properties.length;i++){
                
                if(userConf.properties[i].name != undefined || userConf.properties[i].name != null || userConf.properties[i].name != ""){
                    if(userConf.properties[i].list == "true")
                        userJson = userJson + '"' + userConf.properties[i].name + '":[],';
                    else if(userConf.properties[i].subProperties.length != 0){
                        userJson = userJson + '"' + userConf.properties[i].name + '":{},';
                    }
                    else {
                        //alert(userConf.properties[i].name);
                        userJson = userJson + '"' + userConf.properties[i].name + '":"",';
                        //alert(userJson);
                    }
                } 
            }
            
            userJson = userJson + '"_id":"",' +
                                  '"id":"",' +
                                  '"userTypeName":"'+ userConf.name +'"';

            userJson = userJson + "}";
            //alert(userJson);
            return userJson;
        }

        this.getUserObjectByUserType = function(userType){
            for(i=0;i<app.tenantUsers.length;i++){
                if(app.tenantUsers[i].userTypeName == userType){
                    return app.tenantUsers[i];
                }
            }
        }

        this.getUserConfByUserType = function(userType){
            for(i=0;i<app.tenant.users.length;i++){
                if(app.tenant.users[i].name == userType)
                    return app.tenant.users[i];
            }
        }

        this.getRequestConfByRequestType = function(requestType){
            for(i=0;i<app.tenant.requests.length;i++){
                if(app.tenant.requests[i].name == requestType)
                    return app.tenant.requests[i];
            }
        }

        this.checkPostRequestPermission = function(){
            for(i=0;i<app.tenant.requests.length;i++){
                if(app.tenant.requests[i].hasParent == 0){
                    for(j=0;j<app.tenant.requests[i].postUsers.length;j++){
                        if(app.tenant.requests[i].postUsers[j].name == app.loginUser.userType)
                            return true;
                    }
                }
            }
            return false;
        }

        this.checkViewRequestPermission = function(){
            for(i=0;i<app.tenant.requests.length;i++){
                if(app.tenant.requests[i].hasParent == 0){
                    for(j=0;j<app.tenant.requests[i].viewUsers.length;j++){
                        if(app.tenant.requests[i].viewUsers[j].name == app.loginUser.userType)
                            return true;
                    }
                }
            }
            return false;
        }

        this.getRequestConfsByUserType = function(userType){
            postRequestTypes = [];
            for(i=0;i<app.tenant.users.length;i++){
                if(app.tenant.users[i].name == userType){
                    for(k=0;k<app.tenant.requests.length;k++){
                        if(app.tenant.requests[k].hasParent == 0){
                            for(j=0;j<app.tenant.requests[k].postUsers.length;j++){
                                if(app.tenant.requests[k].postUsers[j].name == userType)
                                    postRequestTypes.push(app.tenant.requests[k].name);
                            }
                        }
                    }
                    return postRequestTypes;
                }
            }
            return postRequestTypes;
        }

    }]);