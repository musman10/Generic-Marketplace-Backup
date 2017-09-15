/**
 * Created by Usman Irfan.
 */
angular.module('angularApp')
    .service('createObjectService', ['$http','$q', function ($http,$q) {

        var thisIsPrivate = "createObjectService";

        this.getPrivate = function() {
            return thisIsPrivate;
        };

        this.createFormObject = function(conf){
            debugger;
            var formJSON = '{';
            var skipPropertyName = false;
            formJSON = this.createFormJSON(conf.properties,formJSON,skipPropertyName);
            formJSON = formJSON.substring(0, formJSON.length - 1);
            formJSON = formJSON + '}';
            alert(formJSON);
            var formObject = JSON.parse(formJSON);
            return formObject;
        };

        this.createFormJSON = function(confProperties,formJSON,skipPropertyName){
            var properties = confProperties;
            var i = 0;
            var p = JSON.stringify(properties);
            for(i;i<properties.length;i++){
                if(skipPropertyName == true)
                    properties[i].list = "";

                if(properties[i].name != undefined || properties[i].name != null || properties[i].name != ""){
                    if(properties[i].list == "true") {

                        if(properties[i].subProperties.length != 0) {
                            formJSON = formJSON + '"' + properties[i].name + '":[';
                            for(var j=0;j<properties[i].propertiesList.length;j++) {
                                formJSON = formJSON + '{';
                                formJSON = this.createFormJSON(properties[i].propertiesList[j].subProperties, formJSON,false);
                                formJSON = formJSON.substring(0, formJSON.length - 1);
                                formJSON = formJSON + '},';
                            }
                            formJSON = formJSON.substring(0, formJSON.length - 1);
                            formJSON = formJSON + '],';
                        }
                        else{
                            formJSON = formJSON + '"' + properties[i].name + '":[';
                            if(properties[i].propertiesList != 0){
                                formJSON = this.createFormJSON(properties[i].propertiesList, formJSON,true);
                                formJSON = formJSON.substring(0, formJSON.length - 1);
                                formJSON = formJSON + '],';
                            }
                            else
                                formJSON = formJSON + '],';

                        }
                    }
                    else if(properties[i].subProperties.length != 0){
                        formJSON = formJSON + '"' + properties[i].name + '"' +  ':{';
                        formJSON = this.createFormJSON(properties[i].subProperties, formJSON,false);
                        formJSON = formJSON.substring(0, formJSON.length - 1);
                        formJSON = formJSON + '},';
                    }
                    else {
                        if(skipPropertyName == true){
                            formJSON = formJSON + '"'+ properties[i].value +'",';
                        }
                        else
                            formJSON = formJSON + '"' + properties[i].name + '":"'+ properties[i].value +'",';
                    }
                }
            }
            return formJSON;
        }

    }]);