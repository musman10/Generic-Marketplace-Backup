module.exports = function(billid,response){
    var MongoClient = require('mongodb').MongoClient;
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;
    userBill = {};

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        billid = new ObjectID(billid)

        var query = { _id: billid };
        db.collection("UserBills").find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            userBill = result[0];
            userBill.packages = [];
            var billPackagesquery = { userBillId: billid };
            db.collection("UserBillPackages").find(billPackagesquery).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);

                getBillPackage(userBill,result,0,db).then(function(){
                    db.close();
                    dto.data= userBill;
                    response.send(dto);
                });
            });



        });
    });

    function getBillPackage(userBill,res,i,db) {
        return new Promise(function (resolve, reject) {
            var packageQuery = { _id: res[i].userPackageId };
            db.collection("UserPackages").find(packageQuery).toArray(function(err, result) {
                if (err) throw err;

                userBill.packages.push(result[0]);
                if(i == (res.length - 1)){
                    resolve();
                }
                else{
                    getBillPackage(res,i++,db).then(function(){
                        resolve();
                    });
                }

            });
        });
    }

}