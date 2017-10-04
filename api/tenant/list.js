module.exports = function(response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};


    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;

            db.collection("Tenant").find({}).toArray(function (err, res) {
                try {
                    if (err) throw err;
                    console.log("In the backend service,printing all Tenants");
                    console.log(res);
                    db.close();
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