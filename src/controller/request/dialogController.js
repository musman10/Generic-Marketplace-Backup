angular.module('angularApp')
    .controller('dialogController', [ '$scope','$state','requestPostService','mainService','createObjectService','$mdDialog','$mdToast',  function ($scope,$state,requestPostService,mainService,createObjectService,$mdDialog,$mdToast) {
        $scope.theme = 'red';

        var isThemeRed = true;

        /* $interval(function () {
         $scope.theme = isThemeRed ? 'blue' : 'red';

         isThemeRed = !isThemeRed;
         }, 2000);*/

        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'public/templates/request/dialog.tmpl.html',
                    //template: '{{dialogtest}}',
                    //parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            $scope.dialogtest = "test dialog";

            $scope.requestType = "";
            $scope.requestConf;

            $scope.postRequestTypes = mainService.getRequestConfsByUserType(app.loginUser.userType);

            $scope.loadPostRequestForm = function(postRequestType){
                $scope.requestType = postRequestType;
                debugger;
                $scope.requestConf = mainService.getRequestConfByRequestType($scope.requestType);
            };

            $scope.post = function(){
                var loader = $mdDialog;
             /*   loader.show({
                    //targetEvent: $event,
                    template:
                    '<md-dialog aria-label="List dialog" style="text-align:center;height:250px;height:300px;padding:20px">' +
                    '  <md-dialog-content style="text-align:center;height:100%;width:100%;padding:0px">'+
                    '       <h3>Posting Request ...</h3>' +
                    '       <div style="text-align:center;height:200px;width:100%;padding:60px">'+
                    '           <md-progress-circular class="md-hue-2" md-diameter="70"></md-progress-circular>' +
                    '       </div>'+
                    '  </md-dialog-content>' +
                    '</md-dialog>'
                });*/

                $scope.request = createObjectService.createFormObject($scope.requestConf);
                var formJSON = JSON.stringify($scope.request);
                formJSON = formJSON.substring(0, formJSON.length - 1);
                formJSON = formJSON + ",";
                formJSON = formJSON + '"postUserId":' + '"' + app.loginUser._id + '",';
                formJSON = formJSON + '"userResponses":[],';
                formJSON = formJSON + '"requestType":' + '"' + $scope.requestType + '",';
                formJSON = formJSON + '"hasParent":' + '"' + $scope.requestConf.hasParent + '"';
                formJSON = formJSON + '}';
                $scope.request = JSON.parse(formJSON);
                requestPostService.postRequest($scope.request).then(function(response){
                    $mdDialog.hide();
                    debugger;
                    //loader.hide();
                    var str = JSON.stringify(response);
                    console.log(str);
                    if(response.success == true){
                        var last = {
                            bottom: false,
                            top: true,
                            left: false,
                            right: true
                        };
                        $scope.getToastPosition = function() {
                            //sanitizePosition();

                            return Object.keys($scope.toastPosition)
                                .filter(function(pos) { return $scope.toastPosition[pos]; })
                                .join(' ');
                        };

                        $scope.toastPosition = angular.extend({},last);

                        var pinTo = $scope.getToastPosition();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Request Posted Successfully!')
                                .position(pinTo )
                                .hideDelay(3000)
                        );

                        $state.go("TennatUserListPostRequests");
                    }
                    else{
                        alert(response.error[0]);
                    }
                });
                console.log(formJSON);
            };


        }





    }]);