module.exports = function(payment , response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;


        payment.userBillId = new ObjectID(payment.userBillId);
        payment.dateCreated = new Date();
        payment.paymentMethodDetails.expiryDate = new Date(payment.paymentMethodDetails.expiryDate);

        MongoClient.connect(url, function (err, db) {
            try {
                if (err) throw err;
                db.collection("Payment").insert(payment, function (err, res) {
                    try {
                        if (err) throw err;
                        db.close();
                        dto.insertedData = res.ops;
                        response.send(dto);
                    }catch(e){

                        dto.success = false;
                        dto.error.push("Some error occured!");
                        console.log(e.toString());
                        response.send(dto);
                    }
                });
            } catch (e) {
                dto.success = false;
                dto.error.push("Some error occured!");
                console.log(e.toString());
                response.send(dto);
            }
        });

}
