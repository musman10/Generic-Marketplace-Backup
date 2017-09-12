angular.module('angularApp')
    .controller('PropertyConfigurationController', [ '$scope', function ($scope) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing'
        };

        debugger;
        $scope.isDisabled = false;
        if($scope.property.name == "username" || $scope.property.name == "password" || $scope.property.name == "name"){
            $scope.isDisabled = true;
        }

        $scope.addSubProperty = function(mainProperty){
            var subProperty = {
                id:'',
                name: '',
                value:'',
                type:'',
                min:'',
                max:'',
                required:'',
                pattern:'',
                propertyGroup:'',
                list:false,
                parentId:mainProperty.id,
                subProperties:[],
                propertiesList:[],
                hierarchyLevel:2
            };
            mainProperty.subProperties.push(subProperty);
            //user.properties.push(property);
        }
        //$scope.addPropertyInList = function(mainProperty){
        //    var property = JSON.stringify(mainProperty);
        //    property = JSON.parse(property);
        //    property.propertiesList = [];
        //    property.id = property.id + "-" + mainProperty.propertiesList.length;
        //    mainProperty.propertiesList.push(property);
        //};

        //alert($scope.property.name);
    }]);