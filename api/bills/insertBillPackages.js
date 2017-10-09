var UserBillPackages = require('../../repository/userbillpackages.js');
module.exports = function (userBillPackages, response) {

    var dto = {success: true, error: [], status: 200};
    var ObjectID = require('mongodb').ObjectID;

    try {
        for (i = 0; i < userBillPackages.length; i++) {
            userBillPackages[i].tenantId = new ObjectID(userBillPackages[i].tenantId);
            userBillPackages[i].userId = new ObjectID(userBillPackages[i].userId);
            userBillPackages[i].userPackageId = new ObjectID(userBillPackages[i].userPackageId);
            userBillPackages[i].userBillId = new ObjectID(userBillPackages[i].userBillId);
        }

        UserBillPackages.insertMany(userBillPackages, function (err, res) {
            try {
                if (err)throw err;
                dto.insertedData = res.ops;
                response.send(dto);
            } catch (e) {
                dto.success = false;
                dto.error.push("Some error occured!");
                console.log(e.toString());
                response.send(dto);
            }
        });
    }catch(e){
        dto.success = false;
        dto.error.push("Some error occured!");
        console.log(e.toString());
        response.send(dto);
    }

}
