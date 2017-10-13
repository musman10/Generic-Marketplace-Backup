module.exports = function(encryptedUserId,baseUrl,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;
    var CryptoJS = require("crypto-js");

    console.log("Encrypted UserId : " + encryptedUserId);
    var bytes = CryptoJS.AES.decrypt(encryptedUserId.toString(), 'secret key 123');
    var decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted UserId : " + decryptedUserId);

    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;

            var query = {receiverId:new ObjectID(decryptedUserId) };

            db.collection("Email").find(query,{ sort: { 'datesent' : -1 } , limit:1}).toArray(function (err, res) {
            try {
                if (err) throw err;
                console.log(res);
                db.close();
                if(res==null)
                {
                    response.sendFile(__dirname + '../pageNotFound.html');
                }
                else {
                        var isExpired;
                        var expiryDate=res[0].datesent;
                        expiryDate.setDate(res[0].datesent.getDate()+1);
                        console.log("Expiry date : "+expiryDate.toLocaleString());
                        var presentDate=new Date();

                        if(presentDate<expiryDate){
                            isExpired=false;
                        }
                        else{
                            isExpired=true;
                        }

                        if(isExpired==true){
                            response.sendFile(__dirname + '/expire.html');

                        }else{
                            var userId=new ObjectID(decryptedUserId);
                            response.locals.userid = decryptedUserId;
                            response.locals.baseUrl =baseUrl ;
                            response.render(__dirname + '/resetPassword');

                    }
                }

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