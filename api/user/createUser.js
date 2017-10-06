var User = require('../../repository/user.js');
module.exports = function (user, res) {

    var ObjectID = require('mongodb').ObjectID;
    var dto = {success: true, error: [], status: 200};
    var response = res;

    user.tenantId = new ObjectID(user.tenantId);
    user.dateCreated = new Date();
    user.dateLastModified = new Date();


    if (err) throw err;
    try {
        var query = {
            tenantId: new ObjectID(user.tenantId),
            username: user.username

        }
        User.findOne(query, function (err, result) {
            try {
                if (err) throw err;
                if (result == null) {
                    User.insert(user, function (err, res) {
                        try {
                            if (err) throw err;
                            console.log(user.username + " inserted");
                            dto.success = true;
                            response.send(dto);
                        } catch (e) {
                            dto.success = false;
                            dto.error.push("Some error occured!");
                            console.log(e.toString());
                            response.send(dto);
                        }
                    });

                }
                else {
                    dto.success = false;
                    dto.error.push("User already exists");
                    response.send(dto);
                }
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