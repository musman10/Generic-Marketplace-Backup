module.exports = function (reqData, response) {

    var Request = require('../../repository/request');
    var dto = {success: true, error: [], status: 200};
    var ObjectID = require('mongodb').ObjectID;


    try {

        id = new ObjectID(reqData.requestId)
        var query = {
            _id: id
        };
        var cursor = Request.find(query);


        var joinQuery = {
            field: 'postUserId', // <- field in request doc
            to: '_id',         // <- field in user doc. treated as ObjectID automatically.
            from: 'User',  // <- collection name for user doc
            as: 'username'
        };
        var join = Request.joinOn(joinQuery);
        join.toArray(cursor, function (err, joinedDocs) {
            try {
                // handle array of joined documents here
                if (err) throw err;
                //console.log("Tenant Id is :"+tenantId);
                console.log(joinedDocs);
                // db.close();
                dto.data = joinedDocs;
                //response.send(dto);
            } catch (e) {
                dto.success = false;
                dto.error.push("Some error occured!");
                console.log(e.toString());
                response.send(dto);
            }
        });


        var cursor = Request.find(query);
        var joinQuery = {
            field: 'tenantId', // <- field in request doc
            to: '_id',         // <- field in user doc. treated as ObjectID automatically.
            from: 'Tenant',  // <- collection name for user doc
            as: 'tenantname'
        };
        var join = Request.joinOn(joinQuery);
        join.toArray(cursor, function (err, joinedDocs) {
            try {
                // handle array of joined documents here
                if (err) throw err;
                //console.log("Tenant Id is :"+tenantId);
                console.log(joinedDocs);
                db.close();
                dto.data2 = joinedDocs;
                response.send(dto);
            } catch (e) {
                dto.success = false;
                dto.error.push("Some error occured!");
                console.log(e.toString());
                response.send(dto);
            }
        });

    } catch (e) {
        dto.success = false;
        dto.error.push("Some error occured!");
        console.log(e.toString());
        response.send(dto);
    }


    // response.send(dto);


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