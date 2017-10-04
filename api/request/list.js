module.exports = function (responsePayLoad, response) {
    //var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var Request = require('../../repository/request');
    var dto = {success: true, error: [], status: 200};

    //var MongoClient = require('mongodb').MongoClient;
    responsePayLoad.response.userId = new ObjectID(responsePayLoad.response.userId);
    responsePayLoad.response.requestId = new ObjectID(responsePayLoad.response.requestId);

    var ObjectID = require('mongodb').ObjectID;
    var queryRequestId = new ObjectID(responsePayLoad.requestId);
    var queryWhereClause = {_id: queryRequestId};
    var queryUpdatedValues = {$push: {userResponses: responsePayLoad.response}, $set: {dateLastModified: new Date()}};


    tenantId = new ObjectID(tenantId);
    //var query = { tenantId: tenantId };
    var query = {$and: [{tenantId: tenantId}, {hasParent: "0"}]};
    var cursor = Request.find(query);
    var joinQuery = new {
        field: 'postUserId', // <- field in request doc
        to: '_id',         // <- field in user doc. treated as ObjectID automatically.
        from: 'User',  // <- collection name for user doc
        as: 'requestdetails'
    };
    var join = Request.joinOn(joinQuery);
    join.toArray(cursor, function (err, joinedDocs) {
        // handle array of joined documents here
        if (err) throw err;
        //console.log("Tenant Id is :"+tenantId);
        console.log(joinedDocs);

        dto.data = joinedDocs;
        response.send(dto);
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