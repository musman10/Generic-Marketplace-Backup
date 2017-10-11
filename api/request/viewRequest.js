module.exports = function(reqData,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var Join = require('mongo-join').Join;
    var ObjectID = require('mongodb').ObjectID;



    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            db.collection('Request', function (err, Request) {
                try {
                    if (err) throw err;
                    id = new ObjectID(reqData.requestId)
                    var query = {
                        _id: id
                    };
                    Request.find(query, function (err, cursor) {
                        var join = new Join(db).on({
                            field: 'postUserId', // <- field in request doc
                            to: '_id',         // <- field in user doc. treated as ObjectID automatically.
                            from: 'User',  // <- collection name for user doc
                            as: 'username'
                        });
                        join.toArray(cursor, function (err, joinedDocs) {
                            // handle array of joined documents here
                            if (err) throw err;
                            //console.log("Tenant Id is :"+tenantId);
                            console.log(joinedDocs);
                            // db.close();
                            dto.data = joinedDocs;
                            //response.send(dto);
                        });
                    });


                    Request.find(query, function (err, cursor) {
                        var join = new Join(db).on({
                            field: 'tenantId', // <- field in request doc
                            to: '_id',         // <- field in user doc. treated as ObjectID automatically.
                            from: 'Tenant',  // <- collection name for user doc
                            as: 'tenantname'
                        });
                        join.toArray(cursor, function (err, joinedDocs) {
                            // handle array of joined documents here
                            if (err) throw err;
                            //console.log("Tenant Id is :"+tenantId);
                            console.log(joinedDocs);
                            db.close();
                            dto.data2 = joinedDocs;
                            response.send(dto);
                        });
                    });
                }catch(e){
                    db.close();
                    dto.success = false;
                    dto.error.push(e.toString());
                    response.send(dto);
                }
            });
        }
        catch(e){
            db.close();
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }

       // response.send(dto);
    });


    /*
     MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     db.collection('Request').aggregate([
     { $lookup:
     {
     from: 'User',
     localField: 'ObjectId(postuserid)',
     foreignField: 'ObjectId(_id)',
     as: 'requestdetails'
     }
     }

     ], function(err, res) {
     if (err) throw err;
     console.log(res);
     db.close();
     dto.data = res;
     response.send(dto);
     });
     });*/


}