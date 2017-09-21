module.exports = function(tenantId,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200,tenant:{}};
    //var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        //console.log(tenantName);
        var query = { _id: new ObjectID(tenantId) };
        db.collection("Tenant").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            dto.tenant = result;
            response.send(dto);
        });

    });

}