module.exports = function(userPackage , response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    for(i=0; i<userPackage.length;i++){
        userPackage[i].tenantId = new ObjectID(userPackage.tenantId);
        userPackage[i].userId = new ObjectID(userPackage.userId);
        userPackage[i].packageId = new ObjectID(userPackage._id);
        userPackage[i].datePurchased = new Date();
        userPackage[i].dateExpiryUserPackage = new Date(userPackage[i].dateExpiryUserPackage);
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("UserPackages").insertMany(userPackage, function(err, res) {
            if (err) throw err;
            db.close();
            dto.insertedData = res.ops;
            response.send(dto);
        });
    });
}
