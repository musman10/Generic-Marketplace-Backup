/**
 * Created by asd on 9/5/2017.
 */

var ObjectID = require('mongodb').ObjectID;
var mongo = require('mongodb');

module.exports = function(updatedUser,response){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/apptest";
    var dto = {success : true,
        error : [],
        status : 200};

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        updatedUser._id = new ObjectID(updatedUser._id)
        id =  updatedUser._id;
        var myquery = {
            _id: id
        };
        var newvalues = updatedUser;
        db.collection("User").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            if(res.result.nModified < 1){
                dto.success = false;
                dto.error.push("Unable to update user");
                response.send(dto);
            }
            else{
                dto.data = res;
                response.send(dto);
            }

            db.close();
        });
    });


}