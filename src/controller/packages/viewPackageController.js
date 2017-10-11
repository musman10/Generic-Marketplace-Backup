/**
 * Created by asd on 9/6/2017.
 */

angular.module('angularApp')
    .controller('ViewPackagesController', [ '$scope','$state', 'app', '$stateParams', 'viewPackagesService', 'mainService',  function ($scope,$state,app,$stateParams,viewPackagesService,mainService) {
        /* $scope.description = {
         message1  : 'My first Angular app',
         message2 : 'developing for testing',
         message3 : viewRequestController.getPrivate()
         };*/

        $scope.tenantId = app.loginUser.tenantId;
        $scope.userId = app.loginUser._id;
        $scope.userPackage = [];
        $scope.totalPrice = 0;
        $scope.totalRequests = 0;
        $scope.checkboxes = [];
        userPackage = [];
        userPackageObject = {};
        userPackageIds = [];
        userBillPackgesObject = {};
        userBillPackges = [];
        $scope.cardTypes = [
            "Credit Card",
            "Debit Card"
        ];
        payment = {};

        function dateOfExpiryUserPackage(days){
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + parseInt(days));
            return currentDate;
        };

        viewPackagesService.view($scope.tenantId).then(function(response){
            console.log(response);
            $scope.packages = response.packages;
            for(p in $scope.packages){
              $scope.checkboxes.push(false);
            }
        });
        var packageInformation = $scope.packages;

        $scope.addPackage = function(package, index){
           debugger;
            if($scope.checkboxes[index] == false){
                $scope.userPackage.push(package);
                $scope.totalPrice = $scope.totalPrice + parseFloat(package.price);
                $scope.totalRequests = $scope.totalRequests + parseInt(package.numberOfRequests);
                $scope.checkboxes[index] = true;
            }
            else{
                for(i = 0; i<$scope.userPackage.length; i++ ){
                    if($scope.userPackage[i]._id == package._id){
                        $scope.userPackage.splice(i,1);
                        $scope.totalPrice = $scope.totalPrice - parseFloat(package.price);
                        $scope.totalRequests = $scope.totalRequests - parseInt(package.numberOfRequests);
                        break;
                    }

                }
                $scope.checkboxes[index] = false;
            }
        };

        $scope.addPayment = function() {
            var paymentInformation = {
                "cardType": $scope.cardType,
                "cardNumber": $scope.cardNumber,
                "cardName": $scope.cardName,
                "expiryDate": $scope.expiryDate,
            };
            console.log(paymentInformation);
            for(i=0; i<$scope.userPackage.length; i++){
                debugger;
                userPackageObject.userId = app.loginUser._id;
                userPackageObject.name = $scope.userPackage[i].name;
                userPackageObject.dateLastModified = $scope.userPackage[i].dateLastModified;
                userPackageObject.days = $scope.userPackage[i].days;
                userPackageObject.description = $scope.userPackage[i].description;
                userPackageObject.status = $scope.userPackage[i].status ;
                userPackageObject.dateExpiry = $scope.userPackage[i].dateExpiry;
                userPackageObject.reqType = $scope.userPackage[i].reqType;
                userPackageObject.price = $scope.userPackage[i].price;
                userPackageObject.userPackageStatus = "active";
                userPackageObject.dateCreated = $scope.userPackage[i].dateCreated;
                userPackageObject.dateLastRenewed = "";
                userPackageObject.dateExpiryUserPackage = dateOfExpiryUserPackage($scope.userPackage[i].days);
                userPackageObject.packageRenewedList = [];
                userPackage.push(userPackageObject);
            }

            viewPackagesService.insertUserPackges(userPackage).then(function(response){
                for(i=0; i<response.insertedData.length; i++){
                    userPackageIds[i] = response.insertedData[i]._id;
                }
                userBills = {
                    "userId" : app.loginUser._id,
                    "amount" : $scope.totalPrice,
                    "tenantId" : $scope.tenantId
                };
                viewPackagesService.insertUserBills(userBills).then(function(response){
                    userBillId =  response.insertedData[0]._id;

                    for(i = 0; i< userPackageIds.length; i++){
                        userBillPackgesObject.userBillId = userBillId;
                        userBillPackgesObject.userId = $scope.userId;
                        userBillPackgesObject.userPackageId = userPackageIds[i];
                        userBillPackgesObject.tenantId = $scope.tenantId;
                        userBillPackges.push(userBillPackgesObject);
                    }

                    viewPackagesService.insertUserBillPackages(userBillPackges).then(function(response){
                        console.log(response);
                    });

                    payment = {
                        "userBillId" : userBillId,
                        "amount" : $scope.totalPrice,
                        "tenantId" : $scope.tenantId,
                        "paymentMethodDetails" : {
                            "cardType" : $scope.cardType,
                            "cardNumber" : $scope.cardNumber,
                            "cardName" : $scope.cardName,
                            "expiryDate" : $scope.expiryDate
                        }
                    };
                    viewPackagesService.insertPayment(payment).then(function(response){
                        console.log(response);

                    });
                });

            });



        };

    }]);