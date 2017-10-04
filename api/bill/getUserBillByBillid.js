var UserBills = require('../../repository/userbills.js');
var UserBillPackages = require('../../repository/userbillpackages.js');
var UserPackages = require('../../repository/userpackages.js');
module.exports = function(billid, response){

    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;
    userBill = {};



        billid = new ObjectID(billid)

        var query = { _id: billid };
        UserBills.find(query).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            userBill = result[0];
            userBill.packages = [];
            var billPackagesquery = { userBillId: billid };
            UserBillPackages.find(billPackagesquery).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);

                getBillPackage(userBill,result,0).then(function(){
                    dto.data= userBill;
                    response.send(dto);
                });
            });



        });


    function getBillPackage(userBill,res,i,db) {
        return new Promise(function (resolve, reject) {
            var packageQuery = { _id: res[i].userPackageId };
            UserPackages.find(packageQuery).toArray(function(err, result) {
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