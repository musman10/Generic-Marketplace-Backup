module.exports = function(userData,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var Join = require('mongo-join').Join;
    var ObjectID = require('mongodb').ObjectID;



    MongoClient.connect(url, function(err, db) {
        db.collection('User', function (err, User) {
            if (err) throw err;
            id = new ObjectID(userData.userId)
            var query = {
                _id : id
            };
            User.find(query, function (err, cursor) {
                var join = new Join(db).on({
                    field: 'tenantId', // <- field in request doc
                    to: '_id',         // <- field in user doc. treated as ObjectID automatically.
                    from: 'Tenant',  // <- collection name for user doc
                    as: 'tenantName'
                });
                join.toArray(cursor, function (err, joinedDocs) {
                    // handle array of joined documents here
                    if (err) throw err;
                    //console.log("Tenant Id is :"+tenantId);
                    console.log(joinedDocs);
                     db.close();
                    dto.data = joinedDocs;
                    response.send(dto);
                });
            });
        });
    });
}