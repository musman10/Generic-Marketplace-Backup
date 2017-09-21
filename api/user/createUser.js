module.exports = function(user,res){
    var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var response = res;

    user.tenantId = new ObjectID(user.tenantId);
    user.dateCreated = new Date();
    user.dateLastModified = new Date();

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = {
            tenantId: new ObjectID(user.tenantId),
            username:user.username
        }

        db.collection("User").findOne(query, function(err, result) {
            if (err) throw err;
            if(result == null){
                db.collection("User").insert(user, function(err, res) {
                    if (err) throw err;
                    console.log(user.username + " inserted");
                    db.close();
                    dto.success = true;
                    response.send(dto);
                });
            }
            else{
                db.close();
                dto.success = false;
                dto.error.push("User already exists");
                response.send(dto);
            }
        });
    });
}