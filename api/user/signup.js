module.exports = function(user,res){
    var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var response = res;

    user.tenantId = new ObjectID(user.tenantId);
    user.dateCreated = new Date();
    user.dateLastModified = new Date();
    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

    function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object") return input;

        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            var value = input[key];
            var match;
            // Check for string properties which look like dates.
            if (typeof value === "string" && (match = value.match(regexIso8601))) {
                var milliseconds = Date.parse(match[0])
                if (!isNaN(milliseconds)) {
                    input[key] = new Date(milliseconds);
                }
            } else if (typeof value === "object") {
                // Recurse into object
                convertDateStringsToDates(value);
            }
        }
    }

    convertDateStringsToDates(user);

    MongoClient.connect(url, function(err, db) {
        try {
        if (err) throw err;
        var query = {
            tenantId: new ObjectID(user.tenantId),
            username: user.username
        }
            db.collection("User").findOne(query, function (err, result) {
                try {
                    if (err) throw err;
                    if (result == null) {
                        db.collection("User").insert(user, function (err, res) {
                            try {
                                if (err) throw err;
                                console.log(user.username + " inserted");
                                db.close();
                                dto.success = true;
                                response.send(dto);
                            }catch(e){
                                db.close();
                                dto.success = false;
                                dto.error.push(e.toString());
                                response.send(dto);
                            }
                        });

                    }
                    else {
                        db.close();
                        dto.success = false;
                        dto.error.push("User already exhist");
                        response.send(dto);
                    }
                }catch(e){
                    db.close();
                    dto.success = false;
                    dto.error.push(e.toString());
                    response.send(dto);
                }
            });
        }
        catch(e){
            db.close();
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });
}