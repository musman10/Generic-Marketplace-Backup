module.exports = function(tenantData , response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    id = new ObjectID(tenantData.tenantId)
    var query = {
     tenantId : id
     };

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("Packages").find(query,{}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            dto.packages = result;
            db.close();
            //return dto;
            response.send(dto);
        });
    });
}