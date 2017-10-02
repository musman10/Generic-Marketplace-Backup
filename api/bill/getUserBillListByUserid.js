module.exports = function(userid,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        userid = new ObjectID(userid)

        var query = { userId: userid };
        db.collection("UserBills").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            dto.data= result;
            response.send(dto);
        });
    });

}