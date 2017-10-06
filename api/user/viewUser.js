module.exports = function (userData, response) {

    var dto = {success: true, error: [], status: 200};
    var Join = require('mongo-join').Join;
    var ObjectID = require('mongodb').ObjectID;

    try {
        id = new ObjectID(userData.userId)
        var query = {
            _id: id
        };
        var cursor = User.find(query);
        var joinQuery = {
            field: 'tenantId', // <- field in request doc
            to: '_id',         // <- field in user doc. treated as ObjectID automatically.
            from: 'Tenant',  // <- collection name for user doc
            as: 'tenantName'
        };
        var join = User.joinOn(joinQuery);
        join.toArray(cursor, function (err, joinedDocs) {
            // handle array of joined documents here
            if (err) throw err;
            //console.log("Tenant Id is :"+tenantId);
            console.log(joinedDocs);

            dto.data = joinedDocs;
            response.send(dto);
        });
    }catch(e){
        dto.success = false;
        dto.error.push("Some error occured!");
        console.log(e.toString());
        response.send(dto);
    }


}