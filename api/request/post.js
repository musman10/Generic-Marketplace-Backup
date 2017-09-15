module.exports = function(request,response){
    var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    request.tenantId = new ObjectID(request.tenantId);
    request.postUserId = new ObjectID(request.postUserId);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("Request").insertOne(request, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
            dto = {success:true,error:[],status:200};
            dto.data = res;
            response.send(dto);
        });
    });

}