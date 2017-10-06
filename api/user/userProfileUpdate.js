/**
 * Created by asd on 9/5/2017.
 */

var ObjectID = require('mongodb').ObjectID;
var mongo = require('mongodb');
var User = require('../../repository/user.js');

module.exports = function (updatedUser, response) {

//var url = "mongodb://localhost:27017/apptest";
    var dto = {
        success: true,
        error: [],
        status: 200
    };


    try {

        updatedUser._id = new ObjectID(updatedUser._id)
        id = updatedUser._id;
        var myquery = {
            _id: id
        };
        updatedUser.dateLastModified = new Date();
        updatedUser.tenantId = new ObjectID(updatedUser.tenantId);
        updatedUser.dateCreated = new Date(updatedUser.dateCreated);
        updatedUser.userType = app.loginUser.userType;
        var newvalues = updatedUser;
        User.updateOne(myquery, newvalues, function (err, res) {
            try {
                if (err) throw err;
                if (res.result.nModified < 1) {
                    dto.success = false;
                    dto.error.push("Unable to update user");
                    response.send(dto);
                }
                else {
                    dto.data = res;
                    response.send(dto);
                }

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