/**
 * Created by asd on 9/6/2017.
 */

var ObjectID = require('mongodb').ObjectID;
var mongo = require('mongodb');

module.exports = function(reqData,response){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/apptest";
    var dto = {success : true,
        error : [],
        status : 200};
    var request = "";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Mongo");
        id = new ObjectID(reqData.requestId)
        var query = {
            _id : id
        };
        db.collection("Request").findOne(query, function(err, result) {

            if (err) throw err;
            console.log(result);
            if(result == null){
                dto.success = false;
                dto.error.push("No such request exits");
                response.send(dto);
            }
            else{
                dto.data = result;
                response.send(dto);
            }
            request = result;
            db.close();
        });
    });


}