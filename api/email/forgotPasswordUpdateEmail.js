module.exports = function(user,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;
    var CryptoJS = require("crypto-js");
    var nodemailer = require('nodemailer');

    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            var ciphertext = CryptoJS.AES.encrypt(user.userId, 'secret key 123');


                 var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'fonetrace@gmail.com',
                        pass: '013052099'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                var mailOptions = {
                    from: 'fonetrace@gmail.com',
                    to: user.emailId,
                    subject: 'Reset Password',
                    text: user.baseUrl+"resetpassword/"+ciphertext
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log("Could not send email");
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        var query = {
                            receiverId:new ObjectID(user.userId),
                            sentto:user.username,
                            emailId: user.emailId,
                            tenantId:new ObjectID(user.tenantId),
                            _id:new ObjectID(user._id)
                        };
                        var newvalues = {
                            $set: { mailsent:"true",body:mailOptions.text}

                        };



                        db.collection("Email").updateOne(query, newvalues, function(err, res) {
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