module.exports = function (request, response) {
    var ObjectID = require('mongodb').ObjectID;
    var Request = require('../../repository/request');
    var dto = {success: true, error: [], status: 200};
    request.tenantId = new ObjectID(request.tenantId);
    request.postUserId = new ObjectID(request.postUserId);

    var date = new Date();
    /* console.log(date.getDate());
     console.log(date.getMonth());
     console.log(date.getFullYear());
     console.log(date.getUTCHours());
     console.log(date.toUTCString());
     console.log(date.toLocaleString());*/

    request.datePosted = date;
    request.dateLastModified = date;


    Request.insertOne(request, function (err, res) {
        try {
            if (err) throw err;
            console.log("1 document inserted");
            dto = {success: true, error: [], status: 200};
            dto.data = res;
            response.send(dto);
        } catch (e) {
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });


}