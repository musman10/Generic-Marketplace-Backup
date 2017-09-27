module.exports = function(userBills , response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    userBills.dateCreated = new Date();

    userBills.tenantId = new ObjectID(userBills.tenantId);
    userBills.userId = new ObjectID(userBills.userId);
    var currentDate = new Date();
    startDate = currentDate.setUTCHours(0,0,0,0);
    endDate = currentDate.setUTCHours(23,59,59,999);

    var query = {
        tenantId : userBills.tenantId,
        dateCreated : {"$gte": new Date(startDate),
            "$lt": new Date(endDate)}
    };

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        db.collection("UserBills").find(query,{}).toArray(function(err, result) {
            if (err) throw err;
            else{
                userBills.invoiceNumber = result.length + 1;
                db.collection("UserBills").insertOne(userBills, function(err, res) {
                    if (err) throw err;
                    db.close();
                    dto.insertedData = res.ops;
                    response.send(dto);
                });
            }

        });

    });
}
