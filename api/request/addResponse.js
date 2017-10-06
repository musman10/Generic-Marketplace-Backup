module.exports = function(responsePayLoad,response){
    var ObjectID = require('mongodb').ObjectID;
    var Request = require('../../repository/request');
    var dto = {success:true,error:[],status:200};

    try {
        responsePayLoad.response.userId = new ObjectID(responsePayLoad.response.userId);
        responsePayLoad.response.requestId = new ObjectID(responsePayLoad.response.requestId);


        var ObjectID = require('mongodb').ObjectID;
        var queryRequestId = new ObjectID(responsePayLoad.requestId);
        var queryWhereClause = {_id: queryRequestId};
        var queryUpdatedValues = {
            $push: {userResponses: responsePayLoad.response},
            $set: {dateLastModified: new Date()}
        };

        Request.updateOne(queryWhereClause, queryUpdatedValues, function (err, res) {
            try {
                if (err) throw err;
                console.log("1 document updated");
                dto.data = res;
                response.send(dto);
            } catch (e) {
                dto.success = false;
                dto.error.push("Some error occured!");
                console.log(e.toString());
                response.send(dto);
            }
        });
    }catch(e){
        dto.success = false;
        dto.error.push("Some error occured!");
        console.log(e.toString());
        response.send(dto);
    }

}