module.exports = function(tenant,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    //var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            tenant.dateCreated = new Date();
            tenant.dateLastModified = new Date();

            db.collection("Tenant").insert(tenant, function (err, res) {
                try {
                    if (err) throw err;
                    console.log("1 document inserted");
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