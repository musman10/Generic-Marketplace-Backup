module.exports = function(responsePayLoad,response){
    var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};

    //var MongoClient = require('mongodb').MongoClient;
    responsePayLoad.response.userId = new ObjectID(responsePayLoad.response.userId);
    responsePayLoad.response.requestId = new ObjectID(responsePayLoad.response.requestId);

    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            var ObjectID = require('mongodb').ObjectID;
            var queryRequestId = new ObjectID(responsePayLoad.requestId);
            var queryWhereClause = {_id: queryRequestId};
            var queryUpdatedValues = {
                $push: {userResponses: responsePayLoad.response},
                $set: {dateLastModified: new Date()}
            };

            db.collection("Request").updateOne(queryWhereClause, queryUpdatedValues, function (err, res) {
                try {
                    if (err) throw err;
                    console.log("1 document updated");
                    db.close();
                    dto.data = res;
                    response.send(dto);
                }catch(e){
                    db.close();
                    dto.success = false;
                    dto.error.push(e.toString());
                    response.send(dto);
                }
            });
        }catch (e){
            db.close();
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }

    });

}