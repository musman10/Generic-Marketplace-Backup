module.exports = function(requestName,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    //var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var queryList = [];
        var queryExpression = {
            requestType:''
        };

        var query = { name: requestName };

        db.collection("Request").findOne(query, function(err, res) {
            if (err) throw err;
            console.log("1 document retrieved");
            db.close();
            dto.data = res;
            response.send(dto);
        });

    });

}