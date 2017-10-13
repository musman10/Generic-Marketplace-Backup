angular.module('angularApp')
    .controller('TenantForgotPasswordController', [ '$scope','$state','getUserInfoService','insertEmailService','sendEmailService',  function ($scope,$state,getUserInfoService,insertEmailService,sendEmailService) {
        $scope.description = {
           /* message : getUserInfoService.getPrivate(),*/
        };

        $scope.submit = function(){
            debugger;
           var tenantId=app.tenant._id;
            console.log("tenantId entered is : " +tenantId);
           var  emailId = $scope.emailId;
            console.log("emailId entered is : " +emailId );

            getUserInfoService.checkUserInfo(tenantId,emailId).then(function(response){
                console.log(response);
                if(response.success == true){
                    debugger;
                   var  userInfo= response.data;
                    console.log("userInfo : "+userInfo);
                    if(response.data!=null) {
                        insertEmailService.insertMail(app.baseUrl,response.data._id,response.data.tenantId,response.data.email).then(function(response2){
                           console.log(response2);
                            if(response2.success==true){
                                debugger;
                                console.log(response.data.tenantId);
                                console.log(response.data.email);
                                console.log(response.data.username);
                                var insertedDataId = response2.insertedData[0]._id;
                                console.log(insertedDataId);
                                    sendEmailService.sendMail(app.baseUrl,response.data._id,response.data.tenantId,response.data.email,insertedDataId).then(function(response3){
                                        if(response.success==true){
                                            console.log(response);
                                        }else{
                                            $scope.loginErrorMessage = response.error[0];
                                            $scope.loginError = true;
                                        }
                                    });

                            } else{
                                $scope.loginErrorMessage = response.error[0];
                                $scope.loginError = true;
                            }

                        });

                    }



                    //console.log("URL :"+app.baseUrl+"/forgotpassword" +ciphertext);
                   /* console.log(JSON.stringify(app));
                    $state.go("AdminHome");*/

                }
                else{
                    $scope.loginErrorMessage = response.error[0];
                    $scope.loginError = true;
                }

            });

        }
    }]);