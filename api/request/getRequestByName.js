module.exports = function(responsePayLoad,response){
    //var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var Request = require('../../repository/request');
    var dto = {success:true,error:[],status:200};

    //var MongoClient = require('mongodb').MongoClient;



    var queryList = [];
    var queryExpression = {
        requestType: ''
    };

    var query = {name: requestName};

    Request.findOne(query, function (err, res) {
        try {
            if (err) throw err;
            console.log("1 document retrieved");

            dto.data = res;
            response.send(dto);
        }catch(e){

            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });

}