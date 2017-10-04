var UserBillPackages = require('../../repository/userbillpackages.js');
module.exports = function (userBillPackages, response) {

    var dto = {success: true, error: [], status: 200};
    var ObjectID = require('mongodb').ObjectID;

    for (i = 0; i < userBillPackages.length; i++) {
        userBillPackages[i].tenantId = new ObjectID(userBillPackages.tenantId);
        userBillPackages[i].userId = new ObjectID(userBillPackages.userId);
        userBillPackages[i].userPackageId = new ObjectID(userBillPackages._id);
        userBillPackages[i].userBillId = new ObjectID(userBillPackages.userBillId);
    }

    UserBillPackages.insertMany(userBillPackages, function (err, res) {


        dto.insertedData = res.ops;
        response.send(dto);
    });

}
