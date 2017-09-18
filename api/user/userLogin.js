/**
 * Created by asd on 8/28/2017.
 */
var mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(loginUser,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
   // var url = "mongodb://localhost:27017/apptest";
    var dto = {success : true,
    error : [],
    status : 200};
    var user = "";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Mongo");
        if(loginUser.isAdmin == true){
            var query = {
                isAdmin : loginUser.isAdmin,
                username : loginUser.username,
                password : loginUser.password
            };
            var queryExist = {
                isAdmin : loginUser.isAdmin,
                username : loginUser.username,
            };
        }
        else{
            id = new ObjectID(loginUser.tenant_id)
            var query = {
                tenantId : id,
                username : loginUser.username,
                password : loginUser.password
            };
            var queryExist = {
                tenantId : id,
                username : loginUser.username,
            };
        }

        //check exists
        db.collection("User").findOne(queryExist, function(err, result) {

            if (err) throw err;
            console.log(result);
            if(result == null){
                dto.success = false;
                dto.error.push("User name password does not exist");
                response.send(dto);
            }
            else{
                //
                db.collection("User").findOne(query, function (err, result) {

                    if (err) throw err;
                    console.log(result);
                    if (result == null) {
                        dto.success = false;
                        dto.error.push("User name password does not match");
                        response.send(dto);
                    }
                    else {
                        dto.data = result;
                        response.send(dto);
                    }
                    user = result;
                    // dto.users = result;
                    db.close();
                    //return dto;
                    // res.send(dto);
                });
                //
                //dto.data = result;
                //response.send(dto);
            }
            user = result;
            // dto.users = result;
            db.close();
            //return dto;
            // res.send(dto);
        });

    });


}
