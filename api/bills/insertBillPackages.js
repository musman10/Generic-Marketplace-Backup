module.exports = function(userBillPackages , response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    for(i=0; i<userBillPackages.length;i++){
        userBillPackages[i].tenantId = new ObjectID(userBillPackages.tenantId);
        userBillPackages[i].userId = new ObjectID(userBillPackages.userId);
        userBillPackages[i].userPackageId = new ObjectID(userBillPackages._id);
        userBillPackages[i].userBillId = new ObjectID(userBillPackages.userBillId);
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("UserBillPackages").insertMany(userBillPackages, function(err, res) {
            if (err) throw err;
            db.close();
            dto.insertedData = res.ops;
            response.send(dto);
        });
    });
}
