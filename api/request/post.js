module.exports = function(request,response){
    var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
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

    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            db.collection("Request").insertOne(request, function (err, res) {
                try {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    dto = {success: true, error: [], status: 200};
                    dto.data = res;
                    response.send(dto);
                }catch(e){
                    db.close();
                    dto.success = false;
                    dto.error.push(e.toString());
                    response.send(dto);
                }
            });
        }catch(e){
            db.close();
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });

}