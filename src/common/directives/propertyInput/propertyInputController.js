angular.module('angularApp')
    .controller('PropertyInputController', [ '$scope', function ($scope) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };
        debugger;
        if($scope.property.type == 'dateTime'){
            $scope.property.value = new Date($scope.property.value);
        }

        $scope.addPropertyInList = function(mainProperty){
            var property = JSON.stringify(mainProperty);
            property = JSON.parse(property);
            property.propertiesList = [];
            property.id = property.id + "-" + mainProperty.propertiesList.length;
            mainProperty.propertiesList.push(property);
        };

        $scope.errorMessage = "form.username.$error";

        //alert($scope.property.name);
    }]);