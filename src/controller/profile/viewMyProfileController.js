/**
 * Created by asd on 8/30/2017.
 */

angular.module('angularApp')
    .controller('viewMyProfileController', [ '$scope','$stateParams','mainService','$state','app','createObjectService','viewMyProfileService',  function ($scope,$stateParams,mainService,$state,app,createObjectService,viewMyProfileService) {
        //$scope.description = {
        //    message1  : 'My first Angular app',
        //    message2 : 'developing for testing',
        //    message3 : viewMyProfileService.getPrivate()
        //};

        $scope.insertPropertyValue = function(property,name,loginUserProperty){

            if(property.list == 'true') {
                if (property.subProperties.length == 0) {
                    for (j = 0; j < loginUserProperty[name].length; j++) {
                        var tempConf = JSON.stringify(property);
                        tempConf = JSON.parse(tempConf);
                        tempConf.value = loginUserProperty[name][j];
                        property.propertiesList.push(tempConf);
                    }
                }
                else if(property.subProperties.length != 0){
                    for (j = 0; j < loginUserProperty[name].length; j++) {
                        var tempConf = JSON.stringify(property);
                        tempConf = JSON.parse(tempConf);
                        tempConf.subProperties = [];

                        for(k=0;k<property.subProperties.length;k++){
                            childName = property.subProperties[k].name;
                            var subProperty = $scope.insertPropertyValue(property.subProperties[k],childName,loginUserProperty[name][j]);
                            tempConf.subProperties.push(subProperty);
                        }
                        property.propertiesList.push(tempConf);
                    }
                }
            }
            else if(property.list != 'true'){

                if (property.subProperties.length != 0){
                    for(k=0;k<property.subProperties.length;k++){
                        childName = property.subProperties[k].name;
                        var subProperty = $scope.insertPropertyValue(property.subProperties[k],childName,loginUserProperty[name]);
                    }
                }
                else {
                    if(loginUserProperty.hasOwnProperty(name)){
                        // if(loginUserProperty[name] == "saira"){
                        property.value = loginUserProperty[name];
                        console.log( loginUserProperty[name]);
                        console.log( property);
                        return property;
                    }
                }

            }

        };

        $scope.userConf1 = mainService.getUserConfByUserType("jobseeker");
        $scope.userConf = JSON.stringify($scope.userConf1);
        $scope.userConf = JSON.parse($scope.userConf);
        userProperties =$scope.userConf.properties;
        console.log("app ===" );
        console.log(JSON.stringify(app.loginUser));
        console.log(JSON.stringify($scope.userConf));
        debugger;
        for(i=0;i<userProperties.length;i++) {
            console.log(userProperties[i].name);
            name = userProperties[i].name;
            var prop = $scope.insertPropertyValue(userProperties[i],name,app.loginUser);

        }

        $scope.viewMyProfile = function(){
            debugger;
            console.log("View my profile");
        }

        $scope.update = function(){
            debugger;
            var updatedUser = createObjectService.createFormObject($scope.userConf);
            updatedUser.tenantId = app.tenant._id;
            updatedUser._id = app.loginUser._id;

            viewMyProfileService.updateUserProfile(updatedUser).then(function(response){
                console.log(response);
                if(response.success == true){
                    updatedUser._id = updatedUser._id.toString();
                    app.loginUser = updatedUser;
                    alert("You have successfully updated your profile !");
                    $state.go("AdminHome");
                }
                else{
                    alert("There is some problem updating your profile");
                }
            });
        }


    }]);
