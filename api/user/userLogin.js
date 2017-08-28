/**
 * Created by asd on 8/28/2017.
 */
var mongo = require('mongodb');

module.exports = function(loginUser,response){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/apptest";
    var dto = {success : true,
    error : [],
    status : 200};
    var user = "";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Mongo");
        var query = {
            tenant_id : loginUser.tenant_id,
            username : loginUser.username,
            password : loginUser.password
        };
        db.collection("User").findOne(query, function(err, result) {

            if (err) throw err;
            console.log(result);
            if(result == null){
                dto.success = false;
                dto.error.push("User name password does not match");
                response.send(dto);
            }
            else{
                dto.data = result;
                response.send(dto);
            }
            user = result;
            // dto.users = result;
            db.close();
            //return dto;
            // res.send(dto);
        });
    });


}