module.exports = function(user,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var Join = require('mongo-join').Join;
    var ObjectID = require('mongodb').ObjectID;
    var CryptoJS = require("crypto-js");

    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            var ciphertext = CryptoJS.AES.encrypt(user.userId, 'secret key 123');
            console.log("Encrypted userId : " + ciphertext);
            var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            console.log("decrypted Text : " + plaintext);

            var email={
                datesent : new Date(),
                mailsubject : "Reset Password",
                body : user.baseUrl+"resetpassword/" +ciphertext,
                receiverId:ObjectID(user.userId),
                emailId:user.emailId,
                tenantId:new ObjectID(user.tenantId),
                mailsent:false
            };

            db.collection("Email").insertOne(email, function (err, res) {
                try {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    dto = {success: true, error: [], status: 200};
                    dto.insertedData = res.ops;
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