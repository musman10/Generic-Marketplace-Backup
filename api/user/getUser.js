module.exports = function(userInfo,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;
    var nodemailer = require('nodemailer');



    MongoClient.connect(url, function(err, db) {
        try {

            if (err) throw err;

            var query= {
                tenantId : new ObjectID(userInfo.tenantId),
                email :userInfo.emailId
            }

            db.collection("User").findOne(query,function (err, result) {
                try {
                    console.log("TenantId: "+userInfo.tenantId);
                    console.log("EmailId: "+userInfo.emailId);
                    if (err) throw err;
                    console.log(result);
                    db.close();
                    dto.data = result;
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