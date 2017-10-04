var User = require('../../repository/user.js');
module.exports = function (user, res) {

    var ObjectID = require('mongodb').ObjectID;

    var dto = {success: true, error: [], status: 200};
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


    if (err) throw err;
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
                        dto.error.push(e.toString());
                        response.send(dto);
                    }
                });

            }
            else {
                dto.success = false;
                dto.error.push("User already exhist");
                response.send(dto);
            }
        } catch (e) {
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });

}