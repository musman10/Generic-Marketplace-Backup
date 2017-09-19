angular.module('angularApp')
    .service('toastService', ['$http','$q','$mdToast', function ($http,$q,$mdToast) {

        var thisIsPrivate = "userViewService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.showToast = function(message,toastPosition){
            debugger;
            var pinTo = toastPosition;
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Tenant Created Successfully!')
                    .position(pinTo )
                    .hideDelay(3000)
            );
        }

    }]);