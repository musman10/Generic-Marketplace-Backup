module.exports = function(data,response) {
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;


    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;

            var query = {_id:new ObjectID(data.userId) };
            var newvalues = {$set: { password:data.newPassword}};
            db.collection("User").updateOne(query, newvalues, function(err, res) {
                try {
                    if (err) throw err;
                    console.log("1 document updated");
                    db.close();
                    dto = {success: true, error: [], status: 200};
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