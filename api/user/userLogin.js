/**
 * Created by asd on 8/28/2017.
 */
var mongo = require('mongodb');
var User = require('../../repository/user.js');
var jwt = require('jsonwebtoken');
var secret = require('../../config/config').secret;
var ObjectID = require('mongodb').ObjectID;

module.exports = function (loginUser, response) {

    // var url = "mongodb://localhost:27017/apptest";
    var dto = {
        success: true,
        error: [],
        status: 200
    };
    var user = "";


    try {

        console.log("Mongo");
        if (loginUser.isAdmin == true) {
            var query = {
                isAdmin: loginUser.isAdmin,
                username: loginUser.username,
                password: loginUser.password
            };
            var queryExist = {
                isAdmin: loginUser.isAdmin,
                username: loginUser.username,
            };
        }
        else {
            id = new ObjectID(loginUser.tenant_id)
            var query = {
                tenantId: id,
                username: loginUser.username,
                password: loginUser.password
            };
            var queryExist = {
                tenantId: id,
                username: loginUser.username,
            };
        }

        //check exists

        User.findOne(queryExist, function (err, result) {
            try {
                if (err) throw err;
                console.log(result);
                if (result == null) {
                    dto.success = false;
                    dto.error.push("User name password does not exist");
                    response.send(dto);
                }
                else {
                    //
                    User.findOne(query, function (err, result) {
                        try {
                            if (err) throw err;
                            console.log(result);
                            if (result == null) {
                                dto.success = false;
                                dto.error.push("User name password does not match");
                                response.send(dto);
                            }
                            else {
                                // create a token
                                var token = jwt.sign({ username: result.username }, secret, {
                                    expiresIn: 86400 // expires in 24 hours
                                });
                                dto.data = result;
                                dto.token = token
                                response.send(dto);
                            }
                            user = result;
                            // dto.users = result;

                            //return dto;
                            // res.send(dto);
                        } catch (e) {

                            dto.success = false;
                            dto.error.push(e.toString());
                            response.send(dto);
                        }
                    });

                    //
                    //dto.data = result;
                    //response.send(dto);
                }
                user = result;
                // dto.users = result;

                //return dto;
                // res.send(dto);
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
}
